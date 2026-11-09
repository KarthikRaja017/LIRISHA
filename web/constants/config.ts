const resolveApiUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;

  // In the browser, check if we are running on a remote deployment (e.g. Vercel)
  if (typeof window !== "undefined") {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    // If running on a remote host (Vercel, custom domain, etc.):
    // Never attempt to call localhost! Always use the production Render API.
    if (!isLocal) {
      if (!envUrl || envUrl.includes("localhost") || envUrl.includes("127.0.0.1")) {
        return "https://lirisha-api.onrender.com/api/v1";
      }
      return envUrl;
    }
  }

  // Server-side or local environment fallback
  return envUrl || "https://lirisha-api.onrender.com/api/v1";
};

export const APP_CONFIG = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || "Lirisha",
  get apiUrl(): string {
    return resolveApiUrl();
  },
  tokenStorageKey: "auth_access_token",
  defaultPageSize: 20,
  requestTimeoutMs: 30000,
} as const;
