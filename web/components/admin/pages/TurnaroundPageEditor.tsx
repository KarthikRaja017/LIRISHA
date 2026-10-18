"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageContent } from "@/types/content";

interface TurnaroundPageEditorProps {
  page?: PageContent;
  onSave: (updatedPage: PageContent) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const TurnaroundPageEditor: React.FC<TurnaroundPageEditorProps> = ({
  page,
  onSave,
  showToast,
}) => {
  const [saving, setSaving] = useState(false);
  const [pageTitle, setPageTitle] = useState(
    page?.title || "Turnaround Times | SmartPHOTOeditors"
  );
  const [metaDescription, setMetaDescription] = useState(
    page?.metaDescription ||
      "Fast 12-24 hour turnaround times with 24/7 global production shifts."
  );

  const [heroTitle, setHeroTitle] = useState(
    page?.hero?.title || "Rapid 12 - 24 Hour Turnaround"
  );
  const [heroTagline, setHeroTagline] = useState(
    page?.hero?.tagline ||
      "Round-the-clock operations ensure your deadlines are met consistently across timezones."
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
        slug: "turnaround-time",
        title: pageTitle,
        metaDescription: metaDescription,
        hero: {
          title: heroTitle,
          tagline: heroTagline,
        },
        sections: page?.sections || [],
      };
      await onSave(payload);
      showToast("Turnaround Time Page saved successfully!");
    } catch (err: any) {
      showToast(err.message || "Failed to save Turnaround page", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-clock"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">Turnaround Time Page Studio</h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-bold whitespace-nowrap shrink-0">
                Route: /turnaround-time
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Manage delivery SLA guarantees, shift coverages, and rush deadlines.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            href="/turnaround-time"
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
            <span>{saving ? "Saving..." : "Save Turnaround Page"}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs">
        <div className="border-b border-slate-100 pb-5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-clock"></i>
            </span>
            <h3 className="text-base font-extrabold text-slate-900">Hero Banner & SLA Assurances</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">Configure delivery speed guarantees and shift SLA messaging.</p>
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
            Tagline / SLA Overview
          </label>
          <textarea
            rows={3}
            value={heroTagline}
            onChange={(e) => setHeroTagline(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 bg-orange-50/70 border border-orange-200 rounded-2xl shadow-xs">
            <span className="font-black text-base text-[#ff5b0a]">12 Hours</span>
            <p className="text-xs text-slate-800 font-bold mt-1">Express Rush Delivery</p>
            <p className="text-[11px] text-slate-600 mt-1">For urgent editorial and high-priority retail shoots.</p>
          </div>
          <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl shadow-xs">
            <span className="font-black text-base text-blue-700">24 Hours</span>
            <p className="text-xs text-slate-800 font-bold mt-1">Standard Production SLA</p>
            <p className="text-[11px] text-slate-600 mt-1">Guaranteed default for studio headshots and clipping.</p>
          </div>
          <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl shadow-xs">
            <span className="font-black text-base text-emerald-700">48 Hours</span>
            <p className="text-xs text-slate-800 font-bold mt-1">Large Volume Batches</p>
            <p className="text-[11px] text-slate-600 mt-1">Overnight turnaround on catalog orders exceeding 500+ assets.</p>
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
          <span>Updates will be immediately available on the live website.</span>
        </div>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5b0a] to-orange-500 hover:from-[#e04f05] hover:to-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
          <span>{saving ? "Saving Changes..." : "Save Turnaround Page"}</span>
        </button>
      </div>
    </div>
  );
};
