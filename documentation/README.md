# Project Documentation Index

Welcome to the comprehensive architecture, development, and operational documentation for the Next.js + Flask + PostgreSQL Full-Stack Boilerplate.

## Documentation Navigation

### 1. Architecture
- [Architecture Overview](architecture/overview.md) — High-level system architecture, design patterns, and request flows.
- [Frontend Architecture](architecture/frontend.md) — Next.js App Router design, feature modules, and component hierarchy.
- [Backend Architecture](architecture/backend.md) — Flask application factory, layered architecture (Route -> Service -> Repo).
- [Database Architecture](architecture/database.md) — Raw SQL paradigm, connection pooling with `psycopg3`, and isolation levels.

### 2. Database
- [Database Schema](database/schema.md) — Table schemas, foreign key relationships, and indexes.
- [Database Migrations](database/migrations.md) — Sequential SQL migration guide and tracking mechanics.
- [SQL Guidelines](database/sql-guidelines.md) — Rules for writing parameterized queries, transactions, and avoiding ORM pitfalls.

### 3. API & Protocols
- [API Overview](api/overview.md) — Endpoint index, routing structure (`/api/v1/`), and RESTful standards.
- [Authentication API](api/authentication.md) — Login, registration, JWT token headers, and security context.
- [Response Format](api/response-format.md) — Standard success/error JSON payloads and HTTP status codes.

### 4. Frontend Development
- [Frontend Structure](frontend/structure.md) — Detailed overview of `web/` folder structure.
- [UI Components](frontend/components.md) — Core UI components (`Button`, `Input`, `Modal`, `Table`, `Pagination`, etc.).
- [State Management](frontend/state-management.md) — React Context, custom hooks (`useAuth`, `useUsers`), and data fetching.

### 5. Authentication System
- [Authentication System Overview](authentication/overview.md) — End-to-end security architecture, password hashing, and token lifecycles.

### 6. Development & Operations
- [Local Setup Guide](development/setup.md) — Step-by-step setup for Windows, Linux, and macOS.
- [Coding Standards](development/coding-standards.md) — Linting, TypeScript strict mode, formatting, and file organization.
- [Troubleshooting](development/troubleshooting.md) — Common error resolution guide.
- [Deployment Guide](deployment/deployment.md) — Production deployment guidelines for web, API, and PostgreSQL without Docker.
