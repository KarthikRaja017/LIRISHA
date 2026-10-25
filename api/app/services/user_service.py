"""
User Service.
Handles business logic for sample user management.
"""
from typing import Any, Dict, Optional
from app.repositories.user_repository import UserRepository
from app.utils.security import hash_password
from app.utils.pagination import format_paginated_response
from app.errors.exceptions import NotFoundError, ConflictError


class UserService:
    """Service handling user CRUD business logic."""

    def __init__(self, user_repo: UserRepository = None):
        self.user_repo = user_repo or UserRepository()

    def get_users(self, page: int = 1, page_size: int = 20, search: Optional[str] = None) -> Dict[str, Any]:
        """Returns paginated list of users."""
        offset = (page - 1) * page_size
        users = self.user_repo.find_all(offset=offset, limit=page_size, search=search)
        total = self.user_repo.count_all(search=search)

        user_dicts = [u.to_dict(exclude_password=True) for u in users]
        return format_paginated_response(
            items=user_dicts,
            total=total,
            page=page,
            page_size=page_size
        )

    def get_user_by_id(self, user_id: int) -> Dict[str, Any]:
        """Returns user details by ID."""
        user = self.user_repo.find_by_id(user_id)
        if not user:
            raise NotFoundError(message=f"User with ID {user_id} not found")
        return user.to_dict(exclude_password=True)

    def create_user(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Creates a new user."""
        clean_email = (data.get("email") or "").strip().lower()
        clean_password = (data.get("password") or "").strip()
        clean_first = (data.get("first_name") or "").strip()
        clean_last = (data.get("last_name") or "").strip()
        clean_role = (data.get("role") or "user").strip().lower()

        existing = self.user_repo.find_by_email(clean_email)
        if existing:
            raise ConflictError(message=f"User with email '{clean_email}' already exists")

        pw_hash = hash_password(clean_password)
        created = self.user_repo.create(
            email=clean_email,
            password_hash=pw_hash,
            first_name=clean_first or "Client",
            last_name=clean_last or "User",
            role=clean_role
        )
        return created.to_dict(exclude_password=True)

    def update_user(self, user_id: int, data: Dict[str, Any]) -> Dict[str, Any]:
        """Updates an existing user."""
        existing = self.user_repo.find_by_id(user_id)
        if not existing:
            raise NotFoundError(message=f"User with ID {user_id} not found")

        if "email" in data and data["email"]:
            clean_email = data["email"].strip().lower()
            data["email"] = clean_email
            if clean_email != existing.email.lower():
                email_conflict = self.user_repo.find_by_email(clean_email)
                if email_conflict:
                    raise ConflictError(message=f"Email '{clean_email}' is already taken")

        if "first_name" in data and isinstance(data["first_name"], str):
            data["first_name"] = data["first_name"].strip()
        if "last_name" in data and isinstance(data["last_name"], str):
            data["last_name"] = data["last_name"].strip()

        if "password" in data and data["password"]:
            clean_pw = data.pop("password").strip()
            data["password_hash"] = hash_password(clean_pw)

        updated = self.user_repo.update(user_id, data)
        return updated.to_dict(exclude_password=True) if updated else existing.to_dict(exclude_password=True)

    def delete_user(self, user_id: int) -> None:
        """Deletes a user by ID."""
        existing = self.user_repo.find_by_id(user_id)
        if not existing:
            raise NotFoundError(message=f"User with ID {user_id} not found")

        self.user_repo.delete(user_id)
