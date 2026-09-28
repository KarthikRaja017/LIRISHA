import { APP_CONFIG } from "@/constants/config";

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(APP_CONFIG.tokenStorageKey);
};

export const setToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(APP_CONFIG.tokenStorageKey, token);
};

export const removeToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(APP_CONFIG.tokenStorageKey);
};
