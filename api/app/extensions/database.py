"""
Database Extension.
Manages raw psycopg3 connection pooling to PostgreSQL.
Process-safe for Gunicorn multi-worker preforking architectures.
NO ORM - All database queries are executed via direct parameterized SQL.
"""
import logging
import os
import socket
from contextlib import contextmanager
from typing import Generator
from urllib.parse import urlparse

import psycopg
from flask import Flask, current_app
from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool

logger = logging.getLogger("app.database")

_pool: ConnectionPool | None = None
_pool_pid: int | None = None
_db_online: bool = False


def _is_server_reachable(conn_url: str, timeout: float = 4.0) -> bool:
    """Quick non-blocking check to see if database host:port is listening."""
    try:
        parsed = urlparse(conn_url)
        host = parsed.hostname or "localhost"
        port = parsed.port or 5432
        with socket.create_connection((host, port), timeout=timeout):
            return True
    except (socket.timeout, ConnectionRefusedError, OSError):
        return False


def _get_or_create_pool(app=None) -> ConnectionPool | None:
    """
    Returns or initializes the ConnectionPool for the current worker process PID.
    Prevents deadlocks in prefork WSGI servers like Gunicorn where child processes
    inherit invalid background threads from parent processes.
    """
    global _pool, _pool_pid, _db_online
    current_pid = os.getpid()

    # Reuse pool if already created in this process
    if _pool is not None and _pool_pid == current_pid and not _pool.closed:
        return _pool

    # If pool belongs to parent process or closed, clear it
    if _pool is not None:
        try:
            _pool.close()
        except Exception:
            pass
        _pool = None
        _pool_pid = None

    target_app = app
    if not target_app:
        try:
            target_app = current_app._get_current_object() if current_app else None
        except Exception:
            target_app = None

    if not target_app:
        return None

    db_url = target_app.config.get("DATABASE_URL", "")
    timeout = target_app.config.get("DB_TIMEOUT", 15)

    if not db_url:
        _db_online = False
        return None

    if "localhost" in db_url or "127.0.0.1" in db_url:
        if not _is_server_reachable(db_url, timeout=1.5):
            _db_online = False
            return None

    connect_kwargs = {
        "row_factory": dict_row,
        "prepare_threshold": None,  # Critical for PgBouncer / Supabase transaction poolers
    }

    try:
        new_pool = ConnectionPool(
            conninfo=db_url,
            min_size=1,
            max_size=target_app.config.get("DB_MAX_CONN", 5),
            timeout=timeout,
            kwargs=connect_kwargs,
            max_idle=45.0,
            open=True,
        )
        # Verify with active test ping
        with new_pool.connection(timeout=8.0) as test_conn:
            with test_conn.cursor() as cur:
                cur.execute("SELECT 1")

        _pool = new_pool
        _pool_pid = current_pid
        _db_online = True
        logger.info(f"PostgreSQL connection pool initialized and verified for PID {current_pid}.")
        return _pool
    except Exception as e:
        logger.warning(f"Failed initializing database pool in PID {current_pid}: {e}")
        _pool = None
        _pool_pid = None
        _db_online = False
        return None


def init_db(app: Flask) -> None:
    """Initializes the database connection pool for the main app."""
    _get_or_create_pool(app)


def close_db() -> None:
    """Closes the connection pool for the current process."""
    global _pool, _pool_pid, _db_online
    if _pool:
        try:
            _pool.close()
        except Exception:
            pass
        _pool = None
        _pool_pid = None
        _db_online = False
        logger.info("PostgreSQL connection pool closed.")


def get_pool() -> ConnectionPool | None:
    """Returns the process-specific connection pool."""
    return _get_or_create_pool()


def is_db_online() -> bool:
    """Returns True if the database pool is active and online in the current worker."""
    pool = _get_or_create_pool()
    return pool is not None and _db_online


@contextmanager
def get_db_connection() -> Generator[psycopg.Connection, None, None]:
    """
    Context manager yielding a PostgreSQL connection from the worker's pool.
    Handles commit on success and rollback on exception.
    """
    pool = _get_or_create_pool()
    if not pool or not _db_online:
        raise RuntimeError("PostgreSQL database is offline or unreachable.")

    try:
        with pool.connection(timeout=10.0) as conn:
            try:
                yield conn
                conn.commit()
            except Exception:
                conn.rollback()
                raise
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        raise


@contextmanager
def get_db_cursor(commit: bool = True) -> Generator[psycopg.Cursor, None, None]:
    """
    Convenience context manager yielding a dictionary cursor directly.
    """
    with get_db_connection() as conn:
        with conn.cursor(row_factory=dict_row) as cursor:
            yield cursor
