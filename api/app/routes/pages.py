"""
Pages CMS Blueprint.
Provides dynamic REST endpoints for page-by-page content and sections.
"""
from flask import Blueprint, request
from app.repositories.page_repository import PageRepository
from app.utils.response import success_response, created_response
from app.errors.exceptions import NotFoundError, ValidationError

pages_bp = Blueprint("pages", __name__)
page_repo = PageRepository()


@pages_bp.route("", methods=["GET"])
def get_pages():
    """
    GET /api/v1/pages
    Returns list of all available dynamic pages.
    """
    pages = page_repo.find_all()
    return success_response(data=pages, message="Pages retrieved successfully")


@pages_bp.route("/<slug>", methods=["GET"])
def get_page_by_slug(slug: str):
    """
    GET /api/v1/pages/<slug>
    Returns dynamic content, hero, and sections for a specific page.
    """
    page = page_repo.find_by_slug(slug)
    if not page:
        raise NotFoundError(message=f"Page '{slug}' not found")
    return success_response(data=page, message="Page content retrieved successfully")


@pages_bp.route("/<slug>", methods=["PUT", "POST"])
def upsert_page(slug: str):
    """
    PUT /api/v1/pages/<slug>
    Updates or creates dynamic page content.
    """
    body = request.get_json() or {}
    title = body.get("title")
    if not title:
        raise ValidationError(message="Page title is required")

    meta_description = body.get("metaDescription", body.get("meta_description", ""))
    hero = body.get("hero", {})
    sections = body.get("sections", [])

    updated_page = page_repo.upsert_page(
        slug=slug,
        title=title,
        meta_description=meta_description,
        hero=hero,
        sections=sections
    )
    return success_response(data=updated_page, message="Page content saved successfully")
