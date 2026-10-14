"""
Resource & Testimonials Repository.
Handles all raw SQL database operations for articles, case studies, blogs, and testimonials.
NO ORM - Uses parameterized SQL queries (%s).
"""
from typing import Any, Dict, List, Optional
from app.repositories.base_repository import BaseRepository


class ResourceRepository(BaseRepository):
    """Repository handling SQL queries for resources and testimonials tables."""

    def to_resource_camel(self, row: Dict[str, Any]) -> Dict[str, Any]:
        """Formats database row to match frontend ResourceArticle interface."""
        return {
            "id": row["id"],
            "slug": row["slug"],
            "category": row["category"],
            "title": row["title"],
            "excerpt": row.get("excerpt") or "",
            "content": row.get("content") or "",
            "date": row.get("date") or "",
            "author": row.get("author") or "",
            "readTime": row.get("read_time") or "",
            "image": row.get("image") or "",
            "link": row.get("link") or "",
            "tags": row.get("tags") or [],
            "metrics": row.get("metrics") or [],
            "clientDetails": row.get("client_details") or {}
        }

    def to_testimonial_camel(self, row: Dict[str, Any]) -> Dict[str, Any]:
        """Formats database row to match frontend TestimonialItem interface."""
        return {
            "id": row["id"],
            "author": row["author"],
            "role": row.get("role") or "",
            "company": row.get("company") or "",
            "location": row.get("location") or "",
            "avatar": row.get("avatar") or "",
            "quote": row["quote"],
            "rating": row.get("rating") or 5,
            "projectType": row.get("project_type") or ""
        }

    def find_all_resources(self, category: Optional[str] = None) -> List[Dict[str, Any]]:
        """Fetches published resources, optionally filtered by category."""
        if category:
            query = """
                SELECT id, slug, category, title, excerpt, content, date,
                       author, read_time, image, link, tags, metrics, client_details
                FROM resources
                WHERE is_published = TRUE AND category ILIKE %s
                ORDER BY created_at DESC, id ASC
            """
            rows = self.fetch_all(query, (category,))
        else:
            query = """
                SELECT id, slug, category, title, excerpt, content, date,
                       author, read_time, image, link, tags, metrics, client_details
                FROM resources
                WHERE is_published = TRUE
                ORDER BY created_at DESC, id ASC
            """
            rows = self.fetch_all(query)
        return [self.to_resource_camel(row) for row in rows]

    def find_resource_by_slug_or_id(self, identifier: str) -> Optional[Dict[str, Any]]:
        """Fetches a single resource article/case study/blog post."""
        query = """
            SELECT id, slug, category, title, excerpt, content, date,
                   author, read_time, image, link, tags, metrics, client_details
            FROM resources
            WHERE (slug = %s OR id = %s) AND is_published = TRUE
            LIMIT 1
        """
        row = self.fetch_one(query, (identifier, identifier))
        return self.to_resource_camel(row) if row else None

    def find_all_testimonials(self) -> List[Dict[str, Any]]:
        """Fetches active testimonials ordered by display_order."""
        query = """
            SELECT id, author, role, company, location, avatar, quote,
                   rating, project_type
            FROM testimonials
            WHERE is_active = TRUE
            ORDER BY display_order ASC, id ASC
        """
        rows = self.fetch_all(query)
        return [self.to_testimonial_camel(row) for row in rows]

    def upsert_resource(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Creates or updates a resource record."""
        import json
        query = """
            INSERT INTO resources (
                id, slug, category, title, excerpt, content, date,
                author, read_time, image, link, tags, metrics,
                client_details, is_published, updated_at
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s, %s,
                %s, %s, CURRENT_TIMESTAMP
            )
            ON CONFLICT (id) DO UPDATE SET
                slug = EXCLUDED.slug,
                category = EXCLUDED.category,
                title = EXCLUDED.title,
                excerpt = EXCLUDED.excerpt,
                content = EXCLUDED.content,
                date = EXCLUDED.date,
                author = EXCLUDED.author,
                read_time = EXCLUDED.read_time,
                image = EXCLUDED.image,
                link = EXCLUDED.link,
                tags = EXCLUDED.tags,
                metrics = EXCLUDED.metrics,
                client_details = EXCLUDED.client_details,
                is_published = EXCLUDED.is_published,
                updated_at = CURRENT_TIMESTAMP
            RETURNING id, slug, category, title, excerpt, content, date,
                      author, read_time, image, link, tags, metrics, client_details
        """
        row = self.execute_returning(
            query,
            (
                data["id"],
                data.get("slug", data["id"]),
                data.get("category", "Articles"),
                data["title"],
                data.get("excerpt", ""),
                data.get("content", data.get("excerpt", "")),
                data.get("date", ""),
                data.get("author", "SmartPHOTOeditors Team"),
                data.get("readTime", data.get("read_time", "5 min read")),
                data.get("image", ""),
                data.get("link", f"/resources/{data.get('slug', data['id'])}"),
                json.dumps(data.get("tags", [])),
                json.dumps(data.get("metrics", [])),
                json.dumps(data.get("clientDetails", data.get("client_details", {}))),
                data.get("isPublished", True),
            )
        )
        return self.to_resource_camel(row)

    def delete_resource(self, resource_id: str) -> bool:
        """Deletes a resource by id."""
        query = "DELETE FROM resources WHERE id = %s"
        return self.execute(query, (resource_id,)) > 0

    def upsert_testimonial(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Creates or updates a testimonial record."""
        query = """
            INSERT INTO testimonials (
                id, author, role, company, location, avatar, quote,
                rating, project_type, display_order, is_active
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s,
                %s, %s, %s, %s
            )
            ON CONFLICT (id) DO UPDATE SET
                author = EXCLUDED.author,
                role = EXCLUDED.role,
                company = EXCLUDED.company,
                location = EXCLUDED.location,
                avatar = EXCLUDED.avatar,
                quote = EXCLUDED.quote,
                rating = EXCLUDED.rating,
                project_type = EXCLUDED.project_type,
                display_order = EXCLUDED.display_order,
                is_active = EXCLUDED.is_active
            RETURNING id, author, role, company, location, avatar, quote, rating, project_type
        """
        row = self.execute_returning(
            query,
            (
                data["id"],
                data.get("author", "Anonymous"),
                data.get("role", ""),
                data.get("company", ""),
                data.get("location", ""),
                data.get("avatar", ""),
                data.get("quote", ""),
                data.get("rating", 5),
                data.get("projectType", data.get("project_type", "")),
                data.get("displayOrder", data.get("display_order", 0)),
                data.get("isActive", True),
            )
        )
        return self.to_testimonial_camel(row)

    def delete_testimonial(self, testimonial_id: str) -> bool:
        """Deletes a testimonial by id."""
        query = "DELETE FROM testimonials WHERE id = %s"
        return self.execute(query, (testimonial_id,)) > 0

