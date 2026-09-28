# Authentication System Overview

The boilerplate uses JWT (JSON Web Tokens) for authentication.

## Hashing & Storage

- Passwords are hashed using Werkzeug's secure Scrypt/PBKDF2 algorithm prior to insertion into PostgreSQL.
- Access tokens contain standard claims (`sub` = user ID, `exp` = expiration time, `email`, `role`).
- Tokens are sent as `Authorization: Bearer <token>` HTTP headers.
- Flask endpoints protect routes using the `@jwt_required()` decorator.
