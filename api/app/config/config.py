"""
Application Configuration Classes.
Loads setting values from environment variables with sensible defaults.
"""
import os
from pathlib import Path
from typing import List, Type
from dotenv import load_dotenv

# Ensure api/.env is always loaded regardless of current working directory
_API_DIR = Path(__file__).resolve().parent.parent.parent
_ENV_FILE = _API_DIR / ".env"
if _ENV_FILE.exists():
    load_dotenv(_ENV_FILE)
load_dotenv()


class Config:
    """Base Configuration."""
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/project_db")
    DB_MIN_CONN: int = int(os.getenv("DB_MIN_CONN", "1"))
    DB_MAX_CONN: int = int(os.getenv("DB_MAX_CONN", "10"))
    DB_TIMEOUT: int = int(os.getenv("DB_TIMEOUT", "15"))

    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "jwt-secret-key-change-in-production")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    JWT_ACCESS_TOKEN_EXPIRES_MINUTES: int = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES_MINUTES", "60"))

    CORS_ORIGINS: List[str] = [
        origin.strip()
        for origin in os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
        if origin.strip()
    ]
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    TESTING: bool = False
    DEBUG: bool = False


class DevelopmentConfig(Config):
    """Development Configuration."""
    DEBUG: bool = True
    LOG_LEVEL: str = "DEBUG"


class ProductionConfig(Config):
    """Production Configuration."""
    DEBUG: bool = False
    LOG_LEVEL: str = "WARNING"


class TestingConfig(Config):
    """Testing Configuration."""
    TESTING: bool = True
    DEBUG: bool = True
    DATABASE_URL: str = os.getenv("TEST_DATABASE_URL", Config.DATABASE_URL)
    LOG_LEVEL: str = "ERROR"


def get_config() -> Type[Config]:
    """Factory function to get config based on FLASK_ENV environment variable."""
    env = os.getenv("FLASK_ENV", "development").lower()
    if env == "production":
        return ProductionConfig
    elif env == "testing":
        return TestingConfig
    return DevelopmentConfig
