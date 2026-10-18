"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageContent } from "@/types/content";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";
import { BrandLoader } from "@/components/ui/BrandLoader";

interface AboutUsPageEditorProps {
  page?: PageContent;
  onSave: (updatedPage: PageContent) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const AboutUsPageEditor: React.FC<AboutUsPageEditorProps> = ({
  page,
  onSave,
  showToast,
}) => {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"banner" | "stats" | "mission" | "seo">("banner");

  const [pageTitle, setPageTitle] = useState(
    page?.title || "About Us | LIRISHA"
  );
  const [metaDescription, setMetaDescription] = useState(
    page?.metaDescription ||
      "LIRISHA provides value-focused, quality services from a team of skilled photo editing experts who set the benchmark for image editing solutions."
  );

  // Hero Banner
  const [heroTitle, setHeroTitle] = useState(
    page?.hero?.title || "About LIRISHA Image Editing Specialists"
  );
  const [heroTagline, setHeroTagline] = useState(
    page?.hero?.tagline ||
      "LIRISHA provides professional, AI-assisted image editing and post-production support to businesses that need high-quality work delivered consistently, efficiently, and at scale."
  );
  const [heroImage, setHeroImage] = useState(
    page?.hero?.image || "/images/about/about-banner-540x671.webp"
  );
  const [ctaText, setCtaText] = useState(page?.hero?.ctaText || "Get a free Quote Note");
  const [ctaLink, setCtaLink] = useState(page?.hero?.ctaLink || "/contact-us.php");

  // Statistics Section
  const defaultStats = [
    { value: "15+", label: "Years in Business" },
    { value: "200+", label: "Skilled Photoshop Artists" },
    { value: "10M+", label: "Images Edited" },
    { value: "99.2%", label: "Client Satisfaction" },
  ];

  const statsSection = page?.sections?.find((s: any) => s.type === "statistics");
  const [statsItems, setStatsItems] = useState<any[]>(
    statsSection?.items || defaultStats
  );

  // Mission Section
  const missionSection = page?.sections?.find((s: any) => s.type === "mission");
  const [missionTitle, setMissionTitle] = useState(
    missionSection?.title || "Our Mission & Commitment"
  );
  const [missionContent, setMissionContent] = useState(
    missionSection?.content ||
      "Delivering high-precision post-production with 12 to 24-hour turnaround times worldwide, helping professional photographers and global brands maintain visual excellence."
  );

  useEffect(() => {
    if (page) {
      if (page.title) setPageTitle(page.title);
      if (page.metaDescription) setMetaDescription(page.metaDescription);
      if (page.hero?.title) setHeroTitle(page.hero.title);
      if (page.hero?.tagline) setHeroTagline(page.hero.tagline);
      if (page.hero?.image) setHeroImage(page.hero.image);
      if (page.hero?.ctaText) setCtaText(page.hero.ctaText);
      if (page.hero?.ctaLink) setCtaLink(page.hero.ctaLink);

      const s = page.sections?.find((sec: any) => sec.type === "statistics");
      if (s?.items) setStatsItems(s.items);

      const m = page.sections?.find((sec: any) => sec.type === "mission");
      if (m) {
        if (m.title) setMissionTitle(m.title);
        if (m.content) setMissionContent(m.content);
      }
    }
  }, [page]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload: PageContent = {
        slug: "about-us",
        title: pageTitle,
        metaDescription: metaDescription,
        hero: {
          title: heroTitle,
          tagline: heroTagline,
          image: heroImage,
          ctaText: ctaText,
          ctaLink: ctaLink,
        },
        sections: [
          {
            type: "statistics",
            title: "Key Statistics",
            items: statsItems,
          },
          {
            type: "mission",
            title: missionTitle,
            content: missionContent,
          },
        ],
      };

      await onSave(payload);
      showToast("About Us Page saved successfully!");
    } catch (err: any) {
      showToast(err.message || "Failed to save About Us page", "error");
    } finally {
      setSaving(false);
    }
  };

