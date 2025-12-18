use actix_web::web;
use crate::controllers::auth_ctrl;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api/auth")
            .route("/register", web::post().to(auth_ctrl::register))
            .route("/login", web::post().to(auth_ctrl::login))
            .route("/profile", web::get().to(auth_ctrl::get_profile))
    );
}
