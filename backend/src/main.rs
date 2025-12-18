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
    
    // Try to connect to database, but don't fail if unavailable
    let pool: Option<Arc<PgPool>> = match PgPool::connect(&config.database_url).await {
        Ok(pool) => {
            log::info!("✅ Connected to database");
            // Run migrations if connected
            if let Err(e) = sqlx::migrate!("./migrations").run(&pool).await {
                log::warn!("⚠️ Migration warning: {}", e);
            }
            Some(Arc::new(pool))
        }
        Err(e) => {
            log::warn!("⚠️ Database not available: {}. Running in limited mode.", e);
            None
        }
    };
    
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
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);
        
        let mut app = App::new()
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
            )
            .route("/health", web::get().to(health_check))
            .route("/api/health", web::get().to(health_check));
        
        // Add database pool if available
        if let Some(ref p) = pool {
            app = app.app_data(web::Data::new(p.clone()));
        }
        
        app.configure(routes::auth::configure)
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
    HttpResponse::Ok().json(serde_json::json!({
        "status": "ok",
        "service": "RoboVeda API",
        "version": "1.0.0"
    }))
}
