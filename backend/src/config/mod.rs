pub mod db;
pub mod env;

use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct AppConfig {
    pub host: String,
    pub port: u16,
    pub database_url: String,
    pub jwt_secret: String,
    pub jwt_expiration: i64,
    pub stripe_secret_key: String,
    pub razorpay_key_id: String,
    pub razorpay_key_secret: String,
    pub web3_provider_url: String,
    pub contract_address: String,
    pub product_price_usd: f64,
}

impl AppConfig {
    pub fn from_env() -> Self {
        Self {
            host: std::env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string()),
            port: std::env::var("PORT")
                .unwrap_or_else(|_| "8080".to_string())
                .parse()
                .expect("PORT must be a number"),
            database_url: std::env::var("DATABASE_URL")
                .expect("DATABASE_URL must be set"),
            jwt_secret: std::env::var("JWT_SECRET")
                .expect("JWT_SECRET must be set"),
            jwt_expiration: std::env::var("JWT_EXPIRATION")
                .unwrap_or_else(|_| "86400".to_string())
                .parse()
                .unwrap_or(86400),
            stripe_secret_key: std::env::var("STRIPE_SECRET_KEY")
                .unwrap_or_default(),
            razorpay_key_id: std::env::var("RAZORPAY_KEY_ID")
                .unwrap_or_default(),
            razorpay_key_secret: std::env::var("RAZORPAY_KEY_SECRET")
                .unwrap_or_default(),
            web3_provider_url: std::env::var("WEB3_PROVIDER_URL")
                .unwrap_or_else(|_| "https://mainnet.infura.io/v3/YOUR_KEY".to_string()),
            contract_address: std::env::var("CONTRACT_ADDRESS")
                .unwrap_or_default(),
            product_price_usd: 1.6,
        }
    }
}
