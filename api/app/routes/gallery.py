"""
Gallery Blueprint.
Provides dynamic REST endpoints for portfolio gallery tabs and before/after comparisons.
"""
from flask import Blueprint
from app.repositories.gallery_repository import GalleryRepository
from app.utils.response import success_response
from app.errors.exceptions import NotFoundError

gallery_bp = Blueprint("gallery", __name__)
gallery_repo = GalleryRepository()


@gallery_bp.route("", methods=["GET"])
def get_gallery_tabs():
    """
    GET /api/v1/gallery
    Returns list of all active gallery tabs and their items.
    """
    tabs = gallery_repo.find_all_tabs()
    return success_response(data=tabs, message="Gallery tabs retrieved successfully")


@gallery_bp.route("/<tab_id>", methods=["GET"])
def get_gallery_tab_by_id(tab_id: str):
    """
    GET /api/v1/gallery/<tab_id>
    Returns details of a specific gallery tab.
    """
    tab = gallery_repo.find_tab_by_id(tab_id)
    if not tab:
        raise NotFoundError(message=f"Gallery tab '{tab_id}' not found")
    return success_response(data=tab, message="Gallery tab retrieved successfully")


@gallery_bp.route("", methods=["POST"])
def create_gallery_tab():
    """POST /api/v1/gallery"""
    from flask import request
    body = request.get_json() or {}
    if not body.get("id") or not body.get("name"):
        raise NotFoundError(message="Gallery tab 'id' and 'name' are required")
    created = gallery_repo.upsert(body)
    return success_response(data=created, message="Gallery tab created successfully")


@gallery_bp.route("/<tab_id>", methods=["PUT"])
def update_gallery_tab(tab_id: str):
    """PUT /api/v1/gallery/<tab_id>"""
    from flask import request
    body = request.get_json() or {}
    body["id"] = tab_id
    updated = gallery_repo.upsert(body)
    return success_response(data=updated, message="Gallery tab updated successfully")


@gallery_bp.route("/<tab_id>", methods=["DELETE"])
def delete_gallery_tab(tab_id: str):
    """DELETE /api/v1/gallery/<tab_id>"""
    deleted = gallery_repo.delete(tab_id)
    if not deleted:
        raise NotFoundError(message=f"Gallery tab '{tab_id}' not found")
    return success_response(data={"id": tab_id}, message="Gallery tab deleted successfully")

