"""
Integration tests for users API endpoints.
"""
from unittest.mock import patch


@patch("app.routes.users.UserService")
def test_list_users_endpoint(mock_user_service, client):
    mock_instance = mock_user_service.return_value
    mock_instance.get_users.return_value = {
        "items": [{"id": 1, "email": "john@example.com", "first_name": "John", "last_name": "Doe"}],
        "pagination": {"page": 1, "page_size": 20, "total": 1, "total_pages": 1}
    }

    response = client.get("/api/v1/users?page=1&page_size=20")
    assert response.status_code == 200
    
    data = response.get_json()
    assert data["success"] is True
    assert len(data["data"]["items"]) == 1
    assert data["data"]["items"][0]["email"] == "john@example.com"


@patch("app.routes.users.UserService")
def test_create_user_by_admin(mock_user_service, client):
    from app.utils.security import create_access_token
    token = create_access_token(
        subject=1,
        secret_key=client.application.config.get("JWT_SECRET_KEY"),
        additional_claims={"email": "admin@example.com", "role": "admin"}
    )
    mock_instance = mock_user_service.return_value
    mock_instance.create_user.return_value = {
        "id": 2,
        "email": "client@example.com",
        "first_name": "Client",
        "last_name": "User",
        "role": "user"
    }

    response = client.post(
        "/api/v1/users",
        json={
            "email": "client@example.com",
            "password": "Password123!",
            "first_name": "Client",
            "last_name": "User",
            "role": "user"
        },
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 201
    data = response.get_json()
    assert data["success"] is True
    assert data["data"]["email"] == "client@example.com"


def test_create_user_forbidden_for_non_admin(client):
    from app.utils.security import create_access_token
    token = create_access_token(
        subject=2,
        secret_key=client.application.config.get("JWT_SECRET_KEY"),
        additional_claims={"email": "user@example.com", "role": "user"}
    )
    response = client.post(
        "/api/v1/users",
        json={
            "email": "other@example.com",
            "password": "Password123!",
            "first_name": "Other",
            "last_name": "User"
        },
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 403
    data = response.get_json()
    assert data["success"] is False
    assert "administrators" in data["message"].lower()
