"""
Integration test for health check endpoint.
"""
def test_health_check_endpoint(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    
    data = response.get_json()
    assert data["success"] is True
    assert data["data"]["status"] == "online"
    assert "database" in data["data"]
