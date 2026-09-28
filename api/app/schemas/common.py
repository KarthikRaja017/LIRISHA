"""
Common Base Pydantic Schemas.
"""
from typing import Any, Generic, List, Optional, TypeVar
from pydantic import BaseModel, Field

T = TypeVar("T")


class PaginationMetaSchema(BaseModel):
    """Schema for pagination metadata."""
    page: int = Field(ge=1, description="Current page number")
    page_size: int = Field(ge=1, description="Items per page")
    total: int = Field(ge=0, description="Total item count across all pages")
    total_pages: int = Field(ge=0, description="Total number of pages")


class PaginatedResponseSchema(BaseModel, Generic[T]):
    """Generic schema for paginated responses."""
    items: List[T]
    pagination: PaginationMetaSchema
