# Authentication API

Protected endpoints require a valid HTTP Bearer token in the request header:

```text
Authorization: Bearer <your-jwt-token>
```

## Obtaining a Token

Send a `POST` request to `/api/v1/auth/login`:

```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1Ni...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "user": {
      "id": 1,
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "role": "user"
    }
  }
}
```
