"""
Base Repository.
Provides core database execution wrappers for executing parameterized raw SQL queries safely.
NO ORM - Parameterized SQL queries only (%s syntax).
"""
import logging
from typing import Any, List, Optional, Tuple, Dict
from app.extensions.database import get_db_cursor
from app.errors.exceptions import DatabaseError

logger = logging.getLogger("app.repository")


class BaseRepository:
    """
    Abstract base repository encapsulating direct SQL execution with parameter binding.
    """

    def fetch_one(self, query: str, params: Tuple[Any, ...] = ()) -> Optional[Dict[str, Any]]:
        """Executes parameterized query and returns a single row dictionary."""
        try:
            with get_db_cursor() as cursor:
                cursor.execute(query, params)
                row = cursor.fetchone()
                return dict(row) if row else None
        except Exception as e:
            logger.error(f"SQL execute fetch_one failed: {e} | Query: {query} | Params: {params}")
            raise DatabaseError(message=f"Database fetch failed: {str(e)}")

    def fetch_all(self, query: str, params: Tuple[Any, ...] = ()) -> List[Dict[str, Any]]:
        """Executes parameterized query and returns all matching rows as dictionaries."""
        try:
            with get_db_cursor() as cursor:
                cursor.execute(query, params)
                rows = cursor.fetchall()
                return [dict(row) for row in rows]
        except Exception as e:
            logger.error(f"SQL execute fetch_all failed: {e} | Query: {query} | Params: {params}")
            raise DatabaseError(message=f"Database query failed: {str(e)}")

    def execute(self, query: str, params: Tuple[Any, ...] = ()) -> int:
        """Executes parameterized INSERT/UPDATE/DELETE query and returns affected row count."""
        try:
            with get_db_cursor() as cursor:
                cursor.execute(query, params)
                return cursor.rowcount
        except Exception as e:
            logger.error(f"SQL execute statement failed: {e} | Query: {query} | Params: {params}")
            raise DatabaseError(message=f"Database execution failed: {str(e)}")

    def execute_returning(self, query: str, params: Tuple[Any, ...] = ()) -> Optional[Dict[str, Any]]:
        """Executes parameterized query with RETURNING clause and returns inserted/updated row."""
        try:
            with get_db_cursor() as cursor:
                cursor.execute(query, params)
                row = cursor.fetchone()
                return dict(row) if row else None
        except Exception as e:
            logger.error(f"SQL execute_returning failed: {e} | Query: {query} | Params: {params}")
            raise DatabaseError(message=f"Database write failed: {str(e)}")

    def count(self, query: str, params: Tuple[Any, ...] = ()) -> int:
        """Executes a COUNT(*) query and returns the total integer count."""
        try:
            with get_db_cursor() as cursor:
                cursor.execute(query, params)
                row = cursor.fetchone()
                if row:
                    # Dict row with count or first column
                    return list(row.values())[0]
                return 0
        except Exception as e:
            logger.error(f"SQL count query failed: {e} | Query: {query} | Params: {params}")
            raise DatabaseError(message=f"Database count query failed: {str(e)}")
