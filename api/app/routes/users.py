"""
User Management Routes (Sample Feature).
Demonstrates end-to-end CRUD using Route -> Service -> Repository -> Raw SQL.
"""
from flask import Blueprint, request, g
from app.schemas.user import UserCreateSchema, UserUpdateSchema
from app.schemas.pagination import PaginationQuerySchema
from app.services.user_service import UserService
from app.utils.response import success_response, created_response, no_content_response
from app.middleware.auth_middleware import jwt_required
from app.errors.exceptions import AuthorizationError

users_bp = Blueprint("users", __name__)


@users_bp.route("", methods=["GET"])
@users_bp.route("/", methods=["GET"])
@jwt_required(optional=True)
def list_users():
    """Lists users with pagination and optional search query."""
    page = int(request.args.get("page", 1))
    page_size = int(request.args.get("page_size", request.args.get("limit", 20)))
    search = request.args.get("search", None)

    # Validate pagination parameters
    PaginationQuerySchema(page=page, page_size=page_size)

    service = UserService()
    result = service.get_users(page=page, page_size=page_size, search=search)

    return success_response(data=result, message="Users retrieved successfully")


@users_bp.route("/<int:user_id>", methods=["GET"])
@jwt_required(optional=True)
def get_user(user_id: int):
    """Retrieves single user by ID."""
    service = UserService()
    user_data = service.get_user_by_id(user_id)

    return success_response(data=user_data, message="User retrieved successfully")


@users_bp.route("", methods=["POST"])
@users_bp.route("/", methods=["POST"])
@jwt_required()
def create_user():
    """Creates a new user. Only administrators can create users."""
    if not g.current_user or g.current_user.get("role") != "admin":
        raise AuthorizationError("Only administrators can create user accounts.")
    raw_json = request.get_json() or {}
    validated = UserCreateSchema(**raw_json)

    service = UserService()
    created = service.create_user(validated.model_dump())

    return created_response(data=created, message="User created successfully")


@users_bp.route("/<int:user_id>", methods=["PUT", "PATCH"])
@jwt_required()
def update_user(user_id: int):
    """Updates user information."""
    if not g.current_user or (g.current_user.get("role") != "admin" and int(g.current_user.get("sub", 0)) != user_id):
        raise AuthorizationError("You are not authorized to update this user account.")

    raw_json = request.get_json() or {}
    validated = UserUpdateSchema(**raw_json)

    # Filter out None values for partial update
    update_data = validated.model_dump(exclude_unset=True)

    service = UserService()
    updated = service.update_user(user_id, update_data)

    return success_response(data=updated, message="User updated successfully")


@users_bp.route("/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id: int):
    """Deletes user by ID."""
    if not g.current_user or g.current_user.get("role") != "admin":
        raise AuthorizationError("Only administrators can delete user accounts.")
    if int(g.current_user.get("sub", 0)) == user_id:
        raise AuthorizationError("You cannot delete your own active administrator account.")

    service = UserService()
    service.delete_user(user_id)

    return no_content_response()
