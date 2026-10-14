"""
Page Content Repository.
Handles all raw SQL database operations for dynamic page CMS content.
NO ORM - Uses parameterized SQL queries (%s).
"""
import json
from typing import Any, Dict, List, Optional
from app.repositories.base_repository import BaseRepository


class PageRepository(BaseRepository):
    """Repository handling SQL queries for the pages table."""

    def to_camel_case(self, row: Dict[str, Any]) -> Dict[str, Any]:
        """Formats database row to match frontend page content structure."""
        return {
            "slug": row["slug"],
            "title": row["title"],
            "metaDescription": row.get("meta_description") or "",
            "hero": row.get("hero") or {},
            "sections": row.get("sections") or [],
            "updatedAt": str(row.get("updated_at", ""))
        }

    def find_by_slug(self, slug: str) -> Optional[Dict[str, Any]]:
        """Fetches a published page's dynamic content by slug."""
        query = """
            SELECT slug, title, meta_description, hero, sections, updated_at
            FROM pages
            WHERE slug = %s AND is_published = TRUE
            LIMIT 1
        """
        row = self.fetch_one(query, (slug,))
        return self.to_camel_case(row) if row else None

    def find_all(self) -> List[Dict[str, Any]]:
        """Fetches all pages."""
        query = "SELECT slug, title, meta_description, hero, sections, updated_at FROM pages ORDER BY slug ASC"
        rows = self.fetch_all(query)
        return [self.to_camel_case(row) for row in rows]

    def upsert_page(
        self,
        slug: str,
        title: str,
        meta_description: str = "",
        hero: Dict[str, Any] = None,
        sections: List[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Creates or updates dynamic page content."""
        hero = hero or {}
        sections = sections or []
        query = """
            INSERT INTO pages (slug, title, meta_description, hero, sections, updated_at)
            VALUES (%s, %s, %s, %s, %s, CURRENT_TIMESTAMP)
            ON CONFLICT (slug) DO UPDATE SET
                title = EXCLUDED.title,
                meta_description = EXCLUDED.meta_description,
                hero = EXCLUDED.hero,
                sections = EXCLUDED.sections,
                updated_at = CURRENT_TIMESTAMP
            RETURNING slug, title, meta_description, hero, sections, updated_at
        """
        row = self.execute_returning(
            query,
            (slug, title, meta_description, json.dumps(hero), json.dumps(sections))
        )
        return self.to_camel_case(row)
