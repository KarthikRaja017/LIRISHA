"""
Dropbox Blueprint.
Provides REST endpoints for listing, browsing, uploading, and managing Dropbox files & folders.

Endpoints:
    GET    /api/v1/dropbox/browse           — browse any folder (subfolders + files with temp URLs)
    GET    /api/v1/dropbox/folders          — list images in a folder (cached)
    GET    /api/v1/dropbox/subfolders       — list child folders
    GET    /api/v1/dropbox/link             — generate temporary download URL
    POST   /api/v1/dropbox/upload           — upload a file to a Dropbox folder
    POST   /api/v1/dropbox/folders/create   — create a new folder
    DELETE /api/v1/dropbox/items            — delete a file or folder
    POST   /api/v1/dropbox/cache/invalidate — invalidate cache
"""
from flask import Blueprint, request
from werkzeug.utils import secure_filename
from app.services.dropbox_service import DropboxService
from app.utils.response import success_response
from app.errors.exceptions import ValidationError

dropbox_bp = Blueprint("dropbox", __name__)
dropbox_service = DropboxService()


# ---------------------------------------------------------------------------
# Browse & Folder Listing
# ---------------------------------------------------------------------------

@dropbox_bp.route("/browse", methods=["GET"])
def browse_dropbox():
    """
    GET /api/v1/dropbox/browse?path=<folder_path>[&refresh=true]
    Returns BOTH subfolders and files in the specified path (or root if empty).
    Each file includes name, size, isImage, tempUrl, modified date.
    """
    path = request.args.get("path", "").strip()
    force_refresh = request.args.get("refresh", "false").lower() == "true"
    result = dropbox_service.browse(path, use_cache=not force_refresh)
    return success_response(data=result, message="Dropbox contents retrieved successfully")


@dropbox_bp.route("/folders", methods=["GET"])
def list_folder():
    """GET /api/v1/dropbox/folders?path=<dropbox_path>[&refresh=true]"""
    folder_path = request.args.get("path", "").strip()
    force_refresh = request.args.get("refresh", "false").lower() == "true"
    result = dropbox_service.list_folder(folder_path, use_cache=not force_refresh)
    return success_response(data=result, message="Folder listed successfully")


@dropbox_bp.route("/subfolders", methods=["GET"])
def list_subfolders():
    """GET /api/v1/dropbox/subfolders?path=<dropbox_path>"""
    parent_path = request.args.get("path", "").strip()
    subfolders = dropbox_service.list_subfolders(parent_path)
    return success_response(data=subfolders, message="Subfolders listed successfully")


# ---------------------------------------------------------------------------
# Upload & File Operations
# ---------------------------------------------------------------------------

@dropbox_bp.route("/upload", methods=["POST"])
def upload_file():
    """
    POST /api/v1/dropbox/upload
    Form-data:
        file: Multipart file
        folder_path: Target folder path in Dropbox (defaults to '/lirisha-media')
    """
    if "file" not in request.files:
        raise ValidationError(message="No file uploaded. Send 'file' in multipart form-data.")

    file = request.files["file"]
    if not file or file.filename == "":
        raise ValidationError(message="Selected file is empty")

    folder_path = request.form.get("folder_path", "/lirisha-media").strip()
    filename = secure_filename(file.filename) or file.filename

    file_bytes = file.read()
    uploaded = dropbox_service.upload_file(
        folder_path=folder_path,
        filename=filename,
        file_bytes=file_bytes
    )

    return success_response(
        data=uploaded,
        message=f"File '{filename}' successfully uploaded to Dropbox ({folder_path})"
    )


@dropbox_bp.route("/folders/create", methods=["POST"])
def create_folder():
    """
    POST /api/v1/dropbox/folders/create
    Body: { "path": "/lirisha-media/gallery/new-folder" }
    """
    body = request.get_json(silent=True) or {}
    path = body.get("path", "").strip()
    if not path:
        raise ValidationError(message="'path' is required to create a folder")

    created = dropbox_service.create_folder(path)
    return success_response(data=created, message="Folder created successfully in Dropbox")


@dropbox_bp.route("/items", methods=["DELETE"])
def delete_item():
    """
    DELETE /api/v1/dropbox/items?path=<item_path>
    """
    path = request.args.get("path", "").strip()
    if not path:
        raise ValidationError(message="'path' query parameter is required")

    deleted = dropbox_service.delete_item(path)
    return success_response(data={"deleted": deleted, "path": path}, message="Item deleted successfully")


# ---------------------------------------------------------------------------
# Temporary Link & Cache
# ---------------------------------------------------------------------------

@dropbox_bp.route("/link", methods=["GET"])
def get_temporary_link():
    """GET /api/v1/dropbox/link?path=<file_path>"""
    file_path = request.args.get("path", "").strip()
    if not file_path:
        raise ValidationError(message="Query parameter 'path' is required")
    url = dropbox_service.get_temporary_link(file_path)
    return success_response(data={"url": url}, message="Temporary link generated")


@dropbox_bp.route("/cache/invalidate", methods=["POST"])
def invalidate_cache():
    """POST /api/v1/dropbox/cache/invalidate"""
    body = request.get_json(silent=True) or {}
    folder_path = body.get("path", "").strip()
    invalidated = dropbox_service.invalidate_cache(folder_path)
    return success_response(data={"invalidated": invalidated, "path": folder_path}, message="Cache invalidated")


@dropbox_bp.route("/cache/status", methods=["GET"])
def cache_status():
    """GET /api/v1/dropbox/cache/status"""
    entries = dropbox_service.get_cache_status()
    return success_response(data={"entries": entries, "count": len(entries)}, message="Cache status retrieved")
