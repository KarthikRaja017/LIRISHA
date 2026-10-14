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
  site_name: { value: "SmartPHOTOeditors" },
  site_tagline: { value: "Outsource Image Editing Services" },
  site_logo: { value: "/images/SPE-logo.svg" },
  site_footer_logo: { value: "/images/SPE-logo.svg" },
  site_favicon: { value: "/favicon.ico" },
  contact_phone: { value: "1-855-695-6028" },
  contact_email: { value: "info@smartphotoeditors.com" },
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
    const faviconUrl = getSettingValue("site_favicon");
    if (faviconUrl && typeof document !== "undefined") {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "shortcut icon";
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
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
