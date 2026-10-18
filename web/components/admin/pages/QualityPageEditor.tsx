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
  const [pageTitle, setPageTitle] = useState(
    page?.title || "Quality Assurance | SmartPHOTOeditors"
  );
  const [metaDescription, setMetaDescription] = useState(
    page?.metaDescription ||
      "Learn about our 3-tier quality control process guaranteeing flawless images."
  );

  const [heroTitle, setHeroTitle] = useState(
    page?.hero?.title || "Uncompromising Quality Control"
  );
  const [heroTagline, setHeroTagline] = useState(
    page?.hero?.tagline ||
      "Every image undergoes multi-stage senior artist inspection and precision pixel verification."
  );

  useEffect(() => {
    if (page) {
      if (page.title) setPageTitle(page.title);
      if (page.metaDescription) setMetaDescription(page.metaDescription);
      if (page.hero?.title) setHeroTitle(page.hero.title);
      if (page.hero?.tagline) setHeroTagline(page.hero.tagline);
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
        },
        sections: page?.sections || [],
      };
      await onSave(payload);
      showToast("Quality Assurance Page saved successfully!");
    } catch (err: any) {
      showToast(err.message || "Failed to save Quality page", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-500 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-certificate"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">Quality Assurance Studio</h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold whitespace-nowrap shrink-0">
                Route: /quality
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Control quality assurance process steps, Adobe certification standards, and guarantees.
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

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs">
        <div className="border-b border-slate-100 pb-5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-certificate"></i>
            </span>
            <h3 className="text-base font-extrabold text-slate-900">Quality Control Banner & Workflow</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">Control quality assurance process steps, Adobe certification standards, and guarantees.</p>
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
            Quality Commitment Tagline
          </label>
          <textarea
            rows={3}
            value={heroTagline}
            onChange={(e) => setHeroTagline(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 bg-orange-50/70 border border-orange-200 rounded-2xl space-y-1.5 shadow-xs">
            <span className="font-black text-sm text-[#ff5b0a]">Stage 1</span>
            <p className="font-bold text-slate-900 text-xs">Precision Post-Production</p>
            <p className="text-slate-600 text-[11px]">Primary edit by specialized Adobe certified artists.</p>
          </div>
          <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-1.5 shadow-xs">
            <span className="font-black text-sm text-blue-700">Stage 2</span>
            <p className="font-bold text-slate-900 text-xs">Peer Review Audit</p>
            <p className="text-slate-600 text-[11px]">Senior supervisor checks color calibration and edge masking.</p>
          </div>
          <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1.5 shadow-xs">
            <span className="font-black text-sm text-emerald-700">Stage 3</span>
            <p className="font-bold text-slate-900 text-xs">Final QC Release</p>
            <p className="text-slate-600 text-[11px]">Format, metadata, and pixel resolution verified before delivery.</p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-5 space-y-3">
          <label className="block font-bold text-slate-800 mb-1.5">
            <i className="fa-solid fa-magnifying-glass text-[#ff5b0a] mr-1.5"></i>
            SEO Meta Description
          </label>
          <textarea
            rows={2}
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
          />
        </div>
      </div>

      <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <i className="fa-solid fa-circle-info text-[#ff5b0a]"></i>
          <span>Updates will be published live immediately.</span>
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
