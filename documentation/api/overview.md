# API Overview

All backend endpoints are prefixed with `/api/v1`.

## Core Endpoints

- `GET /api/v1/health` — System health check & DB connectivity status
- `POST /api/v1/auth/login` — User login & JWT issuance
- `POST /api/v1/auth/register` — User registration & JWT issuance
- `GET /api/v1/auth/me` — Authenticated user profile lookup
- `GET /api/v1/users` — Paginated list of users (`?page=1&page_size=20&search=query`)
- `GET /api/v1/users/<id>` — Get single user by ID
- `POST /api/v1/users` — Create user
- `PUT /api/v1/users/<id>` — Update user
- `DELETE /api/v1/users/<id>` — Delete user
