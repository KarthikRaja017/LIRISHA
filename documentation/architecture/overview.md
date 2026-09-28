# Architecture Overview

This project template establishes a clean, modern, decouple full-stack architecture for enterprise web applications.

## High-Level Architecture Diagram

```text
┌─────────────────────────────────────────────────────────────┐
│                       Next.js Client                        │
│                           (web/)                            │
│                                                             │
│  React App Router Pages → Feature Modules → Feature Services│
│                                    ↓                        │
│                           Centralized API Client            │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / REST (JSON)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                        Flask Backend                        │
│                           (api/)                            │
│                                                             │
│             Flask Routes (Blueprints: /api/v1/)             │
│                               ↓                             │
│                       Application Services                  │
│                               ↓                             │
│                      Data Repositories                      │
└──────────────────────────────┬──────────────────────────────┘
                               │ Parameterized SQL (%s)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     PostgreSQL Database                     │
└─────────────────────────────────────────────────────────────┘
```

## Key Architectural Principles

1. **Strict Separation of Concerns**
   - Frontend and backend are completely decoupled.
   - Routing, business logic, and database access are strictly separated across distinct layers.
2. **Zero ORM Overhead**
   - Direct parameterized SQL via `psycopg3` for maximum performance, predictability, and complete control over database queries.
3. **Modular Feature Organization**
   - Frontend features are encapsulated inside self-contained folders in `web/features/`.
   - Backend routes, services, and repositories follow consistent modular patterns.
4. **Environment Externalization**
   - All secrets, API targets, and connection strings are managed via `.env` files.
5. **Standardized Communication**
   - All API endpoints return a unified JSON payload format for success and failure responses.
