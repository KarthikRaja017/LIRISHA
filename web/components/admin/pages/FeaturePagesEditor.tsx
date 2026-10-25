"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageContent } from "@/types/content";

export interface FeaturePagesEditorProps {
  pages: PageContent[];
  onSave: (updatedPage: PageContent) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
  defaultSlug?: string;
}

const FEATURE_PAGE_OPTIONS = [
  { slug: "benefits", name: "Benefits of Outsourcing", route: "/benefits", icon: "fa-gem" },
  { slug: "247-coverage", name: "24/7 Global Coverage", route: "/247-coverage", icon: "fa-clock" },
  { slug: "compliant-software", name: "Compliant Software", route: "/compliant-software", icon: "fa-certificate" },
  { slug: "adobe-specialized-artists", name: "Adobe Specialized Artists", route: "/adobe-specialized-artists", icon: "fa-user-graduate" },
  { slug: "glossary", name: "Editing Glossary", route: "/glossary", icon: "fa-book" },
  { slug: "accessories", name: "Recommended Accessories", route: "/accessories", icon: "fa-camera" },
  { slug: "sitemap", name: "Sitemap Directory", route: "/sitemap", icon: "fa-sitemap" },
];

const DEFAULT_CONFIGS: Record<string, { badge: string; title: string; description: string; icon: string; sections: { title: string; content: string }[] }> = {
  benefits: {
    badge: "Partner Value",
    title: "Why Outsource Image Editing to LIRISHA",
    description: "Unlock agility, increase studio shooting capacity, and dramatically lower fixed operating costs.",
    icon: "fa-solid fa-gem",
    sections: [
      {
        title: "Focus on High-Value Client Shooting",
        content: "Photographers spend 60% of their time behind screens editing. Free up your schedule to shoot more weddings, homes, and commercial campaigns.",
      },
      {
        title: "Scale Instantly During Peak Seasons",
        content: "Easily absorb seasonal volume spikes in spring real estate or fall wedding peaks without hiring permanent overhead staff.",
      },
      {
        title: "Predictable Per-Image Post-Production Overhead",
        content: "Convert fixed studio labor into variable project costs with transparent volume tiers and SLA turnaround guarantees.",
      },
    ],
  },
  "247-coverage": {
    badge: "Global Operations",
    title: "24/7 Global Time-Zone Coverage",
    description: "Operating around the clock across North America, Europe, and Asia to deliver overnight turnarounds for busy photography studios.",
    icon: "fa-solid fa-clock",
    sections: [
      {
        title: "Follow-the-Sun Workflow",
        content: "Shoot today, upload in the evening, and receive your fully edited, polished gallery before your morning client meetings.",
      },
      {
        title: "Dedicated Account Managers",
        content: "Always have a direct point of contact for urgent requests, volume spikes, and customized production instructions.",
      },
      {
        title: "Triple Shift Production Facility",
        content: "Our three continuous 8-hour production shifts keep files moving forward through QC without idle night downtime.",
      },
    ],
  },
  "compliant-software": {
    badge: "Software Integrity",
    title: "100% Genuine Licensed Adobe Software Compliance",
    description: "Operating exclusively with certified Adobe Creative Cloud enterprise licenses, guaranteeing software legality and state-of-the-art tooling.",
    icon: "fa-solid fa-certificate",
    sections: [
      {
        title: "Zero Piracy Guarantee",
        content: "We maintain strict enterprise software compliance, protecting your brand from third-party copyright and licensing liabilities.",
      },
      {
        title: "Latest Photoshop & Lightroom AI Features",
        content: "We harness the newest neural filters, generative fill expansions, and advanced camera RAW profiles.",
      },
      {
        title: "Rigorous Cyber Audits",
        content: "Annual vendor licensing audits and strict air-gapped terminal configurations guarantee legitimate enterprise operation.",
      },
    ],
  },
  "adobe-specialized-artists": {
    badge: "Expert Talent",
    title: "Certified Adobe Specialized Artists",
    description: "Our team consists of full-time retouching professionals with degrees in fine arts and extensive post-production training.",
    icon: "fa-solid fa-user-graduate",
    sections: [
      {
        title: "Continuous Professional Training",
        content: "All retouchers undergo continuous training in high-end frequency separation, composite lighting harmonization, and color theory.",
      },
      {
        title: "Domain-Specific Teams",
        content: "Specialized real estate editors focus strictly on architectural imaging, while portrait artists focus solely on skin and beauty aesthetics.",
      },
      {
        title: "Senior Art Director Oversight",
        content: "Every master batch is reviewed by a veteran post-production supervisor with 10+ years commercial studio experience.",
      },
    ],
  },
  glossary: {
    badge: "Reference",
    title: "Photo Editing & Retouching Glossary",
    description: "Comprehensive definitions of industry terms including HDR, Frequency Separation, Clipping Path, Alpha Masking, and Focus Stacking.",
    icon: "fa-solid fa-book",
    sections: [
      {
        title: "Clipping Path",
        content: "A closed vector path created using Photoshop's Pen Tool to isolate a subject from its original background with sharp, clean edges.",
      },
      {
        title: "Frequency Separation",
        content: "A high-end retouching technique that separates high-frequency texture (pores, hairs) from low-frequency color and tone, allowing independent editing.",
      },
      {
        title: "HDR (High Dynamic Range) Blending",
        content: "The process of combining multiple bracketed exposures into a single image to capture the full spectrum of highlights and shadows in high-contrast scenes.",
      },
      {
        title: "Alpha Channel Masking",
        content: "Pixel-based selection technique used to separate semi-transparent subjects such as fine flyaway hair, smoke, glass, or fur from backgrounds.",
      },
    ],
  },
  accessories: {
    badge: "Equipment & Tips",
    title: "Recommended Photography Accessories & Studio Gear",
    description: "Curated recommendations on color calibration cards, lighting modifiers, tripod heads, and tethering cables to optimize shooting for post-production.",
    icon: "fa-solid fa-camera",
    sections: [
      {
        title: "Color Calibration Cards (X-Rite / Datacolor)",
        content: "Including a ColorChecker in your first shoot frame enables our Lightroom technicians to apply automated, mathematically precise white balance corrections.",
      },
      {
        title: "Polarizing Filters for Jewelry & Automotive",
        content: "Circular polarizers eliminate specular flare on car windshields and jewelry glass, preserving rich underlying textures.",
      },
      {
        title: "Calibrated Tethering Cables & Clamps",
        content: "High-speed shielded USB-C tethering cables ensure reliable direct capture into capture software without packet dropouts.",
      },
    ],
  },
  sitemap: {
    badge: "Navigation",
    title: "LIRISHA Sitemap Directory",
    description: "Quick navigation index across all services, resources, and company pages.",
    icon: "fa-solid fa-sitemap",
    sections: [
      {
        title: "Complete Site Architecture",
        content: "Easily navigate our specialized image editing departments, resource guides, pricing sheets, and client portals.",
      },
    ],
  },
};

