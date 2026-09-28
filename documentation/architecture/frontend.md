# Frontend Architecture

The frontend application (`web/`) is built using Next.js App Router and TypeScript.

## Feature-Driven Structure

Instead of placing all business logic inside page routes, code is organized by feature domain:

```text
web/features/
└── users/
    ├── components/    # UserTable, UserFormModal
    ├── hooks/         # useUsers
    ├── services/      # userService (API calls)
    ├── types/         # Feature specific TypeScript types
    └── utils/         # Feature specific formatters/helpers
```

## Data Flow Diagram

```text
User Component (e.g., UserTable)
      ↓ Calls
Custom Hook (e.g., useUsers)
      ↓ Calls
Feature Service (e.g., userService)
      ↓ Invokes
Central API Client (apiClient)
      ↓ HTTP Request
Flask Backend API
```

## Core Infrastructure

- **API Client (`web/lib/api/client.ts`)**: Handles request timeouts, automatic Authorization header attachment, JSON serialization, and error wrapping.
- **Auth Context (`web/hooks/useAuth.tsx`)**: Manages authentication state, user profile caching, token persistence, and sign in/out workflows.
- **UI Components (`web/components/ui/`)**: Pure, reusable, headless/styled building blocks (`Button`, `Input`, `Modal`, `Table`, `Select`, `Pagination`).
