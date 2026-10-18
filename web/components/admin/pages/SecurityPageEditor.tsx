"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageContent } from "@/types/content";

interface SecurityPageEditorProps {
  page?: PageContent;
  onSave: (updatedPage: PageContent) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const SecurityPageEditor: React.FC<SecurityPageEditorProps> = ({
  page,
  onSave,
  showToast,
}) => {
  const [saving, setSaving] = useState(false);
  const [pageTitle, setPageTitle] = useState(
    page?.title || "Enterprise Data Security & Confidentiality | SmartPHOTOeditors"
  );
  const [metaDescription, setMetaDescription] = useState(
    page?.metaDescription ||
      "At SmartPHOTOeditors, we uphold strict information security management standards to safeguard our clients intellectual property and digital visual assets."
  );

  const [heroTitle, setHeroTitle] = useState(
    page?.hero?.title || "Enterprise Data Security & Confidentiality"
  );
  const [heroTagline, setHeroTagline] = useState(
    page?.hero?.tagline ||
      "Strict NDAs, 256-bit SSL encryption, and air-gapped terminals protecting your visual assets."
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
        slug: "security",
        title: pageTitle,
        metaDescription: metaDescription,
        hero: {
          title: heroTitle,
          tagline: heroTagline,
        },
        sections: page?.sections || [],
      };
      await onSave(payload);
      showToast("Security Page saved successfully!");
    } catch (err: any) {
      showToast(err.message || "Failed to save Security page", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-900 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">Security & Compliance Studio</h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold whitespace-nowrap shrink-0">
                Route: /security
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Control NDA disclosures, data security protocols, and software compliance standards.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            href="/security"
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
            <span>{saving ? "Saving..." : "Save Security Page"}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
        <div className="border-b pb-4">
          <h3 className="text-base font-bold text-gray-900">Hero Banner & Security Assurances</h3>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
            <i className="fa-solid fa-heading text-[#ff5b0a]"></i> Headline Title
          </label>
          <input
            type="text"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-bold text-slate-900 text-sm focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 shadow-sm transition-all"
            placeholder="Enterprise Data Security & Confidentiality"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
            <i className="fa-solid fa-align-left text-[#ff5b0a]"></i> Security Commitment Tagline
          </label>
          <textarea
            rows={3}
            value={heroTagline}
            onChange={(e) => setHeroTagline(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-medium text-slate-900 text-sm leading-relaxed focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 shadow-sm transition-all"
            placeholder="Strict NDAs, 256-bit SSL encryption..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
            <p className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <span className="w-7 h-7 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xs">
                <i className="fa-solid fa-file-contract"></i>
              </span>
              Bilateral NDAs
            </p>
            <p className="text-slate-600 text-xs font-medium pl-9">Strict legal non-disclosure agreements signed prior to project commencement.</p>
          </div>
          <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
            <p className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">
                <i className="fa-solid fa-lock"></i>
              </span>
              256-Bit SSL Transfer
            </p>
            <p className="text-slate-600 text-xs font-medium pl-9">Encrypted SFTP tunnels, FTPS, and AWS S3 private sovereign storage buckets.</p>
          </div>
          <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
            <p className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                <i className="fa-solid fa-fingerprint"></i>
              </span>
              Biometric Facility
            </p>
            <p className="text-slate-600 text-xs font-medium pl-9">Restricted terminal access with USB and removable storage ports physically disabled.</p>
          </div>
          <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
            <p className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-xs">
                <i className="fa-solid fa-clock-rotate-left"></i>
              </span>
              30-Day Purge
            </p>
            <p className="text-slate-600 text-xs font-medium pl-9">Automatic server purging of completed raw and PSD assets upon sign-off.</p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-5 space-y-3">
          <label className="block text-xs font-bold text-slate-900 flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass text-[#ff5b0a]"></i> SEO Meta Description
          </label>
          <textarea
            rows={2}
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-medium text-slate-900 text-sm focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 shadow-sm transition-all"
            placeholder="Meta description for search engines..."
          />
        </div>
      </div>

      <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">Save your changes to update security information across the platform.</span>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
          <span>{saving ? "Saving Changes..." : "Save Security Page"}</span>
        </button>
      </div>
    </div>
  );
};
