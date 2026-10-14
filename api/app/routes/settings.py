"""
Site Settings Blueprint.
Provides dynamic REST endpoints for website branding, logos, favicons, contact details, and top page icons.
"""
from flask import Blueprint, request
from app.repositories.settings_repository import SettingsRepository
from app.utils.response import success_response
from app.errors.exceptions import ValidationError

settings_bp = Blueprint("settings", __name__)
settings_repo = SettingsRepository()


@settings_bp.route("", methods=["GET"])
def get_all_settings():
    """
    GET /api/v1/settings
    Returns all site settings (logo, favicon, contact info, branding).
    """
    settings = settings_repo.get_all()
    return success_response(data=settings, message="Settings retrieved successfully")


@settings_bp.route("/<key>", methods=["GET"])
def get_setting_by_key(key: str):
    """
    GET /api/v1/settings/<key>
    Returns setting for a specific key.
    """
    setting = settings_repo.get_by_key(key)
    if not setting:
        return success_response(data={"key": key, "value": ""}, message="Setting not set")
    return success_response(data=setting, message="Setting retrieved successfully")


@settings_bp.route("", methods=["PUT", "POST"])
def update_settings():
    """
    PUT /api/v1/settings
    Bulk updates or single updates site settings.
    Accepts JSON: { "key": "value", ... } or { "settings": { ... } }
    """
    body = request.get_json() or {}
    items = body.get("settings", body)
    if not isinstance(items, dict):
        raise ValidationError(message="Settings payload must be a JSON object")

    updated = settings_repo.bulk_upsert(items)
    return success_response(data=updated, message="Settings updated successfully")


@settings_bp.route("/<key>", methods=["PUT", "POST"])
def update_single_setting(key: str):
    """
    PUT /api/v1/settings/<key>
    Updates a single setting.
    """
    body = request.get_json() or {}
    value = body.get("value", "")
    metadata = body.get("metadata", {})
    setting = settings_repo.upsert(key=key, value=value, metadata=metadata)
    return success_response(data=setting, message=f"Setting '{key}' updated successfully")
