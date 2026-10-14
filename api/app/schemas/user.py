"""
User Feature Schemas.
Used for input validation and serialization.
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class UserCreateSchema(BaseModel):
    """Schema for creating a user."""
    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., min_length=8, description="User password (min 8 chars)")
    first_name: str = Field(..., min_length=1, max_length=50, description="First name")
    last_name: str = Field(..., min_length=1, max_length=50, description="Last name")
    role: str = Field("user", description="User role (e.g., user, admin)")


class UserUpdateSchema(BaseModel):
    """Schema for updating a user."""
    email: Optional[EmailStr] = Field(None, description="User email address")
    password: Optional[str] = Field(None, min_length=6, description="New password")
    first_name: Optional[str] = Field(None, min_length=1, max_length=50, description="First name")
    last_name: Optional[str] = Field(None, min_length=1, max_length=50, description="Last name")
    role: Optional[str] = Field(None, description="User role")
    is_active: Optional[bool] = Field(None, description="Account status")


class UserResponseSchema(BaseModel):
    """Schema for returning user data (never exposes password_hash)."""
    id: int
    email: str
    first_name: str
    last_name: str
    role: str
    is_active: bool
    created_at: str | datetime
    updated_at: str | datetime

    model_config = ConfigDict(from_attributes=True)
