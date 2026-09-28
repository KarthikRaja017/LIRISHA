"""
Custom Application Exceptions.
"""
from typing import Any, Dict, Optional
from app.constants.status_codes import (
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
    HTTP_409_CONFLICT,
    HTTP_422_UNPROCESSABLE_ENTITY,
    HTTP_500_INTERNAL_SERVER_ERROR,
)
from app.errors.codes import ErrorCode


class AppException(Exception):
    """Base Application Exception."""

    def __init__(
        self,
        message: str = "An unexpected error occurred",
        code: str = ErrorCode.INTERNAL_SERVER_ERROR,
        status_code: int = HTTP_500_INTERNAL_SERVER_ERROR,
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message)
        self.message = message
        self.code = code
        self.status_code = status_code
        self.details = details or {}


class BadRequestError(AppException):
    def __init__(self, message: str = "Bad request", details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=message,
            code=ErrorCode.BAD_REQUEST,
            status_code=HTTP_400_BAD_REQUEST,
            details=details,
        )


class ValidationError(AppException):
    def __init__(self, message: str = "Validation error", details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=message,
            code=ErrorCode.VALIDATION_ERROR,
            status_code=HTTP_422_UNPROCESSABLE_ENTITY,
            details=details,
        )


class AuthenticationError(AppException):
    def __init__(self, message: str = "Authentication failed", code: str = ErrorCode.AUTHENTICATION_ERROR, details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=message,
            code=code,
            status_code=HTTP_401_UNAUTHORIZED,
            details=details,
        )


class AuthorizationError(AppException):
    def __init__(self, message: str = "Forbidden", details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=message,
            code=ErrorCode.AUTHORIZATION_ERROR,
            status_code=HTTP_403_FORBIDDEN,
            details=details,
        )


class NotFoundError(AppException):
    def __init__(self, message: str = "Resource not found", details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=message,
            code=ErrorCode.NOT_FOUND,
            status_code=HTTP_404_NOT_FOUND,
            details=details,
        )


class ConflictError(AppException):
    def __init__(self, message: str = "Resource conflict", details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=message,
            code=ErrorCode.CONFLICT,
            status_code=HTTP_409_CONFLICT,
            details=details,
        )


class DatabaseError(AppException):
    def __init__(self, message: str = "Database operation failed", details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=message,
            code=ErrorCode.DATABASE_ERROR,
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            details=details,
        )
