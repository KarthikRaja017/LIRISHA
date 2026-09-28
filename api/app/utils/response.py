"""
Response Formatter Utility.
Generates standardized API JSON responses.
"""
from typing import Any, Optional, Tuple
from flask import jsonify, Response
from app.constants.status_codes import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT


def success_response(
    data: Any = None,
    message: str = "Request successful",
    status_code: int = HTTP_200_OK
) -> Tuple[Response, int]:
    """
    Builds a standard success response tuple.
    
    Structure:
    {
        "success": true,
        "message": "...",
        "data": { ... }
    }
    """
    payload = {
        "success": True,
        "message": message,
        "data": data if data is not None else {}
    }
    return jsonify(payload), status_code


def created_response(
    data: Any = None,
    message: str = "Resource created successfully"
) -> Tuple[Response, int]:
    """Shortcut for 201 Created responses."""
    return success_response(data=data, message=message, status_code=HTTP_201_CREATED)


def no_content_response() -> Tuple[str, int]:
    """Shortcut for 204 No Content responses."""
    return "", HTTP_204_NO_CONTENT
