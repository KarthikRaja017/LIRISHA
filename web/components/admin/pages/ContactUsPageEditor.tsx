"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageContent, SiteSettingsMap } from "@/types/content";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";

export interface ContactLocation {
  id: string;
  title: string;
  address: string;
}

const defaultContactLocations: ContactLocation[] = [
  { id: "loc-usa", title: "USA", address: "116 Village Blvd, Suite 220, Princeton, NJ 08540" },
  { id: "loc-india", title: "INDIA", address: "No.6, Banaswadi Main Road, Dodda Banaswadi, Bangalore - 560 043" },
  { id: "loc-phil", title: "PHILIPPINES", address: "Aeon Towers, J.P. Laurel Avenue, Bajada, Davao City 8000" },
];

interface ContactUsPageEditorProps {
  page?: PageContent;
  siteSettings?: SiteSettingsMap;
  onSave: (updatedPage: PageContent) => Promise<void>;
  onSaveSettings?: (settingsPayload: Record<string, string>) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const ContactUsPageEditor: React.FC<ContactUsPageEditorProps> = ({
  page,
  siteSettings,
  onSave,
  onSaveSettings,
  showToast,
}) => {
  const [saving, setSaving] = useState(false);

  const [pageTitle, setPageTitle] = useState(
    page?.title || "Contact Us | LIRISHA"
  );
  const [metaDescription, setMetaDescription] = useState(
    page?.metaDescription ||
      "Get in touch with LIRISHA for professional image editing requests, free sample trials, and custom quote inquiries."
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
    page?.hero?.image || "/images/banner-contact-us.webp"
  );

  // Contact Info
  const contactSection = page?.sections?.find((s: any) => s.type === "contact_info");
  const [phone, setPhone] = useState(
    contactSection?.phone ||
      siteSettings?.contact_phone?.value ||
      "1-855-695-6028"
  );
  const [email, setEmail] = useState(
    contactSection?.email ||
      siteSettings?.contact_email?.value ||
      "info@smartphotoeditors.com"
  );
  const [address, setAddress] = useState(
    contactSection?.address || "116 Village Blvd, Suite 220, Princeton, NJ 08540"
  );
  const [hours, setHours] = useState(
    contactSection?.hours || "24 Hours / 7 Days a Week Support"
  );
  const [mapEmbedUrl, setMapEmbedUrl] = useState(
    contactSection?.mapEmbedUrl ||
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15549.385111286761!2d77.661375!3d13.013607!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae114392e8f37f%3A0x8f482cafd65ddd13!2sSmart%20Photo%20Edits!5e0!3m2!1sen!2sin!4v1711539891005!5m2!1sen!2sin"
  );

  // Quote & Inquiry Form Settings
  const quoteSec = page?.sections?.find((s: any) => s.type === "quote_form" || s.type === "inquiry_form");
  const [quoteBadge, setQuoteBadge] = useState(quoteSec?.badge || "Direct Inquiry Form");
  const [quoteTitle, setQuoteTitle] = useState(quoteSec?.title || "Request a Custom Quote or Free Trial");
  const [quoteSubtitle, setQuoteSubtitle] = useState(
    quoteSec?.subtitle ||
      "Tell us about your project volume, styling expectations, or submit sample photos for instant evaluation."
  );
  const [quoteButtonText, setQuoteButtonText] = useState(quoteSec?.buttonText || "Submit Request & Get Free Quote");
  const [quoteSuccessTitle, setQuoteSuccessTitle] = useState(quoteSec?.successTitle || "Inquiry Received Successfully!");
  const [quoteSuccessMessage, setQuoteSuccessMessage] = useState(
    quoteSec?.successMessage ||
      "Thank you for contacting LIRISHA. A dedicated account manager and senior retouching supervisor will review your project and get back to you within one business day."
  );

  // Locations Manager
  const [locations, setLocations] = useState<ContactLocation[]>(() => {
    if (contactSection?.locations && Array.isArray(contactSection.locations) && contactSection.locations.length > 0) {
      return contactSection.locations;
    }
    if (siteSettings?.footer_locations_json?.value) {
      try {
        const parsed = JSON.parse(siteSettings.footer_locations_json.value);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return defaultContactLocations;
  });

  const [newLocTitle, setNewLocTitle] = useState("");
  const [newLocAddress, setNewLocAddress] = useState("");
  const [isAddingLocation, setIsAddingLocation] = useState(false);

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
        if (c.mapEmbedUrl) setMapEmbedUrl(c.mapEmbedUrl);
        if (c.locations && Array.isArray(c.locations) && c.locations.length > 0) {
          setLocations(c.locations);
        }
      }

      const q = page.sections?.find((sec: any) => sec.type === "quote_form" || sec.type === "inquiry_form");
      if (q) {
        if (q.badge) setQuoteBadge(q.badge);
        if (q.title) setQuoteTitle(q.title);
        if (q.subtitle) setQuoteSubtitle(q.subtitle);
        if (q.buttonText) setQuoteButtonText(q.buttonText);
        if (q.successTitle) setQuoteSuccessTitle(q.successTitle);
        if (q.successMessage) setQuoteSuccessMessage(q.successMessage);
      }
    }
  }, [page]);

  const handleDeleteLocation = (id: string) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
    showToast("Location removed. Click 'Save Contact Page' to publish changes.");
  };

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocTitle.trim() || !newLocAddress.trim()) {
      showToast("Please enter both location name and address", "error");
      return;
    }

    const newLoc: ContactLocation = {
      id: `loc-${Date.now()}`,
      title: newLocTitle.trim(),
      address: newLocAddress.trim(),
    };

    setLocations((prev) => [...prev, newLoc]);
    setNewLocTitle("");
    setNewLocAddress("");
    setIsAddingLocation(false);
    showToast(`Added '${newLoc.title}'. Click 'Save Contact Page' to persist.`);
  };

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
            mapEmbedUrl: mapEmbedUrl,
            locations: locations,
          },
          {
            type: "quote_form",
            badge: quoteBadge,
            title: quoteTitle,
            subtitle: quoteSubtitle,
            buttonText: quoteButtonText,
            successTitle: quoteSuccessTitle,
            successMessage: quoteSuccessMessage,
          },
        ],
      };

      // 1. Save Page Content in Database
      await onSave(payload);

      // 2. Also synchronize site settings if handler is provided
      if (onSaveSettings) {
        await onSaveSettings({
          contact_phone: phone,
          contact_email: email,
          footer_locations_json: JSON.stringify(locations),
        });
      }

      showToast("Contact Us page and locations published successfully!");
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
              Manage live phone numbers, support emails, office locations, and Google Map embeds.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            href="/contact-us"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[#1265E8]"></i>
            <span>View Live Page</span>
          </Link>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C8F8] to-[#1265E8] hover:opacity-95 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
          >
            <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
            <span>{saving ? "Saving Changes..." : "Save Contact Page"}</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 text-xs">
        {/* SECTION 1: HERO BANNER */}
        <div className="space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#1265E8] flex items-center justify-center text-xs font-black">1</span>
            <h3 className="text-base font-extrabold text-slate-900">Hero Banner Configuration</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                <i className="fa-solid fa-heading text-[#1265E8] mr-1.5"></i>
                Banner Headline
              </label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                placeholder="Contact Us"
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-bold text-sm border border-slate-200 rounded-xl focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/10 shadow-sm outline-none transition-all"
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
                placeholder="Get in touch with photo editing specialists..."
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-semibold border border-slate-200 rounded-xl focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/10 shadow-sm outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <i className="fa-regular fa-image text-[#1265E8]"></i>
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
              className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-semibold border border-slate-200 rounded-xl focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/10 shadow-sm outline-none transition-all"
            />
          </div>
        </div>

        {/* SECTION 2: CORPORATE CONTACT DETAILS */}
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#1265E8] flex items-center justify-center text-xs font-black">2</span>
            <h3 className="text-base font-extrabold text-slate-900">Direct Contact Numbers &amp; Email</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                <i className="fa-solid fa-phone text-blue-500 mr-1.5"></i>
                Inquiry Phone Number (Appears in Banner &amp; Header)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="1-855-695-6028"
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-bold border border-slate-200 rounded-xl focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/10 shadow-sm outline-none transition-all"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                <i className="fa-solid fa-envelope text-emerald-500 mr-1.5"></i>
                Client Support Email (Click-to-Copy)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@smartphotoeditors.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-bold border border-slate-200 rounded-xl focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/10 shadow-sm outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                <i className="fa-solid fa-clock text-amber-500 mr-1.5"></i>
                Production Shift Hours
              </label>
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="24 Hours / 7 Days a Week Support"
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-semibold border border-slate-200 rounded-xl focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/10 shadow-sm outline-none transition-all"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                <i className="fa-solid fa-location-dot text-rose-500 mr-1.5"></i>
                Primary Headquarters Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="116 Village Blvd, Suite 220, Princeton, NJ 08540"
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-semibold border border-slate-200 rounded-xl focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/10 shadow-sm outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: DYNAMIC OFFICE LOCATIONS */}
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#1265E8] flex items-center justify-center text-xs font-black">3</span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Global Office Locations ({locations.length})
                </h3>
                <p className="text-[11px] text-slate-500">
                  Delete international locations to keep only your primary office, or add new branches.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAddingLocation(!isAddingLocation)}
              className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-[#1265E8] border border-blue-200 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all self-start sm:self-auto"
            >
              <i className={`fa-solid ${isAddingLocation ? "fa-minus" : "fa-plus"}`}></i>
              <span>{isAddingLocation ? "Cancel" : "Add Office Location"}</span>
            </button>
          </div>

          {/* Add Location Card */}
          {isAddingLocation && (
            <form onSubmit={handleAddLocation} className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3">
              <span className="font-bold text-blue-900 block">Add New Office Location</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Country / Branch Name</label>
                  <input
                    type="text"
                    placeholder="e.g. United States or Bangalore HQ"
                    value={newLocTitle}
                    onChange={(e) => setNewLocTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-white text-slate-900 font-semibold border border-blue-200 rounded-xl outline-none focus:border-[#1265E8]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Complete Street Address</label>
                  <input
                    type="text"
                    placeholder="e.g. 116 Village Blvd, Suite 220, Princeton, NJ 08540"
                    value={newLocAddress}
                    onChange={(e) => setNewLocAddress(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-white text-slate-900 font-semibold border border-blue-200 rounded-xl outline-none focus:border-[#1265E8]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingLocation(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#1265E8] hover:bg-[#0F3E99] text-white font-bold text-xs shadow-sm"
                >
                  Confirm &amp; Add
                </button>
              </div>
            </form>
          )}

          {/* Locations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between space-y-2 group hover:border-blue-400 hover:bg-white transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 uppercase tracking-wider text-xs">
                      {loc.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteLocation(loc.id)}
                      className="w-7 h-7 rounded-lg text-rose-500 hover:bg-rose-100 flex items-center justify-center transition-colors"
                      title={`Delete ${loc.title}`}
                    >
                      <i className="fa-regular fa-trash-can text-xs"></i>
                    </button>
                  </div>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed">{loc.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: GOOGLE MAPS EMBED */}
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#1265E8] flex items-center justify-center text-xs font-black">4</span>
            <h3 className="text-base font-extrabold text-slate-900">Google Map Embed Configuration</h3>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              <i className="fa-solid fa-map-location-dot text-[#1265E8] mr-1.5"></i>
              Google Map Embed Iframe URL (src attribute)
            </label>
            <input
              type="text"
              value={mapEmbedUrl}
              onChange={(e) => setMapEmbedUrl(e.target.value)}
              placeholder="https://www.google.com/maps/embed?..."
              className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-mono text-[11px] border border-slate-200 rounded-xl focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/10 shadow-sm outline-none transition-all"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Tip: Go to Google Maps $\rightarrow$ Share $\rightarrow$ Embed a map $\rightarrow$ copy only the URL inside <code>src=&quot;...&quot;</code>.
            </p>
          </div>
        </div>

        {/* SECTION 4.5: QUOTE & INQUIRY FORM STUDIO */}
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#1265E8] flex items-center justify-center text-xs font-black">5</span>
            <h3 className="text-base font-extrabold text-slate-900">Quote & Free Trial Form Controls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Quote Form Badge</label>
              <input
                type="text"
                value={quoteBadge}
                onChange={(e) => setQuoteBadge(e.target.value)}
                placeholder="Direct Inquiry Form"
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-bold border border-slate-200 rounded-xl focus:border-[#1265E8] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Quote Form Heading</label>
              <input
                type="text"
                value={quoteTitle}
                onChange={(e) => setQuoteTitle(e.target.value)}
                placeholder="Request a Custom Quote or Free Trial"
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-bold border border-slate-200 rounded-xl focus:border-[#1265E8] outline-none transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold text-slate-800 mb-1.5">Quote Form Subheading</label>
              <textarea
                rows={2}
                value={quoteSubtitle}
                onChange={(e) => setQuoteSubtitle(e.target.value)}
                placeholder="Tell us about your project volume..."
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-medium border border-slate-200 rounded-xl focus:border-[#1265E8] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Submit Button Label</label>
              <input
                type="text"
                value={quoteButtonText}
                onChange={(e) => setQuoteButtonText(e.target.value)}
                placeholder="Submit Request & Get Free Quote"
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-bold border border-slate-200 rounded-xl focus:border-[#1265E8] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Submission Success Heading</label>
              <input
                type="text"
                value={quoteSuccessTitle}
                onChange={(e) => setQuoteSuccessTitle(e.target.value)}
                placeholder="Inquiry Received Successfully!"
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-bold border border-slate-200 rounded-xl focus:border-[#1265E8] outline-none transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold text-slate-800 mb-1.5">Submission Success Message</label>
              <textarea
                rows={2}
                value={quoteSuccessMessage}
                onChange={(e) => setQuoteSuccessMessage(e.target.value)}
                placeholder="Thank you for contacting LIRISHA..."
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-medium border border-slate-200 rounded-xl focus:border-[#1265E8] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* SECTION 6: SEO TAGS */}
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#1265E8] flex items-center justify-center text-xs font-black">5</span>
            <h3 className="text-base font-extrabold text-slate-900">SEO Meta Tags</h3>
          </div>
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">Page Title</label>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-bold border border-slate-200 rounded-xl focus:border-[#1265E8] shadow-sm outline-none transition-all"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-800 mb-1.5">Meta Description</label>
            <textarea
              rows={2}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white text-slate-900 font-medium border border-slate-200 rounded-xl focus:border-[#1265E8] shadow-sm outline-none leading-relaxed transition-all"
            />
          </div>
        </div>
      </div>

      {/* Save Bar */}
      <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <i className="fa-solid fa-circle-check text-emerald-500 text-sm"></i>
          <span>Save your changes to publish updated contact details live to `/contact-us`.</span>
        </div>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C8F8] to-[#1265E8] hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
          <span>{saving ? "Saving Changes..." : "Save Contact Page"}</span>
        </button>
      </div>
    </div>
  );
};
