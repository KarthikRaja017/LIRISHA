"""
Settings Repository.
Handles all raw SQL database operations for global website settings, logos, favicons, branding.
NO ORM - Uses parameterized SQL queries (%s).
"""
import json
from typing import Any, Dict, List, Optional
from app.repositories.base_repository import BaseRepository


class SettingsRepository(BaseRepository):
    """Repository handling SQL queries for the site_settings table."""

    def get_all(self) -> Dict[str, Any]:
        """Fetches all site settings as a dictionary of key: {value, metadata, updatedAt}."""
        query = "SELECT key, value, metadata, updated_at FROM site_settings ORDER BY key ASC"
        rows = self.fetch_all(query)
        result: Dict[str, Any] = {}
        for row in rows:
            result[row["key"]] = {
                "value": row["value"],
                "metadata": row.get("metadata") or {},
                "updatedAt": str(row.get("updated_at", ""))
            }
        return result

    def get_by_key(self, key: str) -> Optional[Dict[str, Any]]:
        """Fetches a specific setting by key."""
        query = "SELECT key, value, metadata, updated_at FROM site_settings WHERE key = %s LIMIT 1"
        row = self.fetch_one(query, (key,))
        if not row:
            return None
        return {
            "key": row["key"],
            "value": row["value"],
            "metadata": row.get("metadata") or {},
            "updatedAt": str(row.get("updated_at", ""))
        }

    def upsert(self, key: str, value: str, metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Creates or updates a setting by key."""
        metadata = metadata or {}
        query = """
            INSERT INTO site_settings (key, value, metadata, updated_at)
            VALUES (%s, %s, %s, CURRENT_TIMESTAMP)
            ON CONFLICT (key) DO UPDATE SET
                value = EXCLUDED.value,
                metadata = COALESCE(EXCLUDED.metadata, site_settings.metadata),
                updated_at = CURRENT_TIMESTAMP
            RETURNING key, value, metadata, updated_at;
        """
        row = self.fetch_one(query, (key, value, json.dumps(metadata)))
        return {
            "key": row["key"],
            "value": row["value"],
            "metadata": row.get("metadata") or {},
            "updatedAt": str(row.get("updated_at", ""))
        }

    def bulk_upsert(self, settings_dict: Dict[str, Any]) -> Dict[str, Any]:
        """Updates multiple settings at once."""
        for key, val in settings_dict.items():
            if isinstance(val, dict):
                value_str = str(val.get("value", ""))
                meta = val.get("metadata", {})
                self.upsert(key, value_str, meta)
            else:
                self.upsert(key, str(val))
        return self.get_all()
