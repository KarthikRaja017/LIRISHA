"""
Routes package exports.
"""
from app.routes.health import health_bp
from app.routes.auth import auth_bp
from app.routes.users import users_bp
from app.routes.services import services_bp
from app.routes.resources import resources_bp
from app.routes.gallery import gallery_bp
from app.routes.pages import pages_bp

__all__ = [
    "health_bp",
    "auth_bp",
    "users_bp",
    "services_bp",
    "resources_bp",
    "gallery_bp",
    "pages_bp",
]

