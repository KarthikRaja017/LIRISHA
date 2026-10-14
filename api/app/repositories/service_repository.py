"""
Service Repository.
Handles all raw SQL database operations for services and sub-services.
NO ORM - Uses parameterized SQL queries (%s).
"""
from typing import Any, Dict, List, Optional
from app.repositories.base_repository import BaseRepository


class ServiceRepository(BaseRepository):
    """Repository handling SQL queries for the services table."""

    def to_camel_case(self, row: Dict[str, Any]) -> Dict[str, Any]:
        """Formats database row to match frontend ServiceCategory interface."""
        return {
            "id": row["id"],
            "slug": row["slug"],
            "name": row["name"],
            "tagline": row.get("tagline") or "",
            "shortDesc": row.get("short_desc") or "",
            "fullDesc": row.get("full_desc") or "",
            "iconClass": row.get("icon_class") or "",
            "heroImage": row.get("hero_image") or "",
            "beforeSrc": row.get("before_src") or "",
            "afterSrc": row.get("after_src") or "",
            "beforeAlt": row.get("before_alt") or "",
            "afterAlt": row.get("after_alt") or "",
            "turnaroundTime": row.get("turnaround_time") or "",
            "deliverables": row.get("deliverables") or [],
            "keyBenefits": row.get("key_benefits") or [],
            "subServices": row.get("sub_services") or []
        }

    def find_all(self, active_only: bool = True) -> List[Dict[str, Any]]:
        """Fetches all services ordered by display_order."""
        query = """
            SELECT id, slug, name, tagline, short_desc, full_desc, icon_class,
                   hero_image, before_src, after_src, before_alt, after_alt,
                   turnaround_time, deliverables, key_benefits, sub_services
            FROM services
        """
        if active_only:
            query += " WHERE is_active = TRUE"
        query += " ORDER BY display_order ASC, id ASC"

        rows = self.fetch_all(query)
        return [self.to_camel_case(row) for row in rows]

    def find_by_slug_or_id(self, identifier: str) -> Optional[Dict[str, Any]]:
        """Fetches a single service by slug or id."""
        query = """
            SELECT id, slug, name, tagline, short_desc, full_desc, icon_class,
                   hero_image, before_src, after_src, before_alt, after_alt,
                   turnaround_time, deliverables, key_benefits, sub_services
            FROM services
            WHERE (slug = %s OR id = %s) AND is_active = TRUE
            LIMIT 1
        """
        row = self.fetch_one(query, (identifier, identifier))
        return self.to_camel_case(row) if row else None

    def upsert(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Creates or updates a service record."""
        import json
        query = """
            INSERT INTO services (
                id, slug, name, tagline, short_desc, full_desc, icon_class,
                hero_image, before_src, after_src, before_alt, after_alt,
                turnaround_time, deliverables, key_benefits, sub_services,
                display_order, is_active, updated_at
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s,
                %s, %s, %s, %s,
                %s, %s, CURRENT_TIMESTAMP
            )
            ON CONFLICT (id) DO UPDATE SET
                slug = EXCLUDED.slug,
                name = EXCLUDED.name,
                tagline = EXCLUDED.tagline,
                short_desc = EXCLUDED.short_desc,
                full_desc = EXCLUDED.full_desc,
                icon_class = EXCLUDED.icon_class,
                hero_image = EXCLUDED.hero_image,
                before_src = EXCLUDED.before_src,
                after_src = EXCLUDED.after_src,
                before_alt = EXCLUDED.before_alt,
                after_alt = EXCLUDED.after_alt,
                turnaround_time = EXCLUDED.turnaround_time,
                deliverables = EXCLUDED.deliverables,
                key_benefits = EXCLUDED.key_benefits,
                sub_services = EXCLUDED.sub_services,
                display_order = EXCLUDED.display_order,
                is_active = EXCLUDED.is_active,
                updated_at = CURRENT_TIMESTAMP
            RETURNING id, slug, name, tagline, short_desc, full_desc, icon_class,
                      hero_image, before_src, after_src, before_alt, after_alt,
                      turnaround_time, deliverables, key_benefits, sub_services
        """
        row = self.execute_returning(
            query,
            (
                data["id"],
                data.get("slug", data["id"]),
                data["name"],
                data.get("tagline", ""),
                data.get("shortDesc", data.get("short_desc", "")),
                data.get("fullDesc", data.get("full_desc", "")),
                data.get("iconClass", data.get("icon_class", "")),
                data.get("heroImage", data.get("hero_image", "")),
                data.get("beforeSrc", data.get("before_src", "")),
                data.get("afterSrc", data.get("after_src", "")),
                data.get("beforeAlt", data.get("before_alt", "")),
                data.get("afterAlt", data.get("after_alt", "")),
                data.get("turnaroundTime", data.get("turnaround_time", "")),
                json.dumps(data.get("deliverables", [])),
                json.dumps(data.get("keyBenefits", data.get("key_benefits", []))),
                json.dumps(data.get("subServices", data.get("sub_services", []))),
                data.get("displayOrder", data.get("display_order", 0)),
                data.get("isActive", True),
            )
        )
        return self.to_camel_case(row)

    def delete(self, service_id: str) -> bool:
        """Deletes a service by id."""
        query = "DELETE FROM services WHERE id = %s"
        return self.execute(query, (service_id,)) > 0

