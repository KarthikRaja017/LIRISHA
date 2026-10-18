"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageContent } from "@/types/content";

interface PrivacyPolicyPageEditorProps {
  page?: PageContent;
  onSave: (updatedPage: PageContent) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const PrivacyPolicyPageEditor: React.FC<PrivacyPolicyPageEditorProps> = ({
  page,
  onSave,
  showToast,
}) => {
  const [saving, setSaving] = useState(false);
  const [pageTitle, setPageTitle] = useState(
    page?.title || "Privacy Policy | SmartPHOTOeditors"
  );
  const [metaDescription, setMetaDescription] = useState(
    page?.metaDescription ||
      "Learn how SmartPHOTOeditors collects, processes, and protects your personal and commercial image data."
  );

  const policySection = page?.sections?.find((s: any) => s.type === "policy_text");
  const [policyText, setPolicyText] = useState(
    policySection?.content ||
      "SmartPHOTOeditors (SPE) respects the privacy of our clients and website visitors. We are committed to protecting all personal information, commercial photographs, raw capture files, and proprietary digital assets entrusted to us. We never sell, rent, or distribute client images or data to third parties."
  );

  useEffect(() => {
    if (page) {
      if (page.title) setPageTitle(page.title);
      if (page.metaDescription) setMetaDescription(page.metaDescription);
      const sec = page.sections?.find((s: any) => s.type === "policy_text");
      if (sec?.content) setPolicyText(sec.content);
    }
  }, [page]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload: PageContent = {
        slug: "privacy-policy",
        title: pageTitle,
        metaDescription: metaDescription,
        sections: [
          {
            type: "policy_text",
            content: policyText,
          },
        ],
      };
      await onSave(payload);
      showToast("Privacy Policy Page saved successfully!");
    } catch (err: any) {
      showToast(err.message || "Failed to save Privacy Policy", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-600 to-slate-800 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-scale-balanced"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">Privacy Policy Studio</h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold whitespace-nowrap shrink-0">
                Route: /privacy-policy
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Control the legal privacy statement, cookie policies, and data processing disclosures.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            href="/privacy-policy"
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
            <span>{saving ? "Saving..." : "Save Privacy Policy"}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
        <div className="border-b pb-4">
          <h3 className="text-base font-bold text-gray-900">Privacy Policy Statement</h3>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
            <i className="fa-solid fa-heading text-[#ff5b0a]"></i> Page Title (Browser & Header)
          </label>
          <input
            type="text"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-bold text-slate-900 text-sm focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 shadow-sm transition-all"
            placeholder="Privacy Policy | SmartPHOTOeditors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-file-shield text-[#ff5b0a]"></i> Policy Terms & Conditions
            </span>
            <span className="text-[11px] font-medium text-slate-500">Supports Markdown / Plain text</span>
          </label>
          <textarea
            rows={12}
            value={policyText}
            onChange={(e) => setPolicyText(e.target.value)}
            className="w-full p-4 bg-white border-2 border-slate-300 rounded-xl font-medium text-slate-900 text-sm leading-relaxed focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 shadow-sm transition-all"
            placeholder="Enter privacy policy text and clauses here..."
          />
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
        <span className="text-xs text-slate-500 font-medium">Changes will be visible to users immediately upon saving.</span>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
          <span>{saving ? "Saving Changes..." : "Save Privacy Policy"}</span>
        </button>
      </div>
    </div>
  );
};
