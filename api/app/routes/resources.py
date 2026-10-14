"""
Resources & Testimonials Blueprint.
Provides dynamic REST endpoints for articles, case studies, blogs, and testimonials.
"""
from flask import Blueprint, request
from app.repositories.resource_repository import ResourceRepository
from app.utils.response import success_response
from app.errors.exceptions import NotFoundError

resources_bp = Blueprint("resources", __name__)
resource_repo = ResourceRepository()


@resources_bp.route("", methods=["GET"])
def get_resources():
    """
    GET /api/v1/resources?category=Articles
    Returns list of resources, optionally filtered by category.
    """
    category = request.args.get("category")
    resources = resource_repo.find_all_resources(category=category)
    return success_response(data=resources, message="Resources retrieved successfully")


@resources_bp.route("/testimonials", methods=["GET"])
def get_testimonials():
    """
    GET /api/v1/resources/testimonials
    Returns list of active client testimonials.
    """
    testimonials = resource_repo.find_all_testimonials()
    return success_response(data=testimonials, message="Testimonials retrieved successfully")


@resources_bp.route("/<identifier>", methods=["GET"])
def get_resource_by_id(identifier: str):
    """
    GET /api/v1/resources/<identifier>
    Returns details of a specific resource article by slug or id.
    """
    resource = resource_repo.find_resource_by_slug_or_id(identifier)
    if not resource:
        raise NotFoundError(message=f"Resource '{identifier}' not found")
    return success_response(data=resource, message="Resource retrieved successfully")


@resources_bp.route("", methods=["POST"])
def create_resource():
    """POST /api/v1/resources"""
    body = request.get_json() or {}
    if not body.get("id") or not body.get("title"):
        raise NotFoundError(message="Resource 'id' and 'title' are required")
    created = resource_repo.upsert_resource(body)
    return success_response(data=created, message="Resource created successfully")


@resources_bp.route("/<identifier>", methods=["PUT"])
def update_resource(identifier: str):
    """PUT /api/v1/resources/<identifier>"""
    body = request.get_json() or {}
    body["id"] = identifier
    updated = resource_repo.upsert_resource(body)
    return success_response(data=updated, message="Resource updated successfully")


@resources_bp.route("/<identifier>", methods=["DELETE"])
def delete_resource(identifier: str):
    """DELETE /api/v1/resources/<identifier>"""
    deleted = resource_repo.delete_resource(identifier)
    if not deleted:
        raise NotFoundError(message=f"Resource '{identifier}' not found")
    return success_response(data={"id": identifier}, message="Resource deleted successfully")


@resources_bp.route("/testimonials", methods=["POST"])
def create_testimonial():
    """POST /api/v1/resources/testimonials"""
    body = request.get_json() or {}
    if not body.get("id") or not body.get("quote"):
        raise NotFoundError(message="Testimonial 'id' and 'quote' are required")
    created = resource_repo.upsert_testimonial(body)
    return success_response(data=created, message="Testimonial created successfully")


@resources_bp.route("/testimonials/<identifier>", methods=["PUT"])
def update_testimonial(identifier: str):
    """PUT /api/v1/resources/testimonials/<identifier>"""
    body = request.get_json() or {}
    body["id"] = identifier
    updated = resource_repo.upsert_testimonial(body)
    return success_response(data=updated, message="Testimonial updated successfully")


@resources_bp.route("/testimonials/<identifier>", methods=["DELETE"])
def delete_testimonial(identifier: str):
    """DELETE /api/v1/resources/testimonials/<identifier>"""
    deleted = resource_repo.delete_testimonial(identifier)
    if not deleted:
        raise NotFoundError(message=f"Testimonial '{identifier}' not found")
    return success_response(data={"id": identifier}, message="Testimonial deleted successfully")

