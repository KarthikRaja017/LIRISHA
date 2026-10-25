"""
User Repository.
Handles all raw SQL database operations for users.
NO ORM - Uses strict parameterized SQL statements (%s).
"""
from typing import Any, Dict, List, Optional
from app.repositories.base_repository import BaseRepository
from app.models.user import User


class UserRepository(BaseRepository):
    """Repository handling SQL queries for the users table."""

    def find_all(self, offset: int = 0, limit: int = 20, search: Optional[str] = None) -> List[User]:
        """Fetches paginated users with optional search filter."""
        if search:
            query = """
                SELECT id, email, password_hash, first_name, last_name, role, is_active, created_at, updated_at
                FROM users
                WHERE email ILIKE %s OR first_name ILIKE %s OR last_name ILIKE %s
                ORDER BY id DESC
                OFFSET %s LIMIT %s
            """
            search_param = f"%{search.strip()}%"
            rows = self.fetch_all(query, (search_param, search_param, search_param, offset, limit))
        else:
            query = """
                SELECT id, email, password_hash, first_name, last_name, role, is_active, created_at, updated_at
                FROM users
                ORDER BY id DESC
                OFFSET %s LIMIT %s
            """
            rows = self.fetch_all(query, (offset, limit))

        return [User.from_row(row) for row in rows]

    def count_all(self, search: Optional[str] = None) -> int:
        """Counts total users matching filter criteria."""
        if search:
            query = """
                SELECT COUNT(*) as count
                FROM users
                WHERE email ILIKE %s OR first_name ILIKE %s OR last_name ILIKE %s
            """
            search_param = f"%{search.strip()}%"
            return self.count(query, (search_param, search_param, search_param))
        else:
            query = "SELECT COUNT(*) as count FROM users"
            return self.count(query)

    def find_by_id(self, user_id: int) -> Optional[User]:
        """Fetches a single user by primary key ID."""
        query = """
            SELECT id, email, password_hash, first_name, last_name, role, is_active, created_at, updated_at
            FROM users
            WHERE id = %s
        """
        row = self.fetch_one(query, (user_id,))
        return User.from_row(row) if row else None

    def find_by_email(self, email: str) -> Optional[User]:
        """Fetches a single user by email address (case-insensitive & trimmed)."""
        clean_email = (email or "").strip().lower()
        if not clean_email:
            return None
        query = """
            SELECT id, email, password_hash, first_name, last_name, role, is_active, created_at, updated_at
            FROM users
            WHERE LOWER(TRIM(email)) = %s
        """
        row = self.fetch_one(query, (clean_email,))
        return User.from_row(row) if row else None

    def create(
        self,
        email: str,
        password_hash: str,
        first_name: str,
        last_name: str,
        role: str = "user"
    ) -> User:
        """Inserts a new user record into PostgreSQL and returns the created User model."""
        clean_email = (email or "").strip().lower()
        clean_first = (first_name or "").strip()
        clean_last = (last_name or "").strip()
        clean_role = (role or "user").strip().lower()

        query = """
            INSERT INTO users (email, password_hash, first_name, last_name, role, is_active, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, true, NOW(), NOW())
            RETURNING id, email, password_hash, first_name, last_name, role, is_active, created_at, updated_at
        """
        row = self.execute_returning(
            query,
            (clean_email, password_hash, clean_first, clean_last, clean_role)
        )
        return User.from_row(row)

    def update(self, user_id: int, updates: Dict[str, Any]) -> Optional[User]:
        """Updates user fields dynamically using safe parameterized SQL."""
        if not updates:
            return self.find_by_id(user_id)

        set_clauses = []
        params = []

        for key, value in updates.items():
            if key in ("email", "first_name", "last_name", "role", "is_active", "password_hash"):
                set_clauses.append(f"{key} = %s")
                if key == "email" and isinstance(value, str):
                    params.append(value.strip().lower())
                elif key in ("first_name", "last_name") and isinstance(value, str):
                    params.append(value.strip())
                elif key == "role" and isinstance(value, str):
                    params.append(value.strip().lower())
                else:
                    params.append(value)

        if not set_clauses:
            return self.find_by_id(user_id)

        set_clauses.append("updated_at = NOW()")
        params.append(user_id)

        query = f"""
            UPDATE users
            SET {", ".join(set_clauses)}
            WHERE id = %s
            RETURNING id, email, password_hash, first_name, last_name, role, is_active, created_at, updated_at
        """
        row = self.execute_returning(query, tuple(params))
        return User.from_row(row) if row else None

    def delete(self, user_id: int) -> bool:
        """Deletes a user record by ID."""
        query = "DELETE FROM users WHERE id = %s"
        affected = self.execute(query, (user_id,))
        return affected > 0
