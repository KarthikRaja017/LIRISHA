"""
Authentication Routes.
"""
from flask import Blueprint, request, g
from app.schemas.auth import LoginSchema, RegisterSchema
from app.schemas.user import UserUpdateSchema
from app.services.auth_service import AuthService
from app.services.user_service import UserService
from app.utils.response import success_response, created_response
from app.middleware.auth_middleware import jwt_required
from app.errors.exceptions import AuthorizationError

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():
    """Authenticates user credentials and returns JWT token."""
    raw_json = request.get_json() or {}
    validated = LoginSchema(**raw_json)

    service = AuthService()
    result = service.authenticate_user(email=validated.email, password=validated.password)

    return success_response(data=result, message="Login successful")


@auth_bp.route("/register", methods=["POST"])
def register():
    """Public registration is disabled. Only administrators can create user accounts."""
    raise AuthorizationError("User registration is disabled. Only administrators can create accounts.")


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    """Retrieves current authenticated user profile."""
    user_id = int(g.current_user["sub"])
    service = UserService()
    user_data = service.get_user_by_id(user_id)

    return success_response(data=user_data, message="Profile retrieved successfully")


@auth_bp.route("/me", methods=["PUT", "PATCH"])
@jwt_required()
def update_current_user():
    """Updates current authenticated user profile and credentials."""
    user_id = int(g.current_user["sub"])
    raw_json = request.get_json() or {}
    validated = UserUpdateSchema(**raw_json)
    update_data = validated.model_dump(exclude_unset=True)

    # Protect role escalation
    if "role" in update_data and g.current_user.get("role") != "admin":
        del update_data["role"]

    service = UserService()
    updated = service.update_user(user_id, update_data)

    return success_response(data=updated, message="Credentials updated successfully")
