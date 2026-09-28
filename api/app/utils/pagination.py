"""
Pagination Utility.
Calculates offset/limit for SQL queries and formats paginated responses.
"""
import math
from typing import Any, List, Dict
from flask import request


class PaginationParams:
    """Parses and sanitizes pagination parameters from HTTP request args."""

    def __init__(
        self,
        default_page: int = 1,
        default_page_size: int = 20,
        max_page_size: int = 100
    ):
        try:
            raw_page = request.args.get("page", default_page)
            self.page = max(1, int(raw_page))
        except (ValueError, TypeError):
            self.page = default_page

        try:
            raw_size = request.args.get("page_size", request.args.get("limit", default_page_size))
            self.page_size = max(1, min(int(raw_size), max_page_size))
        except (ValueError, TypeError):
            self.page_size = default_page_size

    @property
    def offset(self) -> int:
        """Calculates SQL OFFSET."""
        return (self.page - 1) * self.page_size

    @property
    def limit(self) -> int:
        """Returns SQL LIMIT."""
        return self.page_size


def format_paginated_response(
    items: List[Any],
    total: int,
    page: int,
    page_size: int
) -> Dict[str, Any]:
    """
    Builds standard paginated data dictionary.
    
    Structure:
    {
        "items": [...],
        "pagination": {
            "page": 1,
            "page_size": 20,
            "total": 100,
            "total_pages": 5
        }
    }
    """
    total_pages = math.ceil(total / page_size) if page_size > 0 else 0
    return {
        "items": items,
        "pagination": {
            "page": page,
            "page_size": page_size,
            "total": total,
            "total_pages": total_pages,
        }
    }
