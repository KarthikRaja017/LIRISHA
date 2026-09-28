"""
Centralized Error Handlers.
Formats all application and framework errors into a standard JSON response structure.
Logs detailed stack traces internally without exposing sensitive details to clients.
"""
import logging
from flask import Flask, jsonify, current_app
from pydantic import ValidationError as PydanticValidationError
from werkzeug.exceptions import HTTPException

from app.errors.exceptions import AppException
from app.errors.codes import ErrorCode
from app.constants.status_codes import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_422_UNPROCESSABLE_ENTITY,
    HTTP_500_INTERNAL_SERVER_ERROR,
)

logger = logging.getLogger("app.errors")


def make_error_response(message: str, code: str, status_code: int, details: dict = None):
    """Helper to build standard error response structure."""
    payload = {
        "success": False,
        "message": message,
        "error": {
            "code": code,
            "details": details or {}
        }
    }
    return jsonify(payload), status_code


def register_error_handlers(app: Flask) -> None:
    """Registers error handlers with the Flask app instance."""

    @app.errorhandler(AppException)
    def handle_app_exception(error: AppException):
        logger.warning(f"AppException: {error.code} - {error.message} (Details: {error.details})")
        return make_error_response(
            message=error.message,
            code=error.code,
            status_code=error.status_code,
            details=error.details,
        )

    @app.errorhandler(PydanticValidationError)
    def handle_pydantic_validation_error(error: PydanticValidationError):
        details = {}
        for err in error.errors():
            loc = "->".join(str(loc_item) for loc_item in err.get("loc", []))
            details[loc] = err.get("msg")
        
        logger.info(f"Pydantic Validation Error: {details}")
        return make_error_response(
            message="Input validation failed",
            code=ErrorCode.VALIDATION_ERROR,
            status_code=HTTP_422_UNPROCESSABLE_ENTITY,
            details=details,
        )

    @app.errorhandler(HTTPException)
    def handle_http_exception(error: HTTPException):
        code = ErrorCode.BAD_REQUEST
        if error.code == 404:
            code = ErrorCode.NOT_FOUND
        elif error.code == 401:
            code = ErrorCode.AUTHENTICATION_ERROR
        elif error.code == 403:
            code = ErrorCode.AUTHORIZATION_ERROR
            
        return make_error_response(
            message=error.description or "HTTP Error",
            code=code,
            status_code=error.code or HTTP_400_BAD_REQUEST,
        )

    @app.errorhandler(Exception)
    def handle_generic_exception(error: Exception):
        logger.exception(f"Unhandled Internal Server Error: {error}")
        
        # Hide internal details in non-debug/production environments
        if current_app.config.get("DEBUG", False):
            details = {"exception": str(error), "type": type(error).__name__}
        else:
            details = {}

        return make_error_response(
            message="An internal server error occurred",
            code=ErrorCode.INTERNAL_SERVER_ERROR,
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            details=details,
        )
