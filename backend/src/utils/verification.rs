use uuid::Uuid;
use chrono::{Utc, Duration};
use sha2::{Sha256, Digest};

/// Generate a unique verification token
pub fn generate_verification_token() -> String {
    let uuid = Uuid::new_v4().to_string();
    let mut hasher = Sha256::new();
    hasher.update(&uuid);
    format!("{:x}", hasher.finalize())
}

/// Get token expiration time (24 hours from now)
pub fn get_token_expiration() -> chrono::DateTime<Utc> {
    Utc::now() + Duration::hours(24)
}

/// Create verification email body
pub fn create_verification_email(username: &str, token: &str, frontend_url: &str) -> (String, String) {
    let subject = "Verify Your RoboVeda Account".to_string();
    let verification_url = format!(
        "{}/verify-email?token={}",
        frontend_url, token
    );
    
    let body = format!(
        r#"
Hello {},

Welcome to RoboVeda! Please verify your email address to activate your account.

Click the link below to verify your email:
{}

This link will expire in 24 hours.

If you didn't create this account, please ignore this email.

Best regards,
RoboVeda Team
        "#,
        username, verification_url
    );
    
    (subject, body)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_verification_token() {
        let token = generate_verification_token();
        assert_eq!(token.len(), 64); // SHA256 hex is 64 chars
    }

    #[test]
    fn test_get_token_expiration() {
        let exp = get_token_expiration();
        let now = Utc::now();
        assert!(exp > now);
    }
}
