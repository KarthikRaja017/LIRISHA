"""
Health Check Routes.
"""
from flask import Blueprint
from app.utils.response import success_response
from app.extensions.database import get_db_cursor

health_bp = Blueprint("health", __name__)


@health_bp.route("", methods=["GET"])
@health_bp.route("/", methods=["GET"])
def health_check():
    """
    Health check endpoint returning system status and database connectivity.
    """
    db_status = "healthy"
    try:
        with get_db_cursor(commit=False) as cursor:
            cursor.execute("SELECT 1")
    except Exception:
        db_status = "unhealthy"

    return success_response(
        data={
            "status": "online",
            "database": db_status,
            "version": "1.0.0"
        },
        message="System operational"
    )
