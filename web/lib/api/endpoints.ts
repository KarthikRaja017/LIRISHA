export const ENDPOINTS = {
  HEALTH: "/health",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },
  USERS: {
    BASE: "/users",
    BY_ID: (id: number) => `/users/${id}`,
  },
} as const;
