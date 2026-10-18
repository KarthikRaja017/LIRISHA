"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getSettings } from "@/lib/api/content";
import { SiteSettingsMap } from "@/types/content";

interface SettingsContextType {
  settings: SiteSettingsMap;
  loading: boolean;
  getSettingValue: (key: string, fallback?: string) => string;
  refreshSettings: () => Promise<void>;
}

const defaultSettings: SiteSettingsMap = {
  site_name: { value: "LIRISHA" },
  site_tagline: { value: "Outsource Image Editing Services" },
  site_logo: { value: "/images/lirisha-camera-logo.png" },
  site_footer_logo: { value: "/images/lirisha-camera-logo.png" },
  site_favicon: { value: "/favicon.png" },
  contact_phone: { value: "1-855-695-6028" },
  contact_email: { value: "info@lirisha.com" },
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  loading: true,
  getSettingValue: (key, fallback = "") => defaultSettings[key]?.value || fallback,
  refreshSettings: async () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettingsMap>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const data = await getSettings();
      if (data && Object.keys(data).length > 0) {
        setSettings((prev) => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.warn("Could not load dynamic settings, using defaults", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const getSettingValue = (key: string, fallback: string = ""): string => {
    return settings[key]?.value || defaultSettings[key]?.value || fallback;
  };

  // Dynamically update document favicon if dynamic favicon is present
  useEffect(() => {
    const faviconUrl = getSettingValue("site_favicon") || "/favicon.png";
    if (typeof document !== "undefined") {
      const links = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
      if (links.length > 0) {
        links.forEach((l) => {
          l.href = faviconUrl;
        });
      } else {
        const link = document.createElement("link");
        link.rel = "shortcut icon";
        link.href = faviconUrl;
        document.head.appendChild(link);
      }
    }
  }, [settings]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        getSettingValue,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
