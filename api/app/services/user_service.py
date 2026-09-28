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
        existing = self.user_repo.find_by_email(data["email"])
        if existing:
            raise ConflictError(message=f"User with email '{data['email']}' already exists")

        pw_hash = hash_password(data["password"])
        created = self.user_repo.create(
            email=data["email"],
            password_hash=pw_hash,
            first_name=data["first_name"],
            last_name=data["last_name"],
            role=data.get("role", "user")
        )
        return created.to_dict(exclude_password=True)

    def update_user(self, user_id: int, data: Dict[str, Any]) -> Dict[str, Any]:
        """Updates an existing user."""
        existing = self.user_repo.find_by_id(user_id)
        if not existing:
            raise NotFoundError(message=f"User with ID {user_id} not found")

        if "email" in data and data["email"] != existing.email:
            email_conflict = self.user_repo.find_by_email(data["email"])
            if email_conflict:
                raise ConflictError(message=f"Email '{data['email']}' is already taken")

        updated = self.user_repo.update(user_id, data)
        return updated.to_dict(exclude_password=True) if updated else existing.to_dict(exclude_password=True)

    def delete_user(self, user_id: int) -> None:
        """Deletes a user by ID."""
        existing = self.user_repo.find_by_id(user_id)
        if not existing:
            raise NotFoundError(message=f"User with ID {user_id} not found")

        self.user_repo.delete(user_id)
