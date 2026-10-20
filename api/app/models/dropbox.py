"""
Dropbox Domain Models.
Plain dataclasses — no ORM, no SQLAlchemy.
These mirror the shape of data returned by the Dropbox SDK.
"""
from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Optional


@dataclass
class DropboxFile:
    """Represents a single image file fetched from Dropbox."""
    name: str
    path: str                       # path_lower
    path_display: str               # path_display (original case)
    id: str
    size: int
    client_modified: datetime
    server_modified: datetime
    is_downloadable: bool
    temp_url: Optional[str] = None          # 4-hour temporary download link
    thumbnail_url: Optional[str] = None     # future: thumbnail via Dropbox thumb API


@dataclass
class DropboxFolder:
    """Represents a folder listing result from Dropbox."""
    path: str
    files: List[DropboxFile] = field(default_factory=list)
    total_count: int = 0
    cached: bool = False
    fetched_at: Optional[datetime] = None


@dataclass
class DropboxSubfolder:
    """Represents a single subfolder returned from Dropbox."""
    name: str
    path: str
    id: str
