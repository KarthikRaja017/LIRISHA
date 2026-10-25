"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageContent } from "@/types/content";

interface QualityPageEditorProps {
  page?: PageContent;
  onSave: (updatedPage: PageContent) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const QualityPageEditor: React.FC<QualityPageEditorProps> = ({
  page,
  onSave,
  showToast,
}) => {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"banner" | "stages" | "sections" | "seo">("banner");

  const [pageTitle, setPageTitle] = useState(
    page?.title || "Quality Assurance Commitment | SmartPHOTOeditors"
  );
  const [metaDescription, setMetaDescription] = useState(
    page?.metaDescription ||
      "Two-tier quality review process and zero-error commitment for professional photo editing and retouching."
  );

  const [heroBadge, setHeroBadge] = useState(
    page?.hero?.badge || "Quality Assurance"
  );
  const [heroTitle, setHeroTitle] = useState(
    page?.hero?.title || "Our Commitment to Flawless Quality & Precision"
  );
  const [heroTagline, setHeroTagline] = useState(
    page?.hero?.tagline ||
      "Consistent, high-caliber image editing backed by senior Adobe-certified quality controllers and a structured two-tier review process."
  );

  // 3 Process Stages
  const defaultStages = [
    {
      stage: "Stage 1",
      title: "Precision Post-Production",
      desc: "Primary edit by specialized Adobe certified artists.",
    },
    {
      stage: "Stage 2",
      title: "Peer Review Audit",
      desc: "Senior supervisor checks color calibration and edge masking.",
    },
    {
      stage: "Stage 3",
      title: "Final QC Release",
      desc: "Format, metadata, and pixel resolution verified before delivery.",
    },
  ];

  const stagesSection = page?.sections?.find((s: any) => s.type === "stages");
  const [stages, setStages] = useState<any[]>(
    stagesSection?.items && stagesSection.items.length > 0
      ? stagesSection.items
      : defaultStages
  );

  // QA Inspection Sections / Pillars
  const defaultSections = [
    {
      title: "Multi-Tier QA Inspection Process",
      content:
        "Every single image undergoes a primary check by the senior retouching lead followed by an independent inspection by our dedicated Quality Assurance team before client dispatch.",
    },
    {
      title: "Calibrated IPS Color Management",
      content:
        "All editing suites are equipped with hardware-calibrated color-accurate IPS displays to ensure true-to-life Pantone and sRGB/AdobeRGB fidelity.",
    },
    {
      title: "Zero-Cost Rework Guarantee",
      content:
        "If any deliverable does not match your creative brief or technical guidelines, we provide unlimited prompt revisions with zero additional fees.",
    },
  ];

  const qaSection = page?.sections?.find(
    (s: any) => s.type === "qa_sections" || s.type === "sections"
  );
  const [sectionsList, setSectionsList] = useState<any[]>(
    qaSection?.items && qaSection.items.length > 0
      ? qaSection.items
      : defaultSections
  );

  useEffect(() => {
    if (page) {
      if (page.title) setPageTitle(page.title);
      if (page.metaDescription) setMetaDescription(page.metaDescription);
      if (page.hero?.title) setHeroTitle(page.hero.title);
      if (page.hero?.tagline) setHeroTagline(page.hero.tagline);
      if (page.hero?.badge) setHeroBadge(page.hero.badge);

      const st = page.sections?.find((s: any) => s.type === "stages");
      if (st?.items && st.items.length > 0) setStages(st.items);

      const qs = page.sections?.find(
        (s: any) => s.type === "qa_sections" || s.type === "sections"
      );
      if (qs?.items && qs.items.length > 0) setSectionsList(qs.items);
    }
  }, [page]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload: PageContent = {
        slug: "quality",
        title: pageTitle,
        metaDescription: metaDescription,
        hero: {
          title: heroTitle,
          tagline: heroTagline,
          badge: heroBadge,
        },
        sections: [
          {
            type: "stages",
            title: "Quality Assurance Stages",
            items: stages,
          },
          {
            type: "qa_sections",
            title: "Quality Standards & Guarantee",
            items: sectionsList,
          },
        ],
      };
      await onSave(payload);
      showToast("Quality Assurance Page saved successfully!");
    } catch (err: any) {
      showToast(err.message || "Failed to save Quality page", "error");
    } finally {
      setSaving(false);
    }
  };

  const updateStage = (index: number, field: "stage" | "title" | "desc", val: string) => {
    const next = [...stages];
    next[index] = { ...next[index], [field]: val };
    setStages(next);
  };

  const updateSection = (index: number, field: "title" | "content", val: string) => {
    const next = [...sectionsList];
    next[index] = { ...next[index], [field]: val };
    setSectionsList(next);
  };

  const addSection = () => {
    setSectionsList([
      ...sectionsList,
      {
        title: "New Quality Standard",
        content: "Describe the quality control process or guarantee here...",
      },
    ]);
  };

