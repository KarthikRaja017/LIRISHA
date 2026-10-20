"""
Dropbox Service.
Handles all communication with the Dropbox Python SDK.
Uses DropboxRepository as a DB/memory cache layer to minimise API calls
and stay within Dropbox rate limits.
Supports browsing all folders/files, uploading files, creating folders, and deleting items.
"""
import os
import logging
from typing import Any, Dict, List, Optional

import dropbox
from dropbox.exceptions import ApiError, AuthError
from dropbox.files import FileMetadata, FolderMetadata, ListFolderResult, WriteMode

from app.repositories.dropbox_repository import DropboxRepository
from app.errors.exceptions import AppException
from app.errors.codes import ErrorCode
from app.constants.status_codes import HTTP_502_BAD_GATEWAY

logger = logging.getLogger("app.services.dropbox")

_IMAGE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".webp",
    ".gif", ".bmp", ".tiff", ".tif", ".svg"
}

_VIDEO_EXTENSIONS = {
    ".mp4", ".mov", ".avi", ".mkv", ".webm"
}


class ExternalServiceError(AppException):
    """Raised when an upstream third-party API call fails (HTTP 502)."""
    def __init__(self, message: str = "External service error"):
        super().__init__(
            message=message,
            code=ErrorCode.EXTERNAL_SERVICE_ERROR,
            status_code=HTTP_502_BAD_GATEWAY,
        )


