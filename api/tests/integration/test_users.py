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
