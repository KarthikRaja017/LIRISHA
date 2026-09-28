"""
Authentication Schemas.
"""
from pydantic import BaseModel, EmailStr, Field


class LoginSchema(BaseModel):
    """Schema for login request payload."""
    email: EmailStr = Field(..., description="User's email address")
    password: str = Field(..., min_length=6, description="User's password")


class RegisterSchema(BaseModel):
    """Schema for user registration request payload."""
    email: EmailStr = Field(..., description="User's email address")
    password: str = Field(..., min_length=8, description="User's password (min 8 characters)")
    first_name: str = Field(..., min_length=1, max_length=50, description="First name")
    last_name: str = Field(..., min_length=1, max_length=50, description="Last name")


class TokenResponseSchema(BaseModel):
    """Schema for token response payload."""
    access_token: str
    token_type: str = "Bearer"
    expires_in: int
