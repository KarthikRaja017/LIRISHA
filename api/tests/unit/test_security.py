"""
Unit tests for security utilities (password hashing and JWT management).
"""
import pytest
from app.utils.security import hash_password, verify_password, create_access_token, decode_access_token
from app.errors.exceptions import AuthenticationError


def test_password_hashing():
    password = "SecretPassword123!"
    hashed = hash_password(password)
    
    assert hashed != password
    assert verify_password(password, hashed) is True
    assert verify_password("WrongPassword", hashed) is False


def test_jwt_token_flow():
    secret = "test-secret-key-123"
    token = create_access_token(subject=42, secret_key=secret, expires_minutes=15)
    
    payload = decode_access_token(token, secret_key=secret)
    assert payload["sub"] == "42"
    assert "exp" in payload


def test_invalid_jwt_token():
    secret = "test-secret-key-123"
    invalid_token = "invalid.jwt.token"
    
    with pytest.raises(AuthenticationError):
        decode_access_token(invalid_token, secret_key=secret)
