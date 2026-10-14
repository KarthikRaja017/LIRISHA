"""
Services Blueprint.
Provides dynamic REST endpoints for service categories and sub-services.
"""
from flask import Blueprint, request
from app.repositories.service_repository import ServiceRepository
from app.utils.response import success_response
from app.errors.exceptions import NotFoundError

services_bp = Blueprint("services", __name__)
service_repo = ServiceRepository()


@services_bp.route("", methods=["GET"])
def get_services():
    """
    GET /api/v1/services
    Returns list of all active service categories.
    """
    services = service_repo.find_all()
    return success_response(data=services, message="Services retrieved successfully")


@services_bp.route("/<identifier>", methods=["GET"])
def get_service_by_id(identifier: str):
    """
    GET /api/v1/services/<identifier>
    Returns details of a specific service by slug or id.
    """
    service = service_repo.find_by_slug_or_id(identifier)
    if not service:
        raise NotFoundError(message=f"Service '{identifier}' not found")
    return success_response(data=service, message="Service retrieved successfully")


@services_bp.route("", methods=["POST"])
def create_service():
    """POST /api/v1/services"""
    body = request.get_json() or {}
    if not body.get("id") or not body.get("name"):
        raise NotFoundError(message="Service 'id' and 'name' are required")
    created = service_repo.upsert(body)
    return success_response(data=created, message="Service created successfully")


@services_bp.route("/<identifier>", methods=["PUT"])
def update_service(identifier: str):
    """PUT /api/v1/services/<identifier>"""
    body = request.get_json() or {}
    body["id"] = identifier
    updated = service_repo.upsert(body)
    return success_response(data=updated, message="Service updated successfully")


@services_bp.route("/<identifier>", methods=["DELETE"])
def delete_service(identifier: str):
    """DELETE /api/v1/services/<identifier>"""
    deleted = service_repo.delete(identifier)
    if not deleted:
        raise NotFoundError(message=f"Service '{identifier}' not found")
    return success_response(data={"id": identifier}, message="Service deleted successfully")

