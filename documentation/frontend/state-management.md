# Frontend State Management

## Auth Context (`useAuth`)

Global authentication state is provided via React Context in `web/hooks/useAuth.tsx`.
- Automatically restores user session on app load using token in `localStorage`.
- Exposes `login()`, `register()`, `logout()`, `user`, `token`, and `isAuthenticated`.

## Feature Hooks (`useUsers`)

Feature-level state (list data, pagination, search filter, modal controls) is encapsulated in custom hooks inside feature directories (`web/features/users/hooks/useUsers.ts`).
