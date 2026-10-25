"""
Database Connection & Connection Pool Extension.
Uses psycopg3 (psycopg & psycopg_pool) for PostgreSQL interaction.
Provides context managers for parameterised raw SQL execution and transaction control.
Gracefully detects when PostgreSQL is offline to prevent connection pool spam and timeouts.
NO ORM IS USED.
"""
import logging
import socket
from contextlib import contextmanager
from typing import Generator
from urllib.parse import urlparse
from flask import Flask, current_app

import psycopg
from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool

logger = logging.getLogger("app.database")

# Silence noisy psycopg background connection retry logs
logging.getLogger("psycopg").setLevel(logging.ERROR)
logging.getLogger("psycopg.pool").setLevel(logging.ERROR)

_pool: ConnectionPool | None = None
_db_online: bool = False


def _is_server_reachable(conn_url: str, timeout: float = 4.0) -> bool:
    """Quick non-blocking check to see if the database host:port is listening."""
    try:
        parsed = urlparse(conn_url)
        host = parsed.hostname or "localhost"
        port = parsed.port or 5432
        with socket.create_connection((host, port), timeout=timeout):
            return True
    except (socket.timeout, ConnectionRefusedError, OSError):
        return False


def init_db(app: Flask) -> None:
    """Initializes the PostgreSQL connection pool."""
    global _pool, _db_online
    db_url = app.config.get("DATABASE_URL", "")
    timeout = app.config.get("DB_TIMEOUT", 15)

    # Check if PostgreSQL server is listening
    if not _is_server_reachable(db_url, timeout=4.0):
        logger.info("PostgreSQL server is unreachable. App will run in standalone mode without database.")
        _pool = None
        _db_online = False
        return

    try:
        _pool = ConnectionPool(
            conninfo=db_url,
            min_size=0,
            max_size=app.config.get("DB_MAX_CONN", 10),
            timeout=timeout,
            kwargs={"row_factory": dict_row},
            max_idle=45.0,
            open=True,
        )
        _db_online = True
        logger.info("PostgreSQL connection pool configured and opened successfully.")
    except Exception as e:
        logger.warning(f"Could not initialize PostgreSQL pool: {e}")
        _pool = None
        _db_online = False


def close_db() -> None:
    """Closes the connection pool."""
    global _pool, _db_online
    if _pool:
        try:
            _pool.close()
        except Exception:
            pass
        _pool = None
        _db_online = False
        logger.info("PostgreSQL connection pool closed.")


def get_pool() -> ConnectionPool | None:
    """Returns the global connection pool."""
    return _pool


def is_db_online() -> bool:
    """Returns True if the database pool is active and online."""
    return _db_online and _pool is not None


@contextmanager
def get_db_connection() -> Generator[psycopg.Connection, None, None]:
    """
    Context manager yielding a PostgreSQL connection from the pool.
    Handles commit on success and rollback on exception.
    """
    global _pool, _db_online
    if not _pool or not _db_online:
        raise RuntimeError("PostgreSQL database is offline or unreachable.")

    if _pool.closed:
        try:
            _pool.open(wait=True, timeout=10.0)
        except Exception as e:
            raise RuntimeError(f"Database pool could not be opened: {e}")

    try:
        with _pool.connection(timeout=10.0) as conn:
            try:
                yield conn
                conn.commit()
            except Exception:
                conn.rollback()
                raise
    except Exception as e:
        logger.debug(f"Database connection error: {e}")
        raise


@contextmanager
def get_db_cursor(commit: bool = True) -> Generator[psycopg.Cursor, None, None]:
    """
    Context manager yielding a dictionary cursor for executing raw parameterized SQL queries.
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            yield cursor
