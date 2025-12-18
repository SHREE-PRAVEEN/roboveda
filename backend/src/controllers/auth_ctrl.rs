use actix_web::{web, HttpResponse};
use sqlx::PgPool;
use std::sync::Arc;
use validator::Validate;
use bcrypt::{hash, verify, DEFAULT_COST};

use crate::models::user::{RegisterRequest, LoginRequest, User, UserResponse, AuthResponse};
use crate::utils::jwt::create_token;
use crate::config::AppConfig;

// Register new user
pub async fn register(
    pool: web::Data<Arc<PgPool>>,
    config: web::Data<AppConfig>,
    body: web::Json<RegisterRequest>,
) -> HttpResponse {
    // Validate input
    if let Err(errors) = body.validate() {
        return HttpResponse::BadRequest().json(serde_json::json!({
            "error": "Validation failed",
            "details": errors.to_string()
        }));
    }

    // Check if email already exists
    let existing_user = sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM users WHERE email = $1 OR username = $2"
    )
    .bind(&body.email)
    .bind(&body.username)
    .fetch_one(pool.get_ref().as_ref())
    .await;

    match existing_user {
        Ok(count) if count > 0 => {
            return HttpResponse::Conflict().json(serde_json::json!({
                "error": "User with this email or username already exists"
            }));
        }
        Err(e) => {
            log::error!("Database error checking existing user: {}", e);
            return HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Database error"
            }));
        }
        _ => {}
    }

    // Hash password
    let password_hash = match hash(&body.password, DEFAULT_COST) {
        Ok(h) => h,
        Err(e) => {
            log::error!("Failed to hash password: {}", e);
            return HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to process password"
            }));
        }
    };

    // Insert new user
    let user = sqlx::query_as::<_, User>(
        r#"
        INSERT INTO users (email, username, password_hash, wallet_address)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, username, password_hash, wallet_address, is_verified, is_premium, created_at, updated_at
        "#
    )
    .bind(&body.email)
    .bind(&body.username)
    .bind(&password_hash)
    .bind(&body.wallet_address)
    .fetch_one(pool.get_ref().as_ref())
    .await;

    match user {
        Ok(user) => {
            // Create JWT token
            let token = match create_token(&user.id.to_string(), &config.jwt_secret, 86400 * 7) {
                Ok(t) => t,
                Err(e) => {
                    log::error!("Failed to create token: {}", e);
                    return HttpResponse::InternalServerError().json(serde_json::json!({
                        "error": "Failed to create authentication token"
                    }));
                }
            };

            let response = AuthResponse {
                token,
                user: UserResponse {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    wallet_address: user.wallet_address,
                    is_verified: user.is_verified,
                    is_premium: user.is_premium,
                },
            };

            log::info!("New user registered: {}", response.user.email);
            HttpResponse::Created().json(response)
        }
        Err(e) => {
            log::error!("Failed to create user: {}", e);
            HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to create user"
            }))
        }
    }
}

// Login user
pub async fn login(
    pool: web::Data<Arc<PgPool>>,
    config: web::Data<AppConfig>,
    body: web::Json<LoginRequest>,
) -> HttpResponse {
    // Validate input
    if let Err(errors) = body.validate() {
        return HttpResponse::BadRequest().json(serde_json::json!({
            "error": "Validation failed",
            "details": errors.to_string()
        }));
    }

    // Find user by email
    let user = sqlx::query_as::<_, User>(
        "SELECT * FROM users WHERE email = $1"
    )
    .bind(&body.email)
    .fetch_optional(pool.get_ref().as_ref())
    .await;

    match user {
        Ok(Some(user)) => {
            // Verify password
            match verify(&body.password, &user.password_hash) {
                Ok(true) => {
                    // Create JWT token
                    let token = match create_token(&user.id.to_string(), &config.jwt_secret, 86400 * 7) {
                        Ok(t) => t,
                        Err(e) => {
                            log::error!("Failed to create token: {}", e);
                            return HttpResponse::InternalServerError().json(serde_json::json!({
                                "error": "Failed to create authentication token"
                            }));
                        }
                    };

                    let response = AuthResponse {
                        token,
                        user: UserResponse {
                            id: user.id,
                            email: user.email,
                            username: user.username,
                            wallet_address: user.wallet_address,
                            is_verified: user.is_verified,
                            is_premium: user.is_premium,
                        },
                    };

                    log::info!("User logged in: {}", response.user.email);
                    HttpResponse::Ok().json(response)
                }
                Ok(false) => {
                    HttpResponse::Unauthorized().json(serde_json::json!({
                        "error": "Invalid email or password"
                    }))
                }
                Err(e) => {
                    log::error!("Password verification error: {}", e);
                    HttpResponse::InternalServerError().json(serde_json::json!({
                        "error": "Authentication error"
                    }))
                }
            }
        }
        Ok(None) => {
            HttpResponse::Unauthorized().json(serde_json::json!({
                "error": "Invalid email or password"
            }))
        }
        Err(e) => {
            log::error!("Database error during login: {}", e);
            HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Database error"
            }))
        }
    }
}

// Get current user profile
pub async fn get_profile(
    pool: web::Data<Arc<PgPool>>,
    req: actix_web::HttpRequest,
) -> HttpResponse {
    // Extract user ID from JWT token
    let user_id = match crate::utils::jwt::extract_user_id_from_request(&req) {
        Some(id) => id,
        None => {
            return HttpResponse::Unauthorized().json(serde_json::json!({
                "error": "Invalid or missing authentication token"
            }));
        }
    };

    // Fetch user from database
    let user = sqlx::query_as::<_, UserResponse>(
        "SELECT id, email, username, wallet_address, is_verified, is_premium FROM users WHERE id = $1"
    )
    .bind(user_id)
    .fetch_optional(pool.get_ref().as_ref())
    .await;

    match user {
        Ok(Some(user)) => HttpResponse::Ok().json(user),
        Ok(None) => HttpResponse::NotFound().json(serde_json::json!({
            "error": "User not found"
        })),
        Err(e) => {
            log::error!("Database error fetching profile: {}", e);
            HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Database error"
            }))
        }
    }
}
