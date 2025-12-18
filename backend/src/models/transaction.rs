use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, FromRow)]
#[allow(dead_code)]
pub struct Transaction {
    pub id: Uuid,
    pub user_id: Uuid,
    pub amount: f64,
    pub currency: String,
    pub payment_method: String, // stripe, razorpay, crypto
    pub payment_id: String,
    pub status: String, // pending, completed, failed
    pub product_type: String, // software_license, documentation, hardware_guide
    pub blockchain_tx_hash: Option<String>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
#[allow(dead_code)]
pub struct CreatePaymentRequest {
    pub payment_method: String,
    pub product_type: String,
}

#[derive(Debug, Serialize)]
#[allow(dead_code)]
pub struct PaymentResponse {
    pub payment_id: String,
    pub client_secret: Option<String>,
    pub amount: f64,
    pub currency: String,
}
