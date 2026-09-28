"""
User Domain Model (Plain Dataclass - NO ORM).
Represents database entity structure cleanly.
"""
from dataclasses import dataclass, asdict
from datetime import datetime
from typing import Any, Dict, Optional


@dataclass
class User:
    """User entity domain representation."""
    id: Optional[int]
    email: str
    password_hash: str
    first_name: str
    last_name: str
    role: str = "user"
    is_active: bool = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    def to_dict(self, exclude_password: bool = True) -> Dict[str, Any]:
        """Converts user instance to dictionary representation."""
        data = asdict(self)
        if exclude_password:
            data.pop("password_hash", None)
        if isinstance(data.get("created_at"), datetime):
            data["created_at"] = data["created_at"].isoformat()
        if isinstance(data.get("updated_at"), datetime):
            data["updated_at"] = data["updated_at"].isoformat()
        return data

    @classmethod
    def from_row(cls, row: Dict[str, Any]) -> "User":
        """Constructs User domain model from database dictionary row."""
        return cls(
            id=row.get("id"),
            email=row["email"],
            password_hash=row["password_hash"],
            first_name=row["first_name"],
            last_name=row["last_name"],
            role=row.get("role", "user"),
            is_active=row.get("is_active", True),
            created_at=row.get("created_at"),
            updated_at=row.get("updated_at"),
        )
