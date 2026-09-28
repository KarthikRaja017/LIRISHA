"""
Security Utility.
Provides password hashing using werkzeug.security (PBKDF2/Scrypt) and JWT token generation & verification.
"""
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional
import jwt
from werkzeug.security import generate_password_hash, check_password_hash

from app.errors.exceptions import AuthenticationError
from app.errors.codes import ErrorCode


def hash_password(password: str) -> str:
    """Hashes a raw password securely."""
    return generate_password_hash(password, method="scrypt")


def verify_password(password: str, password_hash: str) -> bool:
    """Verifies a raw password against its stored hash."""
    return check_password_hash(password_hash, password)


def create_access_token(
    subject: str | int,
    secret_key: str,
    algorithm: str = "HS256",
    expires_minutes: int = 60,
    additional_claims: Optional[Dict[str, Any]] = None,
) -> str:
    """Generates a signed JWT access token."""
    now = datetime.now(timezone.utc)
    expires_at = now + timedelta(minutes=expires_minutes)

    payload = {
        "sub": str(subject),
        "iat": now,
        "exp": expires_at,
    }
    if additional_claims:
        payload.update(additional_claims)

    return jwt.encode(payload, secret_key, algorithm=algorithm)


def decode_access_token(
    token: str, secret_key: str, algorithm: str = "HS256"
) -> Dict[str, Any]:
    """Decodes and validates a JWT access token."""
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        return payload
    except jwt.ExpiredSignatureError:
        raise AuthenticationError(
            message="Token has expired", code=ErrorCode.TOKEN_EXPIRED
        )
    except jwt.InvalidTokenError as e:
        raise AuthenticationError(
            message=f"Invalid token: {str(e)}", code=ErrorCode.INVALID_TOKEN
        )
