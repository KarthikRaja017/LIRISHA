"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GalleryTab } from "@/types/content";
import { getGalleryTabs } from "@/lib/api/content";
import { ImageComparisonSlider } from "./ImageComparisonSlider";
import { BrandLoader } from "@/components/ui/BrandLoader";

interface PortfolioGalleryProps {
  initialTabs?: GalleryTab[];
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ initialTabs }) => {
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
              <div className="banner-title-block mb-3">
                <div className="banner-badge-attractive">
                  <span className="banner-badge-dot"></span>
                  <span>Retouching Portfolio &amp; Deliverables</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight font-heading mt-2">
                  Sample Image Gallery
                </h1>
              </div>
              <p className="text-sm md:text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
                Explore side-by-side interactive before-and-after comparisons across our professional post-production specialties.
              </p>
              <ul className="breadcrum-left flex items-center gap-2 text-sm text-gray-600 mt-3 list-none p-0">
                <li>
                  <Link href="/" className="text-[#1265E8] hover:underline">
                    Home
                  </Link>
                </li>
                <li className="text-gray-400">&gt;</li>
                <li className="text-gray-800 font-medium">Sample Images &amp; Portfolio</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="sec-articles-gallery py-12 bg-gray-50 min-h-[600px]">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="py-20 flex justify-center">
              <BrandLoader size="lg" message="Loading sample galleries..." />
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
                            ? "text-[#1265E8] font-bold"
                            : "text-gray-700 hover:text-[#1265E8]"
                        }`}
                      >
                        {tab.name}
                        {isActive && (
                          <span className="absolute bottom-[-2px] left-0 right-0 h-[3px] bg-[#1265E8]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Gallery Grid */}
              {activeTab && activeTab.items && activeTab.items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {activeTab.items.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
                    >
                      <div className="w-full mb-4">
                        <ImageComparisonSlider
                          beforeSrc={item.beforeSrc}
                          afterSrc={item.afterSrc}
                          beforeAlt={item.beforeAlt || `${item.title} Before`}
                          afterAlt={item.afterAlt || `${item.title} After`}
                          title={item.title}
                        />
                      </div>
                      <h4 className="text-gray-900 font-bold text-center text-sm md:text-base mt-auto">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-xs text-center mt-1">
                        Slide horizontally to inspect editing detail
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-500">
                  <p>No sample comparison items found for this service category.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
