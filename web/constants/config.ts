export const APP_CONFIG = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || "Application Boilerplate",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  tokenStorageKey: "auth_access_token",
  defaultPageSize: 20,
  requestTimeoutMs: 5000,
} as const;

