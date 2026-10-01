"use client";

import React, { useState } from "react";
import Link from "next/link";
import { galleryTabs } from "@/lib/galleryData";
import { ImageComparisonSlider } from "./ImageComparisonSlider";

export const PortfolioGallery: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>("tab-sm1");

  const activeTab =
    galleryTabs.find((t) => t.id === activeTabId) || galleryTabs[0];

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
                  Photo Gallery
                </h1>
              </div>
              <ul className="breadcrum-left flex items-center gap-2 text-sm text-gray-600 mt-2 list-none p-0">
                <li>
                  <Link href="/" className="text-[#fd5d0a] hover:underline">
                    Home
                  </Link>
                </li>
                <li className="text-gray-400">&gt;</li>
                <li className="text-gray-800 font-medium">Sample Images</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="sec-articles-gallery py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="row">
            <div className="col-md-12 sample-images">
              {/* Category Tabs */}
              <div className="border-b-2 border-gray-300 flex justify-center flex-wrap gap-2 md:gap-4 mb-10">
                {galleryTabs.map((tab) => {
                  const isActive = tab.id === activeTabId;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTabId(tab.id)}
                      className={`relative px-6 py-4 text-base md:text-lg font-medium transition-colors focus:outline-none ${
                        isActive
                          ? "text-[#ff5b0a] font-semibold"
                          : "text-gray-700 hover:text-[#ff5b0a]"
                      }`}
                    >
                      {tab.name}
                      {isActive && (
                        <>
                          {/* Active bottom line */}
                          <span className="absolute bottom-[-2px] left-0 right-0 h-[3px] bg-[#ff5b0a]" />
                          {/* Active triangular arrow */}
                          <span className="absolute bottom-[-11px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#ff5b0a]" />
                        </>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Gallery Items Grid */}
              <div className="sample-gallery bg-[#f8f9fa] p-4 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="row">
                  {activeTab.items.map((item) => (
                    <div
                      key={item.id}
                      className="col-md-6 col-12 mb-8 flex flex-col items-center"
                    >
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
