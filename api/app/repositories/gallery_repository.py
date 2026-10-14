"""
Gallery Repository.
Handles all raw SQL database operations for gallery tabs and image comparisons.
NO ORM - Uses parameterized SQL queries (%s).
"""
from typing import Any, Dict, List, Optional
from app.repositories.base_repository import BaseRepository


class GalleryRepository(BaseRepository):
    """Repository handling SQL queries for the gallery_tabs table."""

    def to_camel_case(self, row: Dict[str, Any]) -> Dict[str, Any]:
        """Formats database row to match frontend GalleryTab interface."""
        return {
            "id": row["id"],
            "name": row["name"],
            "items": row.get("items") or []
        }

    def find_all_tabs(self, active_only: bool = True) -> List[Dict[str, Any]]:
        """Fetches all gallery tabs ordered by display_order."""
        query = "SELECT id, name, items FROM gallery_tabs"
        if active_only:
            query += " WHERE is_active = TRUE"
        query += " ORDER BY display_order ASC, id ASC"

        rows = self.fetch_all(query)
        return [self.to_camel_case(row) for row in rows]

    def find_tab_by_id(self, tab_id: str) -> Optional[Dict[str, Any]]:
        """Fetches a single gallery tab by id."""
        row = self.fetch_one(query, (tab_id,))
        return self.to_camel_case(row) if row else None

    def upsert(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Creates or updates a gallery tab and its items."""
        import json
        query = """
            INSERT INTO gallery_tabs (id, name, display_order, items, is_active)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name,
                display_order = EXCLUDED.display_order,
                items = EXCLUDED.items,
                is_active = EXCLUDED.is_active
            RETURNING id, name, items
        """
        row = self.execute_returning(
            query,
            (
                data["id"],
                data["name"],
                data.get("displayOrder", data.get("display_order", 0)),
                json.dumps(data.get("items", [])),
                data.get("isActive", True),
            )
        )
        return self.to_camel_case(row)

    def delete(self, tab_id: str) -> bool:
        """Deletes a gallery tab by id."""
        query = "DELETE FROM gallery_tabs WHERE id = %s"
        return self.execute(query, (tab_id,)) > 0

