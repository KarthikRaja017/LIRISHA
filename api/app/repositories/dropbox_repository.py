"""
Dropbox Repository.
Manages the dropbox_cache table using raw parameterized SQL.
Provides instant in-memory caching fallback if PostgreSQL is offline or unseeded.
NO ORM — follows the project BaseRepository pattern.
"""
import json
import logging
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List, Optional

from app.repositories.base_repository import BaseRepository

logger = logging.getLogger("app.repository.dropbox")

_memory_cache: Dict[str, Dict[str, Any]] = {}
_db_available: Optional[bool] = None


class DropboxRepository(BaseRepository):
    """Handles caching for Dropbox items with instant memory fallback."""

    def _is_db_ready(self) -> bool:
        global _db_available
        if _db_available is False:
            return False
        if _db_available is True:
            return True
        try:
            from app.extensions.database import get_db_cursor
            with get_db_cursor() as cursor:
                cursor.execute("SELECT 1")
            _db_available = True
            return True
        except Exception:
            _db_available = False
            logger.info("PostgreSQL is currently offline. Dropbox caching will use fast in-memory storage.")
            return False

    def get_cached_folder(self, cache_key: str) -> Optional[Dict[str, Any]]:
        """Returns cached folder data if valid."""
        # Check database if available
        if self._is_db_ready():
            try:
                query = """
                    SELECT folder_path, files_data, total_count, fetched_at
                    FROM dropbox_cache
                    WHERE cache_key = %s
                      AND is_valid  = TRUE
                      AND expires_at > NOW()
                    LIMIT 1
                """
                row = self.fetch_one(query, (cache_key,))
                if row:
                    files_data = row["files_data"]
                    if isinstance(files_data, str):
                        files_data = json.loads(files_data)
                    fetched_at = row["fetched_at"]
                    return {
                        "path": row["folder_path"],
                        "files": files_data,
                        "total_count": row["total_count"],
                        "cached": True,
                        "fetchedAt": fetched_at.isoformat() if fetched_at else None,
                    }
            except Exception as e:
                logger.debug(f"DB cache read error: {e}")

        # In-memory cache
        mem = _memory_cache.get(cache_key)
        if mem and mem.get("expires_at", datetime.min.replace(tzinfo=timezone.utc)) > datetime.now(timezone.utc):
            if mem.get("is_valid", True):
                return mem.get("data")
        return None

    def upsert_cache(
        self,
        cache_key: str,
        folder_path: str,
        files_data: List[Dict[str, Any]],
        ttl_seconds: int = 3600,
    ) -> None:
        """Stores cache entry in memory and DB."""
        expires_at = datetime.now(timezone.utc) + timedelta(seconds=ttl_seconds)
        data = {
            "path": folder_path,
            "files": files_data,
            "total_count": len(files_data),
            "cached": True,
            "fetchedAt": datetime.now(timezone.utc).isoformat(),
        }

        # Always store in memory cache immediately
        _memory_cache[cache_key] = {
            "data": data,
            "expires_at": expires_at,
            "is_valid": True,
            "folder_path": folder_path,
            "total_count": len(files_data),
        }

        # Persist to DB if ready
        if self._is_db_ready():
            try:
                query = """
                    INSERT INTO dropbox_cache
                        (cache_key, folder_path, files_data, total_count, fetched_at, expires_at, is_valid)
                    VALUES (%s, %s, %s::jsonb, %s, NOW(), %s, TRUE)
                    ON CONFLICT (cache_key) DO UPDATE SET
                        folder_path = EXCLUDED.folder_path,
                        files_data  = EXCLUDED.files_data,
                        total_count = EXCLUDED.total_count,
                        fetched_at  = NOW(),
                        expires_at  = EXCLUDED.expires_at,
                        is_valid    = TRUE
                """
                self.execute(query, (
                    cache_key,
                    folder_path,
                    json.dumps(files_data),
                    len(files_data),
                    expires_at,
                ))
            except Exception as e:
                logger.debug(f"DB cache write skipped: {e}")

    def invalidate(self, cache_key: str) -> bool:
        if cache_key in _memory_cache:
            _memory_cache[cache_key]["is_valid"] = False

        if self._is_db_ready():
            try:
                query = "UPDATE dropbox_cache SET is_valid = FALSE WHERE cache_key = %s"
                return self.execute(query, (cache_key,)) > 0
            except Exception:
                pass
        return True

    def invalidate_all(self) -> int:
        count = len(_memory_cache)
        for v in _memory_cache.values():
            v["is_valid"] = False

        if self._is_db_ready():
            try:
                query = "UPDATE dropbox_cache SET is_valid = FALSE WHERE is_valid = TRUE"
                return self.execute(query)
            except Exception:
                pass
        return count

    def get_all_cache_keys(self) -> List[Dict[str, Any]]:
        now = datetime.now(timezone.utc)
        return [
            {
                "cache_key": k,
                "folder_path": v.get("folder_path"),
                "total_count": v.get("total_count", 0),
                "fetched_at": v.get("data", {}).get("fetchedAt"),
                "expires_at": v.get("expires_at", now).isoformat(),
                "is_valid": v.get("is_valid", True),
                "is_fresh": v.get("expires_at", now) > now and v.get("is_valid", True),
            }
            for k, v in _memory_cache.items()
        ]
