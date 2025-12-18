use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, FromRow)]
#[allow(dead_code)]
pub struct Device {
    pub id: Uuid,
    pub user_id: Uuid,
    pub device_name: String,
    pub device_type: String, // drone, robot, rover
    pub firmware_version: String,
    pub status: String, // online, offline, maintenance
    pub last_seen: Option<DateTime<Utc>>,
    pub metadata: serde_json::Value,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
#[allow(dead_code)]
pub struct RegisterDeviceRequest {
    pub device_name: String,
    pub device_type: String,
    pub firmware_version: String,
}

#[derive(Debug, Deserialize)]
#[allow(dead_code)]
pub struct DeviceCommand {
    pub command: String,
    pub parameters: serde_json::Value,
}
