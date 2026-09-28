# Next.js Frontend (`web/`)

Production-ready frontend application built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Architecture

- **`app/`**: Next.js App Router routes (`layout.tsx`, `page.tsx`, `login/page.tsx`, `not-found.tsx`, `error.tsx`, `loading.tsx`).
- **`components/`**:
  - `ui/`: Reusable foundation components (`Button`, `Input`, `Select`, `Modal`, `Table`, `Loading`, `EmptyState`, `ErrorState`, `Pagination`).
  - `layout/`: App Shell layout elements (`Navbar`, `Header`, `Footer`, `Sidebar`).
- **`features/`**: Feature-oriented modular domain code (e.g., `users/`).
  - `components/`: UI components specific to the feature.
  - `hooks/`: Custom state management and data fetching hooks.
  - `services/`: API interaction methods using the central API client.
- **`hooks/`**: Global reusable React hooks (`useAuth`, `useDebounce`, etc.).
- **`lib/`**:
  - `api/`: Centralized HTTP client (`client.ts`), endpoints map (`endpoints.ts`), and error class (`errors.ts`).
  - `auth/`: Token storage utilities and auth methods.
- **`types/`**: Shared TypeScript interfaces for API, Auth, Pagination, and User entities.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Ensure `NEXT_PUBLIC_API_URL` points to your backend instance (default: `http://localhost:8000/api/v1`).

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for Production

```bash
npm run build
npm run start
```
