"""
CORS (Cross-Origin Resource Sharing) Configuration Extension.
"""
from flask import Flask
from flask_cors import CORS


def init_cors(app: Flask) -> None:
    """Configures CORS with allowed origins from app configuration."""
    origins = app.config.get("CORS_ORIGINS", ["http://localhost:3000", "http://127.0.0.1:3000"])
    
    CORS(
        app,
        resources={r"/api/.*": {"origins": origins}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    )

