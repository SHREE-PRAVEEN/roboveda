mod config;
mod routes;
mod controllers;
mod services;
mod models;
mod utils;

use actix_web::{web, App, HttpServer, middleware, HttpResponse};
use actix_cors::Cors;
use actix_governor::{Governor, GovernorConfigBuilder};
use sqlx::PgPool;
use std::sync::Arc;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();
    dotenv::dotenv().ok();

    let config = config::AppConfig::from_env();
    
    // Database connection pool
    let pool = PgPool::connect(&config.database_url)
        .await
        .expect("Failed to connect to Postgres");

    // Run migrations
    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .expect("Failed to run migrations");

    let pool = Arc::new(pool);
    
    // Rate limiter: 100 requests per minute
    let governor_conf = GovernorConfigBuilder::default()
        .seconds_per_request(1)
        .burst_size(100)
        .finish()
        .unwrap();

    let host = config.host.clone();
    let port = config.port;

    log::info!("🚀 Server starting on {}:{}", host, port);

    HttpServer::new(move || {
        let cors = Cors::permissive(); // Configure properly for production
        
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .app_data(web::Data::new(config.clone()))
            .wrap(cors)
            .wrap(middleware::Logger::default())
            .wrap(Governor::new(&governor_conf))
            .wrap(middleware::Compress::default())
            // Security headers
            .wrap(middleware::DefaultHeaders::new()
                .add(("X-Content-Type-Options", "nosniff"))
                .add(("X-Frame-Options", "DENY"))
                .add(("X-XSS-Protection", "1; mode=block"))
                .add(("Strict-Transport-Security", "max-age=31536000; includeSubDomains"))
            )
            .route("/health", web::get().to(health_check))
            .configure(routes::auth::configure)
            .configure(routes::ai::configure)
            .configure(routes::robotics::configure)
            .configure(routes::blockchain::configure)
            .configure(routes::dashboard::configure)
    })
    .bind((host.as_str(), port))?
    .run()
    .await
}

async fn health_check() -> HttpResponse {
    HttpResponse::Ok().json(serde_json::json!({"status": "ok"}))
}
