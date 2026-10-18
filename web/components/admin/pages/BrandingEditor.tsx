"use client";

import React, { useState, useEffect } from "react";
import { SiteSettingsMap } from "@/types/content";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";

interface BrandingEditorProps {
  siteSettings: SiteSettingsMap;
  onSaveSettings: (settingsPayload: Record<string, string>) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const BrandingEditor: React.FC<BrandingEditorProps> = ({
  siteSettings,
  onSaveSettings,
  showToast,
}) => {
  const [saving, setSaving] = useState(false);
  const [localSettings, setLocalSettings] = useState<SiteSettingsMap>({ ...siteSettings });

  useEffect(() => {
    setLocalSettings({ ...siteSettings });
  }, [siteSettings]);

  const getValue = (key: string, fallback = "") => {
    return localSettings[key]?.value !== undefined ? localSettings[key].value : fallback;
  };

  const setValue = (key: string, val: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: {
        value: val,
        metadata: prev[key]?.metadata || {},
      },
    }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload: Record<string, string> = {};
      Object.entries(localSettings).forEach(([k, v]) => {
        payload[k] = v.value;
      });
      await onSaveSettings(payload);
      showToast("Branding & logos updated successfully in PostgreSQL!");
    } catch (err: any) {
      showToast(err.message || "Failed to save branding settings", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-900 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-gear"></i>
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">Website Branding & Global Logos</h2>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Control the navbar logo, dark footer logo, browser favicon, and site-wide contact credentials.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
          <span>{saving ? "Saving..." : "Save Branding"}</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 text-xs">
        {/* Logos & Icons */}
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-200 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xs">1</span>
            Visual Identity & Logos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Header Logo */}
            <div className="p-4 border-2 border-slate-200 rounded-2xl bg-slate-50/70 space-y-3 shadow-sm hover:border-slate-300 transition-all">
              <label className="block font-bold text-slate-900 text-xs flex items-center gap-2">
                <i className="fa-solid fa-sun text-[#ff5b0a]"></i> Header Logo (Navbar)
              </label>
              <div className="h-24 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center p-3 overflow-hidden shadow-inner">
                {getValue("site_logo") ? (
                  <img
                    src={getValue("site_logo")}
                    alt="Header logo preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-400 font-medium">No logo set</span>
                )}
              </div>
              <input
                type="text"
                value={getValue("site_logo")}
                onChange={(e) => setValue("site_logo", e.target.value)}
                className="w-full px-3 py-2 border-2 border-slate-300 rounded-xl text-xs font-bold text-slate-900 bg-white focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 transition-all"
                placeholder="Image URL or upload below"
              />
              <ImageUploadButton
                folder="logos"
                label="Upload Header Logo"
                currentValue={getValue("site_logo")}
                onUploadSuccess={(url) => {
                  setValue("site_logo", url);
                  showToast("Header logo uploaded!");
                }}
              />
            </div>

            {/* Footer Logo */}
            <div className="p-4 border-2 border-slate-200 rounded-2xl bg-slate-50/70 space-y-3 shadow-sm hover:border-slate-300 transition-all">
              <label className="block font-bold text-slate-900 text-xs flex items-center gap-2">
                <i className="fa-solid fa-moon text-indigo-500"></i> Footer Logo (Dark Theme)
              </label>
              <div className="h-24 bg-slate-950 border-2 border-slate-800 rounded-xl flex items-center justify-center p-3 overflow-hidden shadow-inner">
                {getValue("site_footer_logo") ? (
                  <img
                    src={getValue("site_footer_logo")}
                    alt="Footer logo preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-500 font-medium">No dark logo set</span>
                )}
              </div>
              <input
                type="text"
                value={getValue("site_footer_logo")}
                onChange={(e) => setValue("site_footer_logo", e.target.value)}
                className="w-full px-3 py-2 border-2 border-slate-300 rounded-xl text-xs font-bold text-slate-900 bg-white focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 transition-all"
                placeholder="Dark logo URL or upload below"
              />
              <ImageUploadButton
                folder="logos"
                label="Upload Footer Logo"
                currentValue={getValue("site_footer_logo")}
                onUploadSuccess={(url) => {
                  setValue("site_footer_logo", url);
                  showToast("Footer logo uploaded!");
                }}
              />
            </div>

            {/* Favicon */}
            <div className="p-4 border-2 border-slate-200 rounded-2xl bg-slate-50/70 space-y-3 shadow-sm hover:border-slate-300 transition-all">
              <label className="block font-bold text-slate-900 text-xs flex items-center gap-2">
                <i className="fa-solid fa-window-maximize text-emerald-600"></i> Browser Favicon (.ico / .webp)
              </label>
              <div className="h-24 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center p-3 overflow-hidden shadow-inner">
                {getValue("site_favicon") ? (
                  <img
                    src={getValue("site_favicon")}
                    alt="Favicon preview"
                    className="w-12 h-12 object-contain shadow-sm"
                  />
                ) : (
                  <span className="text-xs text-slate-400 font-medium">No icon set</span>
                )}
              </div>
              <input
                type="text"
                value={getValue("site_favicon")}
                onChange={(e) => setValue("site_favicon", e.target.value)}
                className="w-full px-3 py-2 border-2 border-slate-300 rounded-xl text-xs font-bold text-slate-900 bg-white focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 transition-all"
                placeholder="Favicon URL or upload below"
              />
              <ImageUploadButton
                folder="logos"
                label="Upload Favicon"
                currentValue={getValue("site_favicon")}
                onUploadSuccess={(url) => {
                  setValue("site_favicon", url);
                  showToast("Favicon uploaded!");
                }}
              />
            </div>
          </div>
        </div>

        {/* Global Details */}
        <div className="border-t border-slate-200 pt-6 space-y-5">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xs">2</span>
            Global Contact & Footer Copy
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
                <i className="fa-solid fa-phone text-[#ff5b0a]"></i> Header Toll-Free Phone
              </label>
              <input
                type="text"
                value={getValue("contact_phone", "18557291549")}
                onChange={(e) => setValue("contact_phone", e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-bold text-slate-900 text-sm focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 shadow-sm transition-all"
                placeholder="e.g. 18557291549"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
                <i className="fa-solid fa-envelope text-[#ff5b0a]"></i> Header Support Email
              </label>
              <input
                type="email"
                value={getValue("contact_email", "info@smartphotoeditors.com")}
                onChange={(e) => setValue("contact_email", e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-bold text-slate-900 text-sm focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 shadow-sm transition-all"
                placeholder="e.g. info@smartphotoeditors.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
              <i className="fa-solid fa-copyright text-[#ff5b0a]"></i> Footer Copyright Notice
            </label>
            <input
              type="text"
              value={getValue("footer_copyright", "© 2026 SmartPHOTOeditors. All rights reserved.")}
              onChange={(e) => setValue("footer_copyright", e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-bold text-slate-900 text-sm focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 shadow-sm transition-all"
              placeholder="© 2026 SmartPHOTOeditors. All rights reserved."
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">Global site settings will be saved live to PostgreSQL.</span>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
          <span>{saving ? "Saving Changes..." : "Save Branding"}</span>
        </button>
      </div>
    </div>
  );
};
