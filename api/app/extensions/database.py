"""
Database Connection & Connection Pool Extension.
Uses psycopg3 (psycopg & psycopg_pool) for high-performance PostgreSQL interaction.
Provides context managers for parameterised raw SQL execution and transaction control.
NO ORM IS USED.
"""
import logging
from contextlib import contextmanager
from typing import Generator, Any
from flask import Flask, g, current_app

import psycopg
from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool

logger = logging.getLogger("app.database")

_pool: ConnectionPool | None = None


def init_db(app: Flask) -> None:
    """Initializes the PostgreSQL connection pool."""
    global _pool
    db_url = app.config.get("DATABASE_URL")
    min_conn = app.config.get("DB_MIN_CONN", 2)
    max_conn = app.config.get("DB_MAX_CONN", 10)
    timeout = app.config.get("DB_TIMEOUT", 30)

    try:
        # Create connection pool with pre-ping check to prevent idle connection loss
        _pool = ConnectionPool(
            conninfo=db_url,
            min_size=min_conn,
            max_size=max_conn,
            timeout=timeout,
            kwargs={"row_factory": dict_row},
            check=ConnectionPool.check_connection,
            max_idle=45.0,
            open=True
        )
        logger.info("PostgreSQL connection pool configured and opened successfully.")
    except Exception as e:
        logger.error(f"Failed to initialize PostgreSQL connection pool: {e}")
        _pool = None



def close_db() -> None:
    """Closes the connection pool."""
    global _pool
    if _pool:
        _pool.close()
        _pool = None
        logger.info("PostgreSQL connection pool closed.")


def get_pool() -> ConnectionPool | None:
    """Returns the global connection pool."""
    global _pool
    return _pool


@contextmanager
def get_db_connection() -> Generator[psycopg.Connection, None, None]:
    """
    Context manager yielding a PostgreSQL connection from the pool.
    Handles commit on success and rollback on exception.
    """
    global _pool
    if not _pool:
        # Lazy open pool if created with open=False
        if _pool is not None:
            _pool.open()
        else:
            raise RuntimeError("Database connection pool is not initialized.")

    with _pool.connection() as conn:
        try:
            yield conn
            conn.commit()
        except Exception:
            conn.rollback()
            raise


@contextmanager
def get_db_cursor(commit: bool = True) -> Generator[psycopg.Cursor, None, None]:
    """
    Context manager yielding a dictionary cursor for executing raw parameterized SQL queries.
    
    Usage:
        with get_db_cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
            user = cursor.fetchone()
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            yield cursor
