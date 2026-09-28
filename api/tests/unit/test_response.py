"""
Unit tests for standardized response formatting.
"""
from app.utils.response import success_response, created_response
from app.utils.pagination import format_paginated_response


def test_success_response_structure(app):
    with app.test_request_context():
        res, status = success_response(data={"key": "val"}, message="Success")
        json_data = res.get_json()
        
        assert status == 200
        assert json_data["success"] is True
        assert json_data["message"] == "Success"
        assert json_data["data"]["key"] == "val"


def test_created_response_structure(app):
    with app.test_request_context():
        res, status = created_response(data={"id": 1}, message="Created")
        json_data = res.get_json()

        assert status == 201
        assert json_data["success"] is True
        assert json_data["message"] == "Created"
        assert json_data["data"]["id"] == 1


def test_format_paginated_response():
    items = [{"id": 1}, {"id": 2}]
    res = format_paginated_response(items=items, total=50, page=1, page_size=10)
    
    assert res["items"] == items
    assert res["pagination"]["page"] == 1
    assert res["pagination"]["page_size"] == 10
    assert res["pagination"]["total"] == 50
    assert res["pagination"]["total_pages"] == 5
