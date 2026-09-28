"""
Authentication Middleware Decorator.
Protects endpoints requiring valid Bearer JWT tokens.
"""
from functools import wraps
from flask import request, g, current_app
from app.utils.security import decode_access_token
from app.errors.exceptions import AuthenticationError
from app.errors.codes import ErrorCode


def jwt_required(optional: bool = False):
    """
    Decorator requiring valid Authorization Bearer token header.
    Stores current token payload in flask.g.current_user.
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            auth_header = request.headers.get("Authorization")
            
            if not auth_header:
                if optional:
                    g.current_user = None
                    return f(*args, **kwargs)
                raise AuthenticationError(
                    message="Missing Authorization header",
                    code=ErrorCode.AUTHENTICATION_ERROR
                )

            parts = auth_header.split()
            if len(parts) != 2 or parts[0].lower() != "bearer":
                raise AuthenticationError(
                    message="Invalid Authorization header format. Expected 'Bearer <token>'",
                    code=ErrorCode.INVALID_TOKEN
                )

            token = parts[1]
            secret_key = current_app.config.get("JWT_SECRET_KEY")
            algorithm = current_app.config.get("JWT_ALGORITHM", "HS256")

            payload = decode_access_token(token, secret_key=secret_key, algorithm=algorithm)
            g.current_user = payload

            return f(*args, **kwargs)

        return decorated_function
    return decorator
