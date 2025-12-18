use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct EnvConfig {
    pub host: String,
    pub port: u16,
    pub database_url: String,
    pub jwt_secret: String,
    pub jwt_expiration: i64,
    pub stripe_secret_key: Option<String>,
    pub razorpay_key_id: Option<String>,
    pub razorpay_key_secret: Option<String>,
    pub web3_provider_url: String,
    pub contract_address: Option<String>,
    pub frontend_url: String,
    pub rust_log: String,
}

impl EnvConfig {
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
            stripe_secret_key: std::env::var("STRIPE_SECRET_KEY").ok(),
            razorpay_key_id: std::env::var("RAZORPAY_KEY_ID").ok(),
            razorpay_key_secret: std::env::var("RAZORPAY_KEY_SECRET").ok(),
            web3_provider_url: std::env::var("WEB3_PROVIDER_URL")
                .unwrap_or_else(|_| "https://mainnet.infura.io/v3/YOUR_KEY".to_string()),
            contract_address: std::env::var("CONTRACT_ADDRESS").ok(),
            frontend_url: std::env::var("FRONTEND_URL")
                .unwrap_or_else(|_| "http://localhost:3000".to_string()),
            rust_log: std::env::var("RUST_LOG").unwrap_or_else(|_| "info".to_string()),
        }
    }
}
