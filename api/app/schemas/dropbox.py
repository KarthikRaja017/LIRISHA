"""
Dropbox Pydantic Schemas.
Used for request body validation on Dropbox endpoints.
"""
from pydantic import BaseModel, Field
from typing import List, Optional


class DropboxFileSchema(BaseModel):
    """Shape of a single file item in API responses."""
    name: str
    path: str
    pathDisplay: str
    id: str
    size: int
    clientModified: str
    serverModified: str
    isDownloadable: bool
    tempUrl: Optional[str] = None
    thumbnailUrl: Optional[str] = None


class DropboxFolderResponseSchema(BaseModel):
    """Shape of the folder listing API response."""
    path: str
    files: List[DropboxFileSchema]
    total_count: int
    cached: bool
    fetchedAt: Optional[str] = None


class DropboxCacheInvalidateSchema(BaseModel):
    """Request body for POST /dropbox/cache/invalidate."""
    path: str = Field(..., min_length=1, description="Dropbox folder path to invalidate")
