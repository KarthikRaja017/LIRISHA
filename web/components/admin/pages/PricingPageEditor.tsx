"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageContent } from "@/types/content";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";

interface PricingPageEditorProps {
  page?: PageContent;
  onSave: (updatedPage: PageContent) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const PricingPageEditor: React.FC<PricingPageEditorProps> = ({
  page,
  onSave,
  showToast,
}) => {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"banner" | "tiers" | "seo">("banner");

  const [pageTitle, setPageTitle] = useState(
    page?.title || "Transparent Pricing | SmartPHOTOeditors"
  );
  const [metaDescription, setMetaDescription] = useState(
    page?.metaDescription ||
      "Affordable image editing pricing packages tailored to your project volume."
  );

  // Hero
  const [heroTitle, setHeroTitle] = useState(
    page?.hero?.title || "Simple, Scalable Pricing"
  );
  const [heroTagline, setHeroTagline] = useState(
    page?.hero?.tagline ||
      "Pay per image or choose volume-based dedicated artist retainers."
  );
  const [ctaText, setCtaText] = useState(page?.hero?.ctaText || "Request a Custom Quote");
  const [ctaLink, setCtaLink] = useState(page?.hero?.ctaLink || "/contact-us");

  // Pricing Tiers
  const defaultTiers = [
    { name: "Standard Retouching", price: "From $0.80 / image", turnaround: "24 Hours" },
    { name: "Real Estate HDR", price: "From $1.20 / image", turnaround: "12-24 Hours" },
    { name: "Clipping Path & Masking", price: "From $0.50 / image", turnaround: "12 Hours" },
    { name: "High-Volume E-Commerce", price: "Volume Retainers Available", turnaround: "Same Day" },
  ];

  const tiersSection = page?.sections?.find((s: any) => s.type === "pricing_tiers");
  const [tiers, setTiers] = useState<any[]>(tiersSection?.tiers || defaultTiers);

  useEffect(() => {
    if (page) {
      if (page.title) setPageTitle(page.title);
      if (page.metaDescription) setMetaDescription(page.metaDescription);
      if (page.hero?.title) setHeroTitle(page.hero.title);
      if (page.hero?.tagline) setHeroTagline(page.hero.tagline);
      if (page.hero?.ctaText) setCtaText(page.hero.ctaText);
      if (page.hero?.ctaLink) setCtaLink(page.hero.ctaLink);

      const sec = page.sections?.find((s: any) => s.type === "pricing_tiers");
      if (sec?.tiers) setTiers(sec.tiers);
    }
  }, [page]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload: PageContent = {
        slug: "pricing",
        title: pageTitle,
        metaDescription: metaDescription,
        hero: {
          title: heroTitle,
          tagline: heroTagline,
          ctaText: ctaText,
          ctaLink: ctaLink,
        },
        sections: [
          {
            type: "pricing_tiers",
            tiers: tiers,
          },
        ],
      };

      await onSave(payload);
      showToast("Pricing Page saved successfully!");
    } catch (err: any) {
      showToast(err.message || "Failed to save Pricing page", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-tag"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">Pricing Page Studio</h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold whitespace-nowrap shrink-0">
                Route: /pricing
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Control image editing rates, custom retainers, and volume discounts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            href="/pricing"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[#ff5b0a]"></i>
            <span>View Live Page</span>
          </Link>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
          >
            <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
            <span>{saving ? "Saving Changes..." : "Save Pricing"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: "banner", label: "Hero Banner", icon: "fa-image" },
          { id: "tiers", label: `Pricing Tiers (${tiers.length})`, icon: "fa-money-bill-wave" },
          { id: "seo", label: "SEO & Meta Tags", icon: "fa-magnifying-glass" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? "bg-[#1c2a5a] text-white shadow-md shadow-blue-950/20"
                  : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm"
              }`}
            >
              <i className={`fa-solid ${tab.icon} ${isActive ? "text-[#ff5b0a]" : "text-slate-400"}`}></i>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. HERO BANNER */}
      {activeTab === "banner" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 text-xs">
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-image"></i>
              </span>
              <h3 className="text-base font-extrabold text-slate-900">Hero Banner Copy</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">Top headline and call-to-action on the Pricing page.</p>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              <i className="fa-solid fa-heading text-[#ff5b0a] mr-1.5"></i>
              Headline Title
            </label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold text-sm border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              <i className="fa-regular fa-comment-dots text-indigo-500 mr-1.5"></i>
              Sub-Headline / Tagline
            </label>
            <textarea
              rows={3}
              value={heroTagline}
              onChange={(e) => setHeroTagline(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                <i className="fa-solid fa-circle-check text-emerald-500 mr-1.5"></i>
                CTA Button Text
              </label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                <i className="fa-solid fa-link text-blue-500 mr-1.5"></i>
                CTA Button Link
              </label>
              <input
                type="text"
                value={ctaLink}
                onChange={(e) => setCtaLink(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. TIERS */}
      {activeTab === "tiers" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-money-bill-wave"></i>
                </span>
                <h3 className="text-base font-extrabold text-slate-900">Pricing Packages & Rates</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">Manage per-image rate cards and turnaround times.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setTiers([
                  ...tiers,
                  { name: "New Service Tier", price: "From $1.00 / image", turnaround: "24 Hours" },
                ]);
              }}
              className="px-4 py-2 rounded-xl bg-orange-50 text-[#ff5b0a] border border-orange-200 hover:bg-orange-100 text-xs font-bold flex items-center gap-1.5 transition-all self-start"
            >
              <i className="fa-solid fa-plus"></i> Add Tier
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tiers.map((t, idx) => (
              <div key={idx} className="p-5 border border-slate-200 rounded-2xl bg-slate-50/70 hover:border-orange-300 hover:bg-slate-50 transition-all space-y-3.5 shadow-sm text-xs">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                  <span className="font-extrabold text-slate-900">Tier #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => setTiers(tiers.filter((_, i) => i !== idx))}
                    className="text-red-500 hover:text-red-700 font-bold flex items-center gap-1"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Tier Name</label>
                  <input
                    type="text"
                    value={t.name}
                    onChange={(e) => {
                      const updated = [...tiers];
                      updated[idx].name = e.target.value;
                      setTiers(updated);
                    }}
                    className="w-full px-3 py-2 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Price Label</label>
                    <input
                      type="text"
                      value={t.price}
                      onChange={(e) => {
                        const updated = [...tiers];
                        updated[idx].price = e.target.value;
                        setTiers(updated);
                      }}
                      className="w-full px-3 py-2 bg-white text-emerald-700 font-extrabold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Turnaround</label>
                    <input
                      type="text"
                      value={t.turnaround}
                      onChange={(e) => {
                        const updated = [...tiers];
                        updated[idx].turnaround = e.target.value;
                        setTiers(updated);
                      }}
                      className="w-full px-3 py-2 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SEO */}
      {activeTab === "seo" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 text-xs">
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <h3 className="text-base font-extrabold text-slate-900">Pricing Page SEO</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">Meta titles and search description.</p>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1.5">Page Title Tag</label>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1.5">Meta Description</label>
            <textarea
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full px-3.5 py-3 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
            />
          </div>
        </div>
      )}

      {/* Save Bar */}
      <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <i className="fa-solid fa-circle-info text-[#ff5b0a]"></i>
          <span>Save your changes to publish updated pricing live.</span>
        </div>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5b0a] to-orange-500 hover:from-[#e04f05] hover:to-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
          <span>{saving ? "Saving Changes..." : "Save Pricing"}</span>
        </button>
      </div>
    </div>
  );
};
