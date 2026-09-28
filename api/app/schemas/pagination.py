"""
Pagination Query Schema.
"""
from typing import Optional
from pydantic import BaseModel, Field


class PaginationQuerySchema(BaseModel):
    """Schema for validating pagination query parameters."""
    page: int = Field(1, ge=1, description="Page number")
    page_size: int = Field(20, ge=1, le=100, description="Items per page")
