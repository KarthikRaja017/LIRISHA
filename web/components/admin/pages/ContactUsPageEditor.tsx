"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageContent } from "@/types/content";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";

interface ContactUsPageEditorProps {
  page?: PageContent;
  onSave: (updatedPage: PageContent) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const ContactUsPageEditor: React.FC<ContactUsPageEditorProps> = ({
  page,
  onSave,
  showToast,
}) => {
  const [saving, setSaving] = useState(false);

  const [pageTitle, setPageTitle] = useState(
    page?.title || "Contact Us | SmartPHOTOeditors"
  );
  const [metaDescription, setMetaDescription] = useState(
    page?.metaDescription ||
      "Get in touch with SmartPHOTOeditors for image editing requests, free sample trials, and custom quote inquiries."
  );

  // Hero
  const [heroTitle, setHeroTitle] = useState(
    page?.hero?.title || "Get in Touch with Photo Editing Experts"
  );
  const [heroTagline, setHeroTagline] = useState(
    page?.hero?.tagline ||
      "Fast, 24/7 client response, free trials, and bespoke enterprise proposals."
  );
  const [heroImage, setHeroImage] = useState(
    page?.hero?.image || "/images/contact/contact-banner.webp"
  );

  // Contact Info
  const contactSection = page?.sections?.find((s: any) => s.type === "contact_info");
  const [phone, setPhone] = useState(contactSection?.phone || "+1 (855) 729-1549");
  const [email, setEmail] = useState(contactSection?.email || "info@smartphotoeditors.com");
  const [address, setAddress] = useState(
    contactSection?.address || "SmartPHOTOeditors, High-Precision Visual Post-Production Hub"
  );
  const [hours, setHours] = useState(
    contactSection?.hours || "24 Hours / 7 Days a Week Support"
  );

  useEffect(() => {
    if (page) {
      if (page.title) setPageTitle(page.title);
      if (page.metaDescription) setMetaDescription(page.metaDescription);
      if (page.hero?.title) setHeroTitle(page.hero.title);
      if (page.hero?.tagline) setHeroTagline(page.hero.tagline);
      if (page.hero?.image) setHeroImage(page.hero.image);

      const c = page.sections?.find((sec: any) => sec.type === "contact_info");
      if (c) {
        if (c.phone) setPhone(c.phone);
        if (c.email) setEmail(c.email);
        if (c.address) setAddress(c.address);
        if (c.hours) setHours(c.hours);
      }
    }
  }, [page]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload: PageContent = {
        slug: "contact-us",
        title: pageTitle,
        metaDescription: metaDescription,
        hero: {
          title: heroTitle,
          tagline: heroTagline,
          image: heroImage,
        },
        sections: [
          {
            type: "contact_info",
            phone: phone,
            email: email,
            address: address,
            hours: hours,
          },
        ],
      };

      await onSave(payload);
      showToast("Contact Us Page saved successfully!");
    } catch (err: any) {
      showToast(err.message || "Failed to save Contact Us page", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">Contact Us Page Studio</h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold whitespace-nowrap shrink-0">
                Route: /contact-us
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Control phone numbers, inquiry emails, support shifts, and office location details.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            href="/contact-us"
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
            <span>{saving ? "Saving Changes..." : "Save Contact Page"}</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs">
        <div className="border-b border-slate-100 pb-5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">1</span>
            <h3 className="text-base font-extrabold text-slate-900">Hero Banner Settings</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              <i className="fa-solid fa-heading text-[#ff5b0a] mr-1.5"></i>
              Banner Title
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
              Banner Tagline
            </label>
            <input
              type="text"
              value={heroTagline}
              onChange={(e) => setHeroTagline(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <i className="fa-regular fa-image text-[#ff5b0a]"></i>
              Banner Image URL
            </label>
            <ImageUploadButton
              folder="contact"
              label="Upload Banner"
              currentValue={heroImage}
              onUploadSuccess={(url) => {
                setHeroImage(url);
                showToast("Contact banner uploaded!");
              }}
            />
          </div>
          <input
            type="text"
            value={heroImage}
            onChange={(e) => setHeroImage(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
          />
        </div>

        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">2</span>
            <h3 className="text-base font-extrabold text-slate-900">Corporate Contact Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                <i className="fa-solid fa-phone text-blue-500 mr-1.5"></i>
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                <i className="fa-solid fa-envelope text-emerald-500 mr-1.5"></i>
                Support Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                <i className="fa-solid fa-location-dot text-rose-500 mr-1.5"></i>
                Office Location / Address
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                <i className="fa-solid fa-clock text-amber-500 mr-1.5"></i>
                Production Shift Hours
              </label>
              <textarea
                rows={2}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">3</span>
            <h3 className="text-base font-extrabold text-slate-900">SEO Meta Tags</h3>
          </div>
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">Page Title</label>
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
              rows={2}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
            />
          </div>
        </div>
      </div>

      {/* Save Bar */}
      <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <i className="fa-solid fa-circle-info text-[#ff5b0a]"></i>
          <span>Save your changes to publish updated contact details live.</span>
        </div>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5b0a] to-orange-500 hover:from-[#e04f05] hover:to-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
          <span>{saving ? "Saving Changes..." : "Save Contact Page"}</span>
        </button>
      </div>
    </div>
  );
};