  if (!page) {
    return (
      <div className="py-24 flex items-center justify-center">
        <BrandLoader
          size="lg"
          message="Loading About Us Content..."
          subMessage="Fetching story & milestones from database"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-circle-info"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">About Us Page Studio</h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold whitespace-nowrap shrink-0">
                Route: /about-us
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Control the company story, banner graphics, milestones, and mission statement.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            href="/about-us"
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
            <span>{saving ? "Saving Changes..." : "Save About Us"}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: "banner", label: "Hero Banner & Story", icon: "fa-image" },
          { id: "stats", label: `Company Milestones (${statsItems.length})`, icon: "fa-chart-simple" },
          { id: "mission", label: "Mission & Commitment", icon: "fa-bullseye" },
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-image"></i>
              </span>
              <h3 className="text-base font-extrabold text-slate-900">Hero Banner & Intro Story</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">Top graphic banner and introductory business narrative.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-xs">
            {/* Left: Image */}
            <div className="md:col-span-5 xl:col-span-4 space-y-3.5">
              <div className="w-full aspect-video min-h-[160px] max-h-64 rounded-2xl bg-slate-900 border border-slate-300 overflow-hidden flex items-center justify-center p-2 shadow-inner">
                {heroImage ? (
                  <img src={heroImage} alt="Banner" className="max-h-full max-w-full object-contain rounded-lg" />
                ) : (
                  <span className="text-slate-400 font-medium">No Image</span>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <i className="fa-regular fa-image text-[#ff5b0a]"></i>
                    Hero Banner Graphic
                  </label>
                  <ImageUploadButton
                    folder="about"
                    label="Upload Banner"
                    currentValue={heroImage}
                    onUploadSuccess={(url) => {
                      setHeroImage(url);
                      showToast("About banner uploaded!");
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  placeholder="/images/about/banner.webp"
                />
              </div>
            </div>

            {/* Right: Text Fields */}
            <div className="md:col-span-7 xl:col-span-8 space-y-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  <i className="fa-solid fa-heading text-[#ff5b0a] mr-1.5"></i>
                  Banner Headline
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold text-sm border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  placeholder="About SPE Image Editing Specialists"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  <i className="fa-regular fa-comment-dots text-indigo-500 mr-1.5"></i>
                  Company Narrative / Story
                </label>
                <textarea
                  rows={5}
                  value={heroTagline}
                  onChange={(e) => setHeroTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
                  placeholder="Comprehensive introduction..."
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
                    placeholder="Get a free Quote Note"
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
                    placeholder="/contact-us.php"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. STATS */}
      {activeTab === "stats" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-chart-simple"></i>
              </span>
              <h3 className="text-base font-extrabold text-slate-900">Company Key Statistics</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">Milestone badges highlighting enterprise scale and satisfaction.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsItems.map((item, idx) => (
              <div key={idx} className="p-5 border border-slate-200 rounded-2xl bg-slate-50/70 hover:border-orange-300 hover:bg-slate-50 transition-all space-y-3.5 shadow-sm">
                <span className="font-extrabold text-xs text-slate-700 uppercase tracking-wide">Stat #{idx + 1}</span>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Value / Metric</label>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => {
                      const updated = [...statsItems];
                      updated[idx].value = e.target.value;
                      setStatsItems(updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-black text-sm text-[#ff5b0a] focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                    placeholder="e.g. 15+"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const updated = [...statsItems];
                      updated[idx].label = e.target.value;
                      setStatsItems(updated);
                    }}
                    className="w-full px-3 py-2 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl text-xs focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                    placeholder="e.g. Years in Business"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. MISSION */}
      {activeTab === "mission" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-bullseye"></i>
              </span>
              <h3 className="text-base font-extrabold text-slate-900">Mission & Quality Commitment</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">Core company pledges and turnaround assurances.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Section Title</label>
              <input
                type="text"
                value={missionTitle}
                onChange={(e) => setMissionTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                placeholder="Our Mission & Commitment"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Commitment Statement</label>
              <textarea
                rows={4}
                value={missionContent}
                onChange={(e) => setMissionContent(e.target.value)}
                className="w-full px-3.5 py-3 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
                placeholder="Mission content..."
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. SEO */}
      {activeTab === "seo" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <h3 className="text-base font-extrabold text-slate-900">About Us SEO Meta Tags</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">Search engine index tags for the About Us route.</p>
          </div>

          <div className="space-y-4 text-xs">
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
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <i className="fa-solid fa-circle-info text-[#ff5b0a]"></i>
          <span>Changes will update the live About Us page upon clicking save.</span>
        </div>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5b0a] to-orange-500 hover:from-[#e04f05] hover:to-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
          <span>{saving ? "Saving Changes..." : "Save About Us"}</span>
        </button>
      </div>
    </div>
  );
};
