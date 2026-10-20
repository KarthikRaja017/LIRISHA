"use client";

import React, { useState, useEffect } from "react";
import { useDropboxFolder } from "../hooks/useDropboxFolder";
import { DropboxGallery } from "./DropboxGallery";
import { DropboxFile } from "../types/dropbox.types";

export interface DropboxTab {
  /** Tab button label shown in the UI */
  label: string;
  /** Absolute Dropbox folder path for this tab */
  folderPath: string;
}

interface DropboxFolderTabsProps {
  tabs: DropboxTab[];
  /** Index of the tab that should be active on first render (default: 0) */
  defaultTab?: number;
  /** Optional section heading above the tab buttons */
  title?: string;
  /** Tailwind grid-cols classes forwarded to each DropboxGallery */
  gridCols?: string;
  /** Max images per tab */
  limit?: number;
  /** Forwarded to each DropboxGallery for lightbox etc. */
  onImageClick?: (file: DropboxFile) => void;
}

/**
 * DropboxFolderTabs
 * Renders a pill-style tab bar where each tab maps to a Dropbox folder.
 * Switching tabs loads that folder's images (lazy — only fetches on activation).
 *
 * Usage:
 * ```tsx
 * <DropboxFolderTabs
 *   tabs={[
 *     { label: "Portrait",    folderPath: "/lirisha-media/gallery/portrait" },
 *     { label: "Real Estate", folderPath: "/lirisha-media/gallery/real-estate" },
 *   ]}
 *   title="Our Portfolio"
 * />
 * ```
 */
export function DropboxFolderTabs({
  tabs,
  defaultTab = 0,
  title,
  gridCols,
  limit,
  onImageClick,
}: DropboxFolderTabsProps) {
  const [activeTab, setActiveTab] = useState(
    Math.min(defaultTab, Math.max(tabs.length - 1, 0))
  );

  // Keep activeTab in bounds if tabs change
  useEffect(() => {
    if (activeTab >= tabs.length) setActiveTab(0);
  }, [tabs.length, activeTab]);

  if (!tabs.length) return null;

  return (
    <section className="w-full">

      {/* ── Section title ─────────────────────────────────────────────── */}
      {title && (
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {title}
        </h2>
      )}

      {/* ── Tab Buttons ───────────────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label={title ?? "Gallery tabs"}
        className="flex flex-wrap gap-2 justify-center mb-8"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={tab.folderPath}
              role="tab"
              aria-selected={isActive}
              aria-controls={`dropbox-tabpanel-${index}`}
              id={`dropbox-tab-${index}`}
              onClick={() => setActiveTab(index)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium
                transition-all duration-200 focus:outline-none
                focus-visible:ring-2 focus-visible:ring-blue-500
                ${isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab Panels ────────────────────────────────────────────────── */}
      {tabs.map((tab, index) => (
        <div
          key={tab.folderPath}
          role="tabpanel"
          id={`dropbox-tabpanel-${index}`}
          aria-labelledby={`dropbox-tab-${index}`}
          hidden={activeTab !== index}
        >
          {/*
            Each gallery uses lazy=true so it only fetches when its tab
            is first made visible. Once loaded, subsequent tab switches
            don't re-fetch — data is held in component state.
          */}
          {activeTab === index && (
            <DropboxGallery
              folderPath={tab.folderPath}
              gridCols={gridCols}
              limit={limit}
              onImageClick={onImageClick}
              lazy={false}
            />
          )}
        </div>
      ))}
    </section>
  );
}