class DropboxService:
    """
    Business logic layer for Dropbox file & folder operations.
    """

    def __init__(self):
        self._token: str        = os.getenv("DROPBOX_ACCESS_TOKEN", "")
        self._app_key: str      = os.getenv("DROPBOX_APP_KEY", "")
        self._app_secret: str   = os.getenv("DROPBOX_APP_SECRET", "")
        self._refresh_token: str = os.getenv("DROPBOX_REFRESH_TOKEN", "")
        self._cache_ttl: int    = int(os.getenv("DROPBOX_CACHE_TTL_SECONDS", "3600"))
        self._repo = DropboxRepository()

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def browse(self, folder_path: str = "", use_cache: bool = True) -> Dict[str, Any]:
        """
        Browses any folder in Dropbox, returning both subfolders and files.
        Works for root ("" or "/") as well as any subfolder.
        """
        # Normalize folder_path: Dropbox API treats "" as root
        norm_path = folder_path.strip()
        if norm_path in ("/", ""):
            norm_path = ""
        elif not norm_path.startswith("/"):
            norm_path = "/" + norm_path

        cache_key = self._make_cache_key("browse_" + (norm_path or "root"))

        if use_cache:
            cached = self._repo.get_cached_folder(cache_key)
            if cached:
                logger.info("Dropbox browse cache HIT path=%s", norm_path or "/")
                return cached

        logger.info("Dropbox browse cache MISS path=%s — calling API", norm_path or "/")

        try:
            dbx = self._get_client()
            folders: List[Dict[str, Any]] = []
            files: List[Dict[str, Any]] = []

            result: ListFolderResult = dbx.files_list_folder(norm_path)
            while True:
                for entry in result.entries:
                    if isinstance(entry, FolderMetadata):
                        folders.append({
                            "name": entry.name,
                            "path": entry.path_lower,
                            "pathDisplay": entry.path_display,
                            "id": entry.id,
                        })
                    elif isinstance(entry, FileMetadata):
                        files.append(self._serialize_file(dbx, entry))

                if not result.has_more:
                    break
                result = dbx.files_list_folder_continue(result.cursor)

            # Sort folders and files by name
            folders.sort(key=lambda x: x["name"].lower())
            files.sort(key=lambda x: x["name"].lower())

            # Determine parent path
            parent_path = None
            if norm_path:
                parent_parts = norm_path.rstrip("/").rsplit("/", 1)
                parent_path = parent_parts[0] if len(parent_parts) > 1 and parent_parts[0] else ""

            response_data = {
                "current_path": norm_path or "/",
                "parent_path": parent_path,
                "folders": folders,
                "files": files,
                "total_count": len(files),
                "total_folders": len(folders),
                "cached": False,
            }

            self._repo.upsert_cache(
                cache_key=cache_key,
                folder_path=norm_path or "/",
                files_data=files,
                ttl_seconds=self._cache_ttl,
            )

            return response_data

        except AuthError as e:
            logger.error("Dropbox auth error: %s", e)
            raise ExternalServiceError(message="Dropbox authentication failed. Please update access token.")
        except ApiError as e:
            logger.error("Dropbox browse API error for %s: %s", norm_path, e)
            raise ExternalServiceError(message=f"Dropbox error: {e.error}")

    def upload_file(self, folder_path: str, filename: str, file_bytes: bytes) -> Dict[str, Any]:
        """
        Uploads a file directly to the specified Dropbox folder.
        Invalidates caches and returns the uploaded file metadata with temporary link.
        """
        norm_path = folder_path.strip().rstrip("/")
        if not norm_path or norm_path == "/":
            norm_path = ""
        target_path = f"{norm_path}/{filename.lstrip('/')}"

        logger.info("Uploading file to Dropbox: %s (%d bytes)", target_path, len(file_bytes))

        try:
            dbx = self._get_client()
            res: FileMetadata = dbx.files_upload(
                file_bytes,
                target_path,
                mode=WriteMode.overwrite,
                mute=True
            )

            file_data = self._serialize_file(dbx, res)

            # Invalidate caches for parent folder
            self.invalidate_cache(norm_path or "/")
            self.invalidate_cache(norm_path or "root")
            self.invalidate_cache("browse_" + (norm_path or "root"))

            return file_data

        except AuthError as e:
            logger.error("Dropbox auth error on upload: %s", e)
            raise ExternalServiceError(message="Dropbox authentication failed on upload")
        except ApiError as e:
            logger.error("Dropbox upload API error: %s", e)
            raise ExternalServiceError(message=f"Dropbox upload error: {e.error}")

    def create_folder(self, folder_path: str) -> Dict[str, Any]:
        """Creates a new folder in Dropbox."""
        norm_path = folder_path.strip()
        if not norm_path.startswith("/"):
            norm_path = "/" + norm_path

        try:
            dbx = self._get_client()
            res = dbx.files_create_folder_v2(norm_path)
            metadata = res.metadata

            # Invalidate parent cache
            parent = norm_path.rsplit("/", 1)[0]
            self.invalidate_cache("browse_" + (parent or "root"))

            return {
                "name": metadata.name,
                "path": metadata.path_lower,
                "pathDisplay": metadata.path_display,
                "id": metadata.id,
            }
        except ApiError as e:
            logger.error("Failed to create folder %s: %s", norm_path, e)
            raise ExternalServiceError(message=f"Could not create folder: {e.error}")

    def delete_item(self, path: str) -> bool:
        """Deletes a file or folder from Dropbox."""
        norm_path = path.strip()
        if not norm_path.startswith("/"):
            norm_path = "/" + norm_path

        try:
            dbx = self._get_client()
            dbx.files_delete_v2(norm_path)

            parent = norm_path.rsplit("/", 1)[0]
            self.invalidate_cache(parent or "/")
            self.invalidate_cache("browse_" + (parent or "root"))
            return True
        except ApiError as e:
            logger.error("Failed to delete %s: %s", norm_path, e)
            raise ExternalServiceError(message=f"Delete failed: {e.error}")

    def list_folder(
        self,
        folder_path: str,
        use_cache: bool = True,
    ) -> Dict[str, Any]:
        """Lists all image files inside a Dropbox folder (with cache)."""
        browse_res = self.browse(folder_path=folder_path, use_cache=use_cache)
        image_files = [f for f in browse_res.get("files", []) if f.get("isImage", False)]
        return {
            "path": browse_res.get("current_path", folder_path),
            "files": image_files,
            "total_count": len(image_files),
            "cached": browse_res.get("cached", False),
            "fetchedAt": None,
        }

    def get_temporary_link(self, file_path: str) -> str:
        """Generates a 4-hour temporary HTTPS download link for a single file."""
        try:
            dbx = self._get_client()
            result = dbx.files_get_temporary_link(file_path)
            return result.link
        except ApiError as e:
            logger.error("Failed to get temp link for %s: %s", file_path, e)
            raise ExternalServiceError(message=f"Could not generate temporary link: {e.error}")

    def list_subfolders(self, parent_path: str) -> List[Dict[str, str]]:
        """Returns the immediate child folders of a given Dropbox path."""
        res = self.browse(folder_path=parent_path, use_cache=False)
        return res.get("folders", [])

    def invalidate_cache(self, folder_path: str) -> bool:
        """Marks the cache entry for folder_path as invalid."""
        cache_key = self._make_cache_key(folder_path)
        browse_key = self._make_cache_key("browse_" + (folder_path or "root"))
        r1 = self._repo.invalidate(cache_key)
        r2 = self._repo.invalidate(browse_key)
        return r1 or r2

    def invalidate_all_cache(self) -> int:
        """Invalidates all cache entries."""
        return self._repo.invalidate_all()

    def get_cache_status(self) -> List[Dict[str, Any]]:
        """Returns summary of all cache entries."""
        rows = self._repo.get_all_cache_keys()
        for row in rows:
            for key in ("fetched_at", "expires_at"):
                if hasattr(row.get(key), "isoformat"):
                    row[key] = row[key].isoformat()
        return rows

    # ------------------------------------------------------------------
    # Private helpers
    # ------------------------------------------------------------------

    def _get_client(self) -> dropbox.Dropbox:
        if not self._token and not self._refresh_token:
            raise ExternalServiceError(
                message="Dropbox credentials are not configured. Add DROPBOX_ACCESS_TOKEN to api/.env"
            )
        try:
            if self._refresh_token and self._app_key and self._app_secret:
                return dropbox.Dropbox(
                    oauth2_refresh_token=self._refresh_token,
                    app_key=self._app_key,
                    app_secret=self._app_secret,
                )
            return dropbox.Dropbox(self._token)
        except AuthError as e:
            logger.error("Dropbox client creation failed: %s", e)
            raise ExternalServiceError(message="Dropbox authentication failed")

    def _serialize_file(
        self, dbx: dropbox.Dropbox, entry: FileMetadata
    ) -> Dict[str, Any]:
        ext = "." + entry.name.rsplit(".", 1)[-1].lower() if "." in entry.name else ""
        is_img = ext in _IMAGE_EXTENSIONS
        is_vid = ext in _VIDEO_EXTENSIONS

        data: Dict[str, Any] = {
            "name": entry.name,
            "path": entry.path_lower,
            "pathDisplay": entry.path_display,
            "id": entry.id,
            "size": entry.size,
            "clientModified": entry.client_modified.isoformat() if entry.client_modified else "",
            "serverModified": entry.server_modified.isoformat() if entry.server_modified else "",
            "isDownloadable": entry.is_downloadable,
            "isImage": is_img,
            "isVideo": is_vid,
            "extension": ext,
            "tempUrl": None,
        }

        # Automatically generate temporary link for previewing and downloading
        if entry.is_downloadable:
            try:
                link = dbx.files_get_temporary_link(entry.path_lower)
                data["tempUrl"] = link.link
            except Exception as exc:
                logger.debug("Could not generate temp link for %s: %s", entry.path_lower, exc)

        return data

    @staticmethod
    def _make_cache_key(folder_path: str) -> str:
        k = folder_path.lower().strip("/").replace("/", "_").replace(" ", "-")
        return k or "root"
