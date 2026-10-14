"""
Integration tests for Dynamic Content API Endpoints:
- Services
- Resources
- Gallery
- Pages CMS
"""


def test_get_services(client):
    """Verifies that /api/v1/services returns active services."""
    response = client.get("/api/v1/services")
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert isinstance(data, list)
    assert len(data) >= 8
    first = data[0]
    assert "slug" in first
    assert "name" in first
    assert "subServices" in first
    assert "deliverables" in first


def test_get_single_service(client):
    """Verifies that /api/v1/services/<slug> returns the requested service."""
    response = client.get("/api/v1/services/real-estate")
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert data["slug"] == "real-estate"
    assert data["name"] == "Real Estate Image Editing"
    assert len(data["subServices"]) > 0


def test_get_resources(client):
    """Verifies that /api/v1/resources returns all resources."""
    response = client.get("/api/v1/resources")
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert isinstance(data, list)
    assert len(data) >= 10


def test_get_resources_filter_by_category(client):
    """Verifies that category filter works on /api/v1/resources."""
    response = client.get("/api/v1/resources?category=Articles")
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert len(data) > 0
    for item in data:
        assert item["category"].lower() == "articles"


def test_get_testimonials(client):
    """Verifies that /api/v1/resources/testimonials returns client reviews."""
    response = client.get("/api/v1/resources/testimonials")
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert isinstance(data, list)
    assert len(data) > 0
    assert "quote" in data[0]
    assert "author" in data[0]


def test_get_gallery(client):
    """Verifies that /api/v1/gallery returns tabs with comparison items."""
    response = client.get("/api/v1/gallery")
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert isinstance(data, list)
    assert len(data) > 0
    assert "items" in data[0]


def test_get_page_content(client):
    """Verifies that /api/v1/pages/<slug> returns CMS content."""
    response = client.get("/api/v1/pages/about-us")
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert data["slug"] == "about-us"
    assert "title" in data
    assert "hero" in data
    assert "sections" in data


def test_service_not_found(client):
    """Verifies 404 for unknown service."""
    response = client.get("/api/v1/services/unknown-slug-xyz")
    assert response.status_code == 404
    json_data = response.get_json()
    assert json_data["success"] is False