  const removeSection = (index: number) => {
    setSectionsList(sectionsList.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-500 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-certificate"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">
                Quality Assurance Studio
              </h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold whitespace-nowrap shrink-0">
                Route: /quality 
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Edit headline banner, 3 review stages, and quality inspection pillars.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            href="/quality"
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
            <span>{saving ? "Saving..." : "Save Quality Page"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-gray-200 scrollbar-none text-xs font-bold">
        {[
          { id: "banner", label: "1. Headline Banner", icon: "fa-heading" },
          { id: "stages", label: "2. Process Stages (3)", icon: "fa-bars-staggered" },
          { id: "sections", label: `3. QA Standards (${sectionsList.length})`, icon: "fa-circle-check" },
          { id: "seo", label: "4. SEO & Meta", icon: "fa-magnifying-glass" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? "bg-[#ff5b0a] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <i className={`fa-solid ${tab.icon}`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: BANNER */}
      {activeTab === "banner" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xs">
                <i className="fa-solid fa-heading"></i>
              </span>
              Quality Banner Header
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Top hero header badge, headline, and mission statement.
            </p>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Badge Label
            </label>
            <input
              type="text"
              value={heroBadge}
              onChange={(e) => setHeroBadge(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 outline-none shadow-sm"
              placeholder="Quality Assurance"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Headline Title
            </label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold text-sm border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 outline-none shadow-sm"
              placeholder="Our Commitment to Flawless Quality & Precision"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Commitment Tagline &amp; Overview
            </label>
            <textarea
              rows={3}
              value={heroTagline}
              onChange={(e) => setHeroTagline(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 outline-none leading-relaxed shadow-sm"
              placeholder="Consistent, high-caliber image editing..."
            />
          </div>
        </div>
      )}

      {/* TAB 2: 3 PROCESS STAGES */}
      {activeTab === "stages" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xs">
                <i className="fa-solid fa-bars-staggered"></i>
              </span>
              3-Stage Quality Process Workflow
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Configure each stage title and description of your production pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stages.map((stg, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border space-y-3 shadow-xs ${
                  idx === 0
                    ? "bg-orange-50/70 border-orange-200"
                    : idx === 1
                    ? "bg-blue-50/70 border-blue-200"
                    : "bg-emerald-50/70 border-emerald-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-black text-sm ${
                      idx === 0
                        ? "text-[#ff5b0a]"
                        : idx === 1
                        ? "text-blue-700"
                        : "text-emerald-700"
                    }`}
                  >
                    Stage {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={stg.stage || `Stage ${idx + 1}`}
                    onChange={(e) => updateStage(idx, "stage", e.target.value)}
                    className="w-24 px-2 py-1 bg-white font-mono text-[11px] font-bold border border-gray-300 rounded-lg text-center"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Stage Name
                  </label>
                  <input
                    type="text"
                    value={stg.title}
                    onChange={(e) => updateStage(idx, "title", e.target.value)}
                    className="w-full px-3 py-2 bg-white text-slate-900 font-bold text-xs border border-slate-300 rounded-xl outline-none shadow-sm"
                    placeholder="e.g. Precision Post-Production"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Stage Description
                  </label>
                  <textarea
                    rows={3}
                    value={stg.desc}
                    onChange={(e) => updateStage(idx, "desc", e.target.value)}
                    className="w-full px-3 py-2 bg-white text-slate-800 text-xs border border-slate-300 rounded-xl outline-none shadow-sm"
                    placeholder="Describe this stage..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: QA INSPECTION SECTIONS */}
      {activeTab === "sections" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xs">
                  <i className="fa-solid fa-circle-check"></i>
                </span>
                Quality Assurance Standards &amp; Guarantees
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Content cards rendered on the live Quality page (Multi-Tier QA Inspection, Calibrated IPS Displays, Zero-Cost Rework Guarantee).
              </p>
            </div>
            <button
              type="button"
              onClick={addSection}
              className="px-3.5 py-2 bg-orange-50 text-[#ff5b0a] hover:bg-orange-100 font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add Quality Pillar</span>
            </button>
          </div>

          <div className="space-y-4">
            {sectionsList.map((sec, idx) => (
              <div
                key={idx}
                className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 relative shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#ff5b0a] flex items-center gap-2">
                    <i className="fa-solid fa-shield-check"></i>
                    Quality Standard #{idx + 1}
                  </span>
                  {sectionsList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(idx)}
                      className="text-gray-400 hover:text-red-500 text-xs flex items-center gap-1"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                      <span>Delete</span>
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Standard Title
                  </label>
                  <input
                    type="text"
                    value={sec.title}
                    onChange={(e) => updateSection(idx, "title", e.target.value)}
                    className="w-full px-3.5 py-2 bg-white text-slate-900 font-bold text-sm border border-slate-300 rounded-xl focus:border-[#ff5b0a] outline-none shadow-sm"
                    placeholder="e.g. Multi-Tier QA Inspection Process"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Standard Description &amp; Details
                  </label>
                  <textarea
                    rows={3}
                    value={sec.content}
                    onChange={(e) => updateSection(idx, "content", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-normal border border-slate-300 rounded-xl focus:border-[#ff5b0a] outline-none leading-relaxed shadow-sm"
                    placeholder="Explain the technical procedures and customer guarantees..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SEO */}
      {activeTab === "seo" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xs">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              SEO &amp; Metadata
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Search engine tags for /quality and /quality
            </p>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Browser Title
            </label>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold text-sm border border-slate-300 rounded-xl focus:border-[#ff5b0a] outline-none shadow-sm"
              placeholder="Quality Assurance Commitment | SmartPHOTOeditors"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Meta Description
            </label>
            <textarea
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-normal border border-slate-300 rounded-xl focus:border-[#ff5b0a] outline-none leading-relaxed shadow-sm"
              placeholder="Meta description for search engine results..."
            />
          </div>
        </div>
      )}

      {/* Save Bottom Bar */}
      <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <i className="fa-solid fa-circle-info text-[#ff5b0a]"></i>
          <span>Updates will be published live to /quality immediately.</span>
        </div>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5b0a] to-orange-500 hover:from-[#e04f05] hover:to-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
          <span>{saving ? "Saving Changes..." : "Save Quality Page"}</span>
        </button>
      </div>
    </div>
  );
};
