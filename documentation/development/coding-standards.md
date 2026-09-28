# Coding Standards & Guidelines

## General Principles

- **No ORM**: Never add ORM dependencies. Write clean, parameterized SQL.
- **Strict TypeScript**: Never use `any` type unless absolutely unavoidable.
- **Python Type Hints**: Add explicit type hints to function arguments and return types.

## Frontend Standards

- Run `npm run type-check` before committing.
- Feature logic goes into `web/features/<feature-name>/`.
- Do not make raw `fetch()` calls in components. Use `apiClient`.

## Backend Standards

- Run `pytest` to verify test suite.
- Routes must not contain business logic or SQL queries.
- Repositories must not contain business logic or HTTP logic.
