"""
Flask Application Factory.
"""
import os
from flask import Flask
from app.config.config import get_config
from app.extensions.database import init_db, close_db
from app.extensions.cors import init_cors
from app.errors.handlers import register_error_handlers
from app.middleware.request_logger import register_request_logger
from app.utils.logging import setup_logging


def create_app(config_object=None) -> Flask:
    """
    Creates and configures a Flask application instance.
    
    Args:
        config_object: Optional configuration class or object to override defaults.
    """
    app = Flask(__name__)

    # Load configuration
    if config_object:
        app.config.from_object(config_object)
    else:
        env_config = get_config()
        app.config.from_object(env_config)

    # Initialize logging
    setup_logging(app)

    # Initialize extensions
    init_db(app)
    init_cors(app)

    # Register error handlers
    register_error_handlers(app)

    # Register middleware
    register_request_logger(app)

    # Register Blueprints (v1 API)
    from app.routes.health import health_bp
    from app.routes.auth import auth_bp
    from app.routes.users import users_bp

    app.register_blueprint(health_bp, url_prefix="/api/v1/health")
    app.register_blueprint(auth_bp, url_prefix="/api/v1/auth")
    app.register_blueprint(users_bp, url_prefix="/api/v1/users")

    # Teardown database connection pool on app context teardown
    @app.teardown_appcontext
    def teardown_db(exception=None):
        pass  # Pool handles connection lifecycle cleanly

    return app
