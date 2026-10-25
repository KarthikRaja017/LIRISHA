"""
Authentication Service.
Handles business logic for login, registration, and token generation.
"""
from typing import Any, Dict
from flask import current_app

from app.repositories.user_repository import UserRepository
from app.utils.security import verify_password, hash_password, create_access_token
from app.errors.exceptions import AuthenticationError, ConflictError
from app.errors.codes import ErrorCode
from app.models.user import User


class AuthService:
    """Service handling authentication workflows."""

    def __init__(self, user_repo: UserRepository = None):
        self.user_repo = user_repo or UserRepository()

    def authenticate_user(self, email: str, password: str) -> Dict[str, Any]:
        """Validates credentials and generates access token."""
        clean_email = (email or "").strip().lower()
        clean_password = (password or "").strip()

        user = self.user_repo.find_by_email(clean_email)
        if not user or not verify_password(clean_password, user.password_hash):
            raise AuthenticationError(
                message="Invalid email or password",
                code=ErrorCode.AUTHENTICATION_ERROR
            )

        if not user.is_active:
            raise AuthenticationError(
                message="Account is deactivated",
                code=ErrorCode.AUTHORIZATION_ERROR
            )

        # Generate JWT token
        secret_key = current_app.config.get("JWT_SECRET_KEY", "secret")
        expires_minutes = current_app.config.get("JWT_ACCESS_TOKEN_EXPIRES_MINUTES", 60)

        token = create_access_token(
            subject=user.id,
            secret_key=secret_key,
            expires_minutes=expires_minutes,
            additional_claims={"email": user.email, "role": user.role}
        )

        return {
            "access_token": token,
            "token_type": "Bearer",
            "expires_in": expires_minutes * 60,
            "user": user.to_dict(exclude_password=True)
        }

    def register_user(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Registers a new user account."""
        clean_email = (data.get("email") or "").strip().lower()
        clean_password = (data.get("password") or "").strip()
        clean_first = (data.get("first_name") or "").strip()
        clean_last = (data.get("last_name") or "").strip()

        existing = self.user_repo.find_by_email(clean_email)
        if existing:
            raise ConflictError(
                message=f"User with email '{clean_email}' already exists"
            )

        password_hash = hash_password(clean_password)
        new_user = self.user_repo.create(
            email=clean_email,
            password_hash=password_hash,
            first_name=clean_first or "Client",
            last_name=clean_last or "User",
            role="user"
        )

        # Generate access token immediately after registration
        return self.authenticate_user(clean_email, clean_password)
