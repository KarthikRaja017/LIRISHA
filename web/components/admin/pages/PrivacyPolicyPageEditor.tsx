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
  const [activeTab, setActiveTab] = useState<"banner" | "sections" | "seo">("sections");

  const [pageTitle, setPageTitle] = useState(
    page?.title || "Privacy Policy & GDPR Compliance | SmartPHOTOeditors"
  );
  const [metaDescription, setMetaDescription] = useState(
    page?.metaDescription ||
      "Privacy policy, data protection, and asset confidentiality commitments by SmartPHOTOeditors."
  );

  const [heroBadge, setHeroBadge] = useState(
    page?.hero?.badge || "Legal & Privacy"
  );
  const [heroTitle, setHeroTitle] = useState(
    page?.hero?.title || "Privacy & Data Protection Policy"
  );
  const [heroTagline, setHeroTagline] = useState(
    page?.hero?.tagline ||
      "How SmartPHOTOeditors collects, stores, and protects personal information and visual digital assets."
  );

  const defaultPolicySections = [
    {
      title: "Information We Collect",
      content:
        "We collect contact information (name, email, phone number) and visual assets solely for the purpose of fulfilling your image editing requests.",
    },
    {
      title: "No Third-Party Sharing",
      content:
        "We never sell, rent, or distribute your contact details or uploaded photographs to any third-party advertisers or external organizations.",
    },
    {
      title: "Data Retention & Automatic Purging",
      content:
        "Raw client image files are securely retained for 30 days following project completion to assist with any rework or revision requests, after which they are permanently deleted from our active production systems.",
    },
    {
      title: "Confidentiality & Non-Disclosure",
      content:
        "All our photo editing specialists sign bilateral NDAs and work in biometrically secured environments with restricted external storage devices.",
    },
  ];

  const policySection = page?.sections?.find(
    (s: any) => s.type === "policy_sections" || s.type === "sections"
  );
  // Also check if legacy single policy_text exists
  const legacyText = page?.sections?.find((s: any) => s.type === "policy_text")?.content;

  const [sectionsList, setSectionsList] = useState<any[]>(
    policySection?.items && policySection.items.length > 0
      ? policySection.items
      : legacyText
      ? [{ title: "Privacy Statement", content: legacyText }]
      : defaultPolicySections
  );

  useEffect(() => {
    if (page) {
      if (page.title) setPageTitle(page.title);
      if (page.metaDescription) setMetaDescription(page.metaDescription);
      if (page.hero?.title) setHeroTitle(page.hero.title);
      if (page.hero?.tagline) setHeroTagline(page.hero.tagline);
      if (page.hero?.badge) setHeroBadge(page.hero.badge);

      const sec = page.sections?.find(
        (s: any) => s.type === "policy_sections" || s.type === "sections"
      );
      if (sec?.items && sec.items.length > 0) {
        setSectionsList(sec.items);
      } else {
        const leg = page.sections?.find((s: any) => s.type === "policy_text")?.content;
        if (leg) {
          setSectionsList([{ title: "Privacy Statement", content: leg }]);
        }
      }
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
        hero: {
          title: heroTitle,
          tagline: heroTagline,
          badge: heroBadge,
        },
        sections: [
          {
            type: "policy_sections",
            title: "Policy Clauses",
            items: sectionsList,
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

  const updateSection = (index: number, field: "title" | "content", val: string) => {
    const next = [...sectionsList];
    next[index] = { ...next[index], [field]: val };
    setSectionsList(next);
  };

  const addSection = () => {
    setSectionsList([
      ...sectionsList,
      {
        title: "New Policy Clause",
        content: "Enter the legal terms and disclosures for this policy clause...",
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
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-600 to-slate-800 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-scale-balanced"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">
                Privacy Policy Studio
              </h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold whitespace-nowrap shrink-0">
                Route: /privacy-policy 
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Edit the legal privacy statements, data handling clauses, and compliance disclosures.
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

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-gray-200 scrollbar-none text-xs font-bold">
        {[
          { id: "sections", label: `1. Policy Clauses (${sectionsList.length})`, icon: "fa-shield-halved" },
          { id: "banner", label: "2. Headline Banner", icon: "fa-heading" },
          { id: "seo", label: "3. SEO & Meta", icon: "fa-magnifying-glass" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? "bg-slate-800 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <i className={`fa-solid ${tab.icon}`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: POLICY CLAUSES */}
      {activeTab === "sections" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs">
                  <i className="fa-solid fa-shield-halved"></i>
                </span>
                Privacy Clauses &amp; Policy Sections
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Each card represents a distinct legal policy block displayed on the live Privacy Policy page.
              </p>
            </div>
            <button
              type="button"
              onClick={addSection}
              className="px-3.5 py-2 bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add Clause</span>
            </button>
          </div>

          <div className="space-y-4">
            {sectionsList.map((sec, idx) => (
              <div
                key={idx}
                className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 relative shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-2">
                    <i className="fa-solid fa-scale-balanced text-slate-600"></i>
                    Clause #{idx + 1}
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
                    Clause Heading Title
                  </label>
                  <input
                    type="text"
                    value={sec.title}
                    onChange={(e) => updateSection(idx, "title", e.target.value)}
                    className="w-full px-3.5 py-2 bg-white text-slate-900 font-bold text-sm border border-slate-300 rounded-xl focus:border-slate-800 outline-none shadow-sm"
                    placeholder="e.g. Information We Collect"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Clause Details &amp; Legal Text
                  </label>
                  <textarea
                    rows={4}
                    value={sec.content}
                    onChange={(e) => updateSection(idx, "content", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-normal border border-slate-300 rounded-xl focus:border-slate-800 outline-none leading-relaxed shadow-sm"
                    placeholder="State the data handling principles..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BANNER */}
      {activeTab === "banner" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs">
                <i className="fa-solid fa-heading"></i>
              </span>
              Hero Banner Header
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Top badge, headline, and introductory paragraph for the Privacy Policy.
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
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-slate-800 outline-none shadow-sm"
              placeholder="Legal & Privacy"
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
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold text-sm border border-slate-300 rounded-xl focus:border-slate-800 outline-none shadow-sm"
              placeholder="Privacy & Data Protection Policy"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Introductory Description
            </label>
            <textarea
              rows={3}
              value={heroTagline}
              onChange={(e) => setHeroTagline(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-slate-800 outline-none leading-relaxed shadow-sm"
              placeholder="How SmartPHOTOeditors collects, stores, and protects personal information and visual digital assets."
            />
          </div>
        </div>
      )}

      {/* TAB 3: SEO */}
      {activeTab === "seo" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              SEO &amp; Metadata
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Search engine tags for /privacy-policy and /privacy-policy
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
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold text-sm border border-slate-300 rounded-xl focus:border-slate-800 outline-none shadow-sm"
              placeholder="Privacy Policy & GDPR Compliance | SmartPHOTOeditors"
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
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-normal border border-slate-300 rounded-xl focus:border-slate-800 outline-none leading-relaxed shadow-sm"
              placeholder="Privacy policy, data protection, and asset confidentiality commitments..."
            />
          </div>
        </div>
      )}

      {/* Save Bottom Bar */}
      <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <i className="fa-solid fa-circle-info text-[#ff5b0a]"></i>
          <span>Updates will be published live to /privacy-policy immediately.</span>
        </div>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5b0a] to-orange-500 hover:from-[#e04f05] hover:to-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
          <span>{saving ? "Saving Changes..." : "Save Privacy Policy"}</span>
        </button>
      </div>
    </div>
  );
};
