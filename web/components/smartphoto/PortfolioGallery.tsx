"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GalleryTab } from "@/types/content";
import { getGalleryTabs } from "@/lib/api/content";
import { ImageComparisonSlider } from "./ImageComparisonSlider";
import { BrandLoader } from "@/components/ui/BrandLoader";
import { DropboxExplorer } from "@/features/dropbox";

interface PortfolioGalleryProps {
  initialTabs?: GalleryTab[];
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ initialTabs }) => {
  const [viewMode, setViewMode] = useState<"dropbox" | "portfolio">("dropbox");
  const [tabs, setTabs] = useState<GalleryTab[]>(initialTabs || []);
  const [loading, setLoading] = useState(false);
  const [activeTabId, setActiveTabId] = useState<string>("tab-sm1");

  useEffect(() => {
    if (!initialTabs || initialTabs.length === 0) {
      setLoading(true);
      getGalleryTabs()
        .then(async (data) => {
          if (data && data.length > 0) {
            setTabs(data);
            setActiveTabId(data[0].id);
          } else {
            // Fallback to sample static json if database tabs are empty
            try {
              const res = await fetch("/sample_gallery_clean.json");
              if (res.ok) {
                const sampleTabs = await res.json();
                if (sampleTabs && sampleTabs.length > 0) {
                  setTabs(sampleTabs);
                  setActiveTabId(sampleTabs[0].id);
                }
              }
            } catch (err) {
              console.warn("Could not load sample_gallery_clean.json:", err);
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [initialTabs]);

  const activeTab =
    tabs.find((t) => t.id === activeTabId) || tabs[0] || { id: "default", name: "Gallery", items: [] };

  return (
    <div className="portfolio-page">
      {/* Banner Section */}
      <section
        className="inner-banner articles py-12 md:py-16 bg-[#f1f5f4] border-b border-gray-200"
        style={{
          backgroundImage: "url('/images/sample-images/gallery-banner-bg.webp')",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="row">
            <div className="col-lg-8">
              <div className="inner-banner-title mb-2">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                  Photo Gallery & Media
                </h1>
              </div>
              <ul className="breadcrum-left flex items-center gap-2 text-sm text-gray-600 mt-2 list-none p-0">
                <li>
                  <Link href="/" className="text-[#fd5d0a] hover:underline">
                    Home
                  </Link>
                </li>
                <li className="text-gray-400">&gt;</li>
                <li className="text-gray-800 font-medium">Sample Images & Dropbox Storage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="sec-articles-gallery py-10 bg-gray-50 min-h-[600px]">
        <div className="container mx-auto px-4">
          {/* ── Mode Switcher Tabs ───────────────────────────────────── */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1.5 bg-gray-200/80 rounded-2xl shadow-inner gap-1">
              <button
                type="button"
                onClick={() => setViewMode("dropbox")}
                className={`px-6 py-3 rounded-xl text-sm md:text-base font-bold transition-all flex items-center gap-2 ${
                  viewMode === "dropbox"
                    ? "bg-[#1265E8] text-white shadow-md scale-[1.02]"
                    : "text-gray-700 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                <span>📦</span> Dropbox Cloud Files & Upload
              </button>

              <button
                type="button"
                onClick={() => setViewMode("portfolio")}
                className={`px-6 py-3 rounded-xl text-sm md:text-base font-bold transition-all flex items-center gap-2 ${
                  viewMode === "portfolio"
                    ? "bg-[#1265E8] text-white shadow-md scale-[1.02]"
                    : "text-gray-700 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                <span>📸</span> Before & After Comparisons
              </button>
            </div>
          </div>

          {/* ── View 1: Dropbox Cloud Storage Explorer & Uploader ────── */}
          {viewMode === "dropbox" && (
            <div className="animate-in fade-in duration-300">
              <DropboxExplorer
                initialPath=""
                title="Your Dropbox Folders & Photos"
                subtitle="Browse existing files and folders, preview images, and upload new media directly to Dropbox."
              />
            </div>
          )}

          {/* ── View 2: Portfolio Before & After Slider Comparisons ───── */}
          {viewMode === "portfolio" && (
            <div className="animate-in fade-in duration-300">
              {loading ? (
                <div className="py-20 flex justify-center">
                  <BrandLoader size="lg" message="Loading galleries..." />
                </div>
              ) : (
                <div className="sample-images">
                  {/* Category Tabs */}
                  {tabs.length > 0 && (
                    <div className="border-b-2 border-gray-300 flex justify-center flex-wrap gap-2 md:gap-4 mb-10">
                      {tabs.map((tab) => {
                        const isActive = tab.id === activeTabId;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTabId(tab.id)}
                            className={`relative px-6 py-4 text-base md:text-lg font-medium transition-colors focus:outline-none ${
                              isActive
                                ? "text-[#1265E8] font-semibold"
                                : "text-gray-700 hover:text-[#1265E8]"
                            }`}
                          >
                            {tab.name}
                            {isActive && (
                              <>
                                <span className="absolute bottom-[-2px] left-0 right-0 h-[3px] bg-[#1265E8]" />
                                <span className="absolute bottom-[-11px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#1265E8]" />
                              </>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Comparison Items Grid */}
                  <div className="sample-gallery bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-200">
                    {activeTab.items.length === 0 ? (
                      <div className="py-12 text-center text-gray-500">
                        No comparison items in this category yet.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {activeTab.items.map((item) => (
                          <div key={item.id} className="flex flex-col items-center">
                            <ImageComparisonSlider
                              beforeSrc={item.beforeSrc}
                              afterSrc={item.afterSrc}
                              beforeAlt={item.beforeAlt}
                              afterAlt={item.afterAlt}
                              title={item.title}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
