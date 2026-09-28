# Frontend Directory Structure

```text
web/
├── app/                  # Next.js App Router pages & layouts
│   ├── layout.tsx        # Global app layout & providers wrapper
│   ├── page.tsx          # Home page (Users feature view)
│   ├── globals.css       # Global styles & Tailwind imports
│   ├── login/page.tsx    # Sign in page
│   ├── not-found.tsx     # 404 page
│   ├── loading.tsx       # Loading fallback
│   └── error.tsx         # Error fallback
│
├── components/           # Generic shared UI & layout components
│   ├── ui/               # Button, Input, Modal, Select, Table, Pagination...
│   ├── layout/           # Navbar, Header, Footer, Sidebar
│   ├── forms/            # Form wrappers
│   └── common/           # Shared card, badge, alert UI
│
├── features/             # Self-contained feature modules
│   └── users/            # Example Users feature module
│
├── hooks/                # Global React custom hooks (useAuth, useDebounce)
├── lib/                  # Infrastructure libraries (api client, auth helpers)
├── services/             # Base services
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── constants/            # Routes & configuration constants
```
