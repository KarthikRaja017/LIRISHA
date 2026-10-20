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
  SERVICES: {
    BASE: "/services",
    BY_SLUG: (slug: string) => `/services/${slug}`,
  },
  RESOURCES: {
    BASE: "/resources",
    TESTIMONIALS: "/resources/testimonials",
    BY_SLUG: (slug: string) => `/resources/${slug}`,
  },
  GALLERY: {
    BASE: "/gallery",
    BY_ID: (id: string) => `/gallery/${id}`,
  },
  PAGES: {
    BASE: "/pages",
    BY_SLUG: (slug: string) => `/pages/${slug}`,
  },
  SETTINGS: {
    BASE: "/settings",
    BY_KEY: (key: string) => `/settings/${key}`,
  },
  DROPBOX: {
    BROWSE: "/dropbox/browse",
    FOLDERS: "/dropbox/folders",
    SUBFOLDERS: "/dropbox/subfolders",
    LINK: "/dropbox/link",
    UPLOAD: "/dropbox/upload",
    CREATE_FOLDER: "/dropbox/folders/create",
    DELETE_ITEM: "/dropbox/items",
    INVALIDATE_CACHE: "/dropbox/cache/invalidate",
    INVALIDATE_ALL_CACHE: "/dropbox/cache/invalidate-all",
    CACHE_STATUS: "/dropbox/cache/status",
  },
} as const;
