"""
Integration tests for authentication API endpoints.
"""
from unittest.mock import patch
from app.models.user import User


def test_login_validation_error(client):
    response = client.post("/api/v1/auth/login", json={})
    assert response.status_code == 422
    data = response.get_json()
    assert data["success"] is False
    assert data["error"]["code"] == "VALIDATION_ERROR"


@patch("app.routes.auth.AuthService")
def test_login_success(mock_auth_service, client):
    mock_instance = mock_auth_service.return_value
    mock_instance.authenticate_user.return_value = {
        "access_token": "mock-token-xyz",
        "token_type": "Bearer",
        "expires_in": 3600,
        "user": {"id": 1, "email": "test@example.com", "first_name": "Test", "last_name": "User"}
    }

    response = client.post("/api/v1/auth/login", json={
        "email": "test@example.com",
        "password": "Password123!"
    })

    assert response.status_code == 200
    data = response.get_json()
    assert data["success"] is True
    assert data["data"]["access_token"] == "mock-token-xyz"


def test_public_registration_disabled(client):
    response = client.post("/api/v1/auth/register", json={
        "email": "newuser@example.com",
        "password": "Password123!",
        "first_name": "New",
        "last_name": "User"
    })
    assert response.status_code == 403
    data = response.get_json()
    assert data["success"] is False
    assert "disabled" in data["message"].lower()
    assert data["error"]["code"] == "AUTHORIZATION_ERROR"