export const FeaturePagesEditor: React.FC<FeaturePagesEditorProps> = ({
  pages,
  onSave,
  showToast,
  defaultSlug = "benefits",
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string>(defaultSlug);
  const [activeTab, setActiveTab] = useState<"banner" | "sections" | "seo">("banner");
  const [saving, setSaving] = useState(false);

  // Form states for the currently selected feature page
  const [pageTitle, setPageTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [badge, setBadge] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [icon, setIcon] = useState("");
  const [sections, setSections] = useState<{ title: string; content: string }[]>([]);

  // Load content when selectedSlug changes or pages update
  useEffect(() => {
    const existing = pages.find((p) => p.slug === selectedSlug);
    const defaults = DEFAULT_CONFIGS[selectedSlug] || {
      badge: "Feature Overview",
      title: "Page Overview",
      description: "Comprehensive details and technical information.",
      icon: "fa-solid fa-file",
      sections: [],
    };

    setPageTitle(existing?.title || `${defaults.title} | LIRISHA`);
    setMetaDescription(existing?.metaDescription || defaults.description);
    setBadge(existing?.hero?.badge || defaults.badge);
    setHeroTitle(existing?.hero?.title || defaults.title);
    setHeroSubtitle(existing?.hero?.tagline || existing?.hero?.subtitle || defaults.description);
    setIcon(existing?.hero?.image || defaults.icon);

    const dynamicSectionsObj = existing?.sections?.find(
      (s: any) => s.type === "sections" || s.type === "qa_sections" || s.type === "policy_sections"
    );
    if (dynamicSectionsObj?.items && Array.isArray(dynamicSectionsObj.items)) {
      setSections(dynamicSectionsObj.items);
    } else {
      setSections(defaults.sections);
    }
  }, [selectedSlug, pages]);

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        title: "New Key Section",
        content: "Enter detailed explanation or operational deliverable here.",
      },
    ]);
  };

  const handleRemoveSection = (idx: number) => {
    setSections(sections.filter((_, i) => i !== idx));
  };

  const handleSectionChange = (idx: number, field: "title" | "content", val: string) => {
    const copy = [...sections];
    copy[idx] = { ...copy[idx], [field]: val };
    setSections(copy);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload: PageContent = {
        slug: selectedSlug,
        title: pageTitle,
        metaDescription: metaDescription,
        hero: {
          badge: badge,
          title: heroTitle,
          tagline: heroSubtitle,
          subtitle: heroSubtitle,
          image: icon,
        },
        sections: [
          {
            type: "sections",
            heading: heroTitle,
            items: sections,
          },
        ],
      };

      await onSave(payload);
      showToast(`'${selectedSlug}' page saved and published successfully to database!`);
    } catch (err: any) {
      showToast(err.message || `Failed to save ${selectedSlug} page`, "error");
    } finally {
      setSaving(false);
    }
  };

  const activeOption = FEATURE_PAGE_OPTIONS.find((o) => o.slug === selectedSlug);

  return (
    <div className="space-y-6">
      {/* Header & Page Selector Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className={`fa-solid ${activeOption?.icon || "fa-file-lines"}`}></i>
          </div>
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-heading truncate">
              Feature & Secondary Pages Editor
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
              Customize headlines, content pillars, icons, and dynamic metadata for all secondary pages
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <Link
            href={`/${selectedSlug}`}
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all flex items-center gap-2 border border-slate-200"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[#1265E8]"></i>
            View Live Page
          </Link>

          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C8F8] via-[#1265E8] to-[#713CFF] text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
            {saving ? "Saving..." : "Save Page to DB"}
          </button>
        </div>
      </div>

      {/* Page Selector Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-gray-200 shadow-sm flex gap-1.5 overflow-x-auto scrollbar-none">
        {FEATURE_PAGE_OPTIONS.map((opt) => {
          const isSelected = selectedSlug === opt.slug;
          return (
            <button
              key={opt.slug}
              type="button"
              onClick={() => setSelectedSlug(opt.slug)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? "bg-[#07152F] text-[#00C8F8] shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <i className={`fa-solid ${opt.icon} text-[11px]`}></i>
              <span>{opt.name}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                isSelected ? "bg-white/10 text-white" : "bg-slate-100 text-slate-500"
              }`}>
                {opt.route}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Editing Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 px-6 pt-4 flex gap-4 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("banner")}
            className={`pb-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "banner"
                ? "border-[#1265E8] text-[#1265E8]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <i className="fa-solid fa-heading text-xs"></i>
            Hero Banner & Badge
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sections")}
            className={`pb-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "sections"
                ? "border-[#1265E8] text-[#1265E8]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <i className="fa-solid fa-layer-group text-xs"></i>
            Content Sections ({sections.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("seo")}
            className={`pb-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "seo"
                ? "border-[#1265E8] text-[#1265E8]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <i className="fa-solid fa-globe text-xs"></i>
            SEO & Meta Tags
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {activeTab === "banner" && (
            <div className="space-y-5 max-w-3xl">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Badge Pill Text
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. Partner Value, Global Operations"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#1265E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Main Page Heading (H1)
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder="Headline displayed on the page"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#1265E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Hero Subtitle / Description
                </label>
                <textarea
                  rows={3}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  placeholder="Introductory paragraph under the headline"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#1265E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  FontAwesome Icon Class
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-sm shrink-0">
                    <i className={icon || "fa-solid fa-file"}></i>
                  </div>
                  <input
                    type="text"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="e.g. fa-solid fa-gem, fa-solid fa-clock"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 font-mono focus:outline-none focus:border-[#1265E8]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "sections" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Feature Content Pillars & Cards ({sections.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddSection}
                  className="px-3.5 py-1.5 rounded-xl bg-[#1265E8]/10 hover:bg-[#1265E8]/20 text-[#1265E8] font-bold text-xs transition-all flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                  Add Section Card
                </button>
              </div>

              {sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-[#1265E8] bg-blue-100/60 px-2 py-0.5 rounded-md">
                      Pillar #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(idx)}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
                    >
                      <i className="fa-solid fa-trash text-[11px]"></i>
                      Remove
                    </button>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={sec.title}
                      onChange={(e) => handleSectionChange(idx, "title", e.target.value)}
                      placeholder="Section Title"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#1265E8]"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      value={sec.content}
                      onChange={(e) => handleSectionChange(idx, "content", e.target.value)}
                      placeholder="Section content or description..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-700 focus:outline-none focus:border-[#1265E8]"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-5 max-w-3xl">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Page Meta Title (&lt;title&gt;)
                </label>
                <input
                  type="text"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  placeholder="Meta Title for Search Engines"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#1265E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Summary snippet for search results"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#1265E8]"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Character count: {metaDescription.length} (Recommended: 120-160)
                </span>
              </div>
            </div>
          )}

          {/* Bottom Save Bar */}
          <div className="mt-8 pt-5 border-t border-gray-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Changes will immediately update the live database and be reflected on <code className="text-[#1265E8]">/{selectedSlug}</code>.
            </span>
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-[#07152F] hover:bg-[#102749] text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-check"}`}></i>
              {saving ? "Saving Changes..." : "Publish Page Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
