"use client";

import React, { useState, useEffect } from "react";
import { SiteSettingsMap } from "@/types/content";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";

export interface FooterLocation {
  id: string;
  title: string;
  address: string;
}

export interface FooterLinkItem {
  id: string;
  label: string;
  url: string;
}

interface FooterEditorProps {
  siteSettings: SiteSettingsMap;
  onSaveSettings: (settingsPayload: Record<string, string>) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

const defaultLocations: FooterLocation[] = [
  { id: "loc-usa", title: "USA", address: "116 Village Blvd, Suite 220, Princeton, NJ 08540" },
  { id: "loc-india", title: "India", address: "No.6, Banaswadi Main Road, Dodda Banaswadi, Bangalore - 560 043" },
  { id: "loc-phil", title: "Philippines", address: "Aeon Towers, J.P. Laurel Avenue, Bajada, Davao 8000" },
];

const defaultQuickLinks: FooterLinkItem[] = [
  { id: "ql-1", label: "Services", url: "/services" },
  { id: "ql-2", label: "Resources", url: "/resources" },
  { id: "ql-3", label: "About Us", url: '/about-us' },
  { id: "ql-4", label: "Contact Us", url: '/contact-us' },
  { id: "ql-5", label: "Portfolio", url: '/sample-images' },
  { id: "ql-6", label: "Blog", url: '/blog' },
  { id: "ql-7", label: "Sitemap", url: '/sitemap' },
  { id: "ql-8", label: "Case Studies", url: '/case-study' },
  { id: "ql-9", label: "Resource Articles", url: '/articles' },
  { id: "ql-10", label: "Accessories", url: '/accessories' },
  { id: "ql-11", label: "Testimonials", url: '/testimonials' },
  { id: "ql-12", label: "Privacy Policy", url: '/privacy-policy' },
];

const defaultFeatureLinks: FooterLinkItem[] = [
  { id: "fl-1", label: "Security", url: '/security' },
  { id: "fl-2", label: "Quality", url: '/quality' },
  { id: "fl-3", label: "24/7 Coverage", url: '/247-coverage' },
  { id: "fl-4", label: "Pricing", url: '/pricing' },
  { id: "fl-5", label: "Benefits", url: '/benefits' },
  { id: "fl-6", label: "Quick Delivery", url: '/turnaround-time' },
  { id: "fl-7", label: "100% Compliance Software", url: '/compliant-software' },
  { id: "fl-8", label: "Adobe specialized artists", url: '/adobe-specialized-artists' },
  { id: "fl-9", label: "Sitemap", url: '/sitemap' },
  { id: "fl-10", label: "Glossary", url: '/glossary' },
];

export const FooterEditor: React.FC<FooterEditorProps> = ({
  siteSettings,
  onSaveSettings,
  showToast,
}) => {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"brand" | "addresses" | "contact" | "links" | "social">("brand");

  // Helper to extract setting value with fallback
  const getInitial = (key: string, fallback: string = "") => {
    return siteSettings[key]?.value !== undefined ? siteSettings[key].value : fallback;
  };

  // 1. Brand & Logo
  const [footerLogo, setFooterLogo] = useState(
    getInitial("site_footer_logo", "/images/lirisha-camera-logo.png")
  );
  const [brandDesc, setBrandDesc] = useState(
    getInitial(
      "footer_brand_desc",
      "LIRISHA is a team of skilled photo editing specialists with a commitment to providing quality, excellence, and satisfaction."
    )
  );

  // 2. Dynamic Locations
  const parseInitialLocations = (): FooterLocation[] => {
    const raw = siteSettings["footer_locations_json"]?.value;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error("Failed to parse footer_locations_json", e);
      }
    }
    // Fallback to legacy fields
    const usa = getInitial("footer_address_usa", "116 Village Blvd, Suite 220, Princeton, NJ 08540");
    const usaT = getInitial("footer_address_usa_title", "USA");
    const ind = getInitial("footer_address_india", "No.6, Banaswadi Main Road, Dodda Banaswadi, Bangalore - 560 043");
    const indT = getInitial("footer_address_india_title", "India");
    const ph = getInitial("footer_address_philippines", "Aeon Towers, J.P. Laurel Avenue, Bajada, Davao 8000");
    const phT = getInitial("footer_address_philippines_title", "Philippines");

    const locs: FooterLocation[] = [];
    if (usa) locs.push({ id: "loc-usa", title: usaT, address: usa });
    if (ind) locs.push({ id: "loc-india", title: indT, address: ind });
    if (ph) locs.push({ id: "loc-phil", title: phT, address: ph });
    return locs.length > 0 ? locs : defaultLocations;
  };

  const [locations, setLocations] = useState<FooterLocation[]>(parseInitialLocations);

  // 3. Navigation Links
  const parseInitialLinks = (key: string, defaults: FooterLinkItem[]): FooterLinkItem[] => {
    const raw = siteSettings[key]?.value;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return defaults;
  };

  const [quickLinks, setQuickLinks] = useState<FooterLinkItem[]>(() =>
    parseInitialLinks("footer_quick_links_json", defaultQuickLinks)
  );
  const [featureLinks, setFeatureLinks] = useState<FooterLinkItem[]>(() =>
    parseInitialLinks("footer_feature_links_json", defaultFeatureLinks)
  );

  // 4. Contact & Support
  const [phone, setPhone] = useState(getInitial("contact_phone", "1-855-924-0830"));
  const [email, setEmail] = useState(getInitial("contact_email", "info@smartphotoeditors.com"));
  const [chatText, setChatText] = useState(getInitial("footer_chat_text", "Live Chat"));

  // 5. Copyright & Socials
  const currentYear = new Date().getFullYear();
  const [copyright, setCopyright] = useState(
    getInitial(
      "footer_copyright",
      `© ${currentYear} www.smartphotoeditors.com | Web Property of Flatworld Solutions Inc.`
    )
  );
  const [facebook, setFacebook] = useState(
    getInitial("footer_social_facebook", "https://www.facebook.com/SmartPHOTOeditors/")
  );
  const [twitter, setTwitter] = useState(
    getInitial("footer_social_twitter", "https://twitter.com/smartphotoedits")
  );
  const [linkedin, setLinkedin] = useState(
    getInitial("footer_social_linkedin", "https://www.linkedin.com/company/smart-photo-editors/")
  );
  const [pinterest, setPinterest] = useState(
    getInitial("footer_social_pinterest", "https://pinterest.com/smartphotoedits/")
  );

  useEffect(() => {
    if (siteSettings) {
      if (siteSettings.site_footer_logo?.value) setFooterLogo(siteSettings.site_footer_logo.value);
      if (siteSettings.footer_brand_desc?.value) setBrandDesc(siteSettings.footer_brand_desc.value);
      if (siteSettings.contact_phone?.value) setPhone(siteSettings.contact_phone.value);
      if (siteSettings.contact_email?.value) setEmail(siteSettings.contact_email.value);
      if (siteSettings.footer_chat_text?.value) setChatText(siteSettings.footer_chat_text.value);
      if (siteSettings.footer_copyright?.value) setCopyright(siteSettings.footer_copyright.value);
      if (siteSettings.footer_social_facebook?.value) setFacebook(siteSettings.footer_social_facebook.value);
      if (siteSettings.footer_social_twitter?.value) setTwitter(siteSettings.footer_social_twitter.value);
      if (siteSettings.footer_social_linkedin?.value) setLinkedin(siteSettings.footer_social_linkedin.value);
      if (siteSettings.footer_social_pinterest?.value) setPinterest(siteSettings.footer_social_pinterest.value);

      if (siteSettings.footer_locations_json?.value) {
        try {
          const parsed = JSON.parse(siteSettings.footer_locations_json.value);
          if (Array.isArray(parsed)) setLocations(parsed);
        } catch {}
      }

      if (siteSettings.footer_quick_links_json?.value) {
        try {
          const parsed = JSON.parse(siteSettings.footer_quick_links_json.value);
          if (Array.isArray(parsed)) setQuickLinks(parsed);
        } catch {}
      }

      if (siteSettings.footer_feature_links_json?.value) {
        try {
          const parsed = JSON.parse(siteSettings.footer_feature_links_json.value);
          if (Array.isArray(parsed)) setFeatureLinks(parsed);
        } catch {}
      }
    }
  }, [siteSettings]);

  // Location Handlers
  const handleAddLocation = () => {
    const newLoc: FooterLocation = {
      id: `loc-${Date.now()}`,
      title: "New Office",
      address: "Street Address, City, State/Country - Postal Code",
    };
    setLocations([...locations, newLoc]);
  };

  const handleUpdateLocation = (id: string, field: "title" | "address", val: string) => {
    setLocations(
      locations.map((loc) => (loc.id === id ? { ...loc, [field]: val } : loc))
    );
  };

  const handleDeleteLocation = (id: string) => {
    if (locations.length === 1) {
      if (!confirm("This is the last location. Are you sure you want to remove it?")) return;
    }
    setLocations(locations.filter((loc) => loc.id !== id));
    showToast("Location removed from footer");
  };

  // Link Handlers
  const handleAddLink = (target: "quick" | "feature") => {
    const newLink: FooterLinkItem = {
      id: `link-${Date.now()}`,
      label: "New Link",
      url: "/",
    };
    if (target === "quick") {
      setQuickLinks([...quickLinks, newLink]);
    } else {
      setFeatureLinks([...featureLinks, newLink]);
    }
  };

  const handleUpdateLink = (target: "quick" | "feature", id: string, field: "label" | "url", val: string) => {
    if (target === "quick") {
      setQuickLinks(quickLinks.map((l) => (l.id === id ? { ...l, [field]: val } : l)));
    } else {
      setFeatureLinks(featureLinks.map((l) => (l.id === id ? { ...l, [field]: val } : l)));
    }
  };

  const handleDeleteLink = (target: "quick" | "feature", id: string) => {
    if (target === "quick") {
      setQuickLinks(quickLinks.filter((l) => l.id !== id));
    } else {
      setFeatureLinks(featureLinks.filter((l) => l.id !== id));
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload: Record<string, string> = {
        site_footer_logo: footerLogo,
        footer_brand_desc: brandDesc,
        footer_locations_json: JSON.stringify(locations),
        footer_quick_links_json: JSON.stringify(quickLinks),
        footer_feature_links_json: JSON.stringify(featureLinks),
        contact_phone: phone,
        contact_email: email,
        footer_chat_text: chatText,
        footer_copyright: copyright,
        footer_social_facebook: facebook,
        footer_social_twitter: twitter,
        footer_social_linkedin: linkedin,
        footer_social_pinterest: pinterest,
      };

      // Also sync legacy keys so external or existing templates remain consistent
      if (locations[0]) {
        payload.footer_address_usa_title = locations[0].title;
        payload.footer_address_usa = locations[0].address;
      }
      if (locations[1]) {
        payload.footer_address_india_title = locations[1].title;
        payload.footer_address_india = locations[1].address;
      }
      if (locations[2]) {
        payload.footer_address_philippines_title = locations[2].title;
        payload.footer_address_philippines = locations[2].address;
      }

      await onSaveSettings(payload);
      showToast("Global Footer settings saved successfully!");
    } catch (err: any) {
      showToast(err.message || "Failed to save footer settings", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-indigo-900 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-shoe-prints rotate-90"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">
                Website Footer Studio
              </h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold whitespace-nowrap shrink-0">
                Global Component
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Manage dark footer logo, brand narrative, international offices with delete &amp; add capability, navigation links, and contacts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#1265E8] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
          >
            <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
            <span>{saving ? "Saving..." : "Save Footer Settings"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-gray-200 scrollbar-none text-xs font-bold">
        {[
          { id: "brand", label: "1. Brand & Logo", icon: "fa-palette" },
          { id: "addresses", label: `2. Office Locations (${locations.length})`, icon: "fa-location-dot" },
          { id: "links", label: "3. Footer Links", icon: "fa-link" },
          { id: "contact", label: "4. Direct Contact Info", icon: "fa-headset" },
          { id: "social", label: "5. Copyright & Socials", icon: "fa-share-nodes" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? "bg-[#07152F] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <i className={`fa-solid ${tab.icon}`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: BRAND & LOGO */}
      {activeTab === "brand" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-[#07152F] flex items-center justify-center text-xs">
                <i className="fa-solid fa-palette"></i>
              </span>
              Footer Brand Statement &amp; Dark Logo
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Displayed prominently at the top of the dark footer across all pages.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
            <label className="block font-bold text-gray-800">
              Footer Dark Logo Image
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-44 h-20 bg-[#07152F] border border-gray-700 rounded-xl overflow-hidden flex items-center justify-center p-2 shadow-inner shrink-0">
                {footerLogo ? (
                  <img
                    src={footerLogo}
                    alt="Footer logo preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <i className="fa-solid fa-image text-gray-500"></i>
                )}
              </div>
              <div className="flex-1 space-y-2 w-full">
                <input
                  type="text"
                  value={footerLogo}
                  onChange={(e) => setFooterLogo(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-900 font-mono text-xs border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                  placeholder="/images/lirisha-camera-logo.png"
                />
                <div className="flex items-center gap-3">
                  <ImageUploadButton
                    folder="logos"
                    onUploadSuccess={(url) => {
                      setFooterLogo(url);
                      showToast("Footer logo uploaded successfully!");
                    }}
                    buttonText="Upload New Footer Logo"
                  />
                  {footerLogo !== "/images/lirisha-camera-logo.png" && (
                    <button
                      type="button"
                      onClick={() => setFooterLogo("/images/lirisha-camera-logo.png")}
                      className="text-xs text-gray-500 hover:text-red-500 underline"
                    >
                      Reset Default
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1.5">
              Brand Mission / Tagline Paragraph
            </label>
            <textarea
              rows={3}
              value={brandDesc}
              onChange={(e) => setBrandDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none leading-relaxed shadow-sm"
              placeholder="e.g. LIRISHA is a team of skilled photo editing specialists..."
            />
          </div>
        </div>
      )}

      {/* TAB 2: DYNAMIC LOCATIONS WITH DELETE & ADD */}
      {activeTab === "addresses" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#1265E8] flex items-center justify-center text-xs">
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                International Office Locations ({locations.length})
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                You have full admin control to add, edit, or delete any office. You can delete locations and keep only one, or add as many as needed!
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddLocation}
              className="px-4 py-2 rounded-xl bg-blue-50 text-[#1265E8] hover:bg-blue-100 font-bold border border-blue-200 flex items-center gap-2 transition-colors self-start sm:self-auto shrink-0 shadow-sm"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add Location</span>
            </button>
          </div>

          {locations.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <i className="fa-solid fa-map-location-dot text-gray-400 text-3xl mb-2"></i>
              <p className="text-gray-600 font-bold">No locations currently configured</p>
              <p className="text-gray-400 text-xs mt-1 mb-4">Click "Add Location" above to create an office address.</p>
              <button
                type="button"
                onClick={handleAddLocation}
                className="px-4 py-2 bg-[#1265E8] text-white rounded-xl font-bold text-xs shadow-sm hover:bg-blue-700"
              >
                + Add First Location
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {locations.map((loc, index) => (
                <div
                  key={loc.id}
                  className="p-5 bg-slate-50 hover:bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <span className="font-extrabold text-slate-800 flex items-center gap-2 text-xs">
                        <i className="fa-solid fa-building text-[#1265E8]"></i>
                        Location #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteLocation(loc.id)}
                        className="px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors font-bold inline-flex items-center gap-1.5"
                        title="Delete this location"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                        <span>Delete</span>
                      </button>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Country / City Heading
                      </label>
                      <input
                        type="text"
                        value={loc.title}
                        onChange={(e) => handleUpdateLocation(loc.id, "title", e.target.value)}
                        className="w-full px-3 py-2 bg-white text-gray-900 font-bold border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                        placeholder="e.g. USA, UK, India, Australia"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Office Physical Address
                      </label>
                      <textarea
                        rows={3}
                        value={loc.address}
                        onChange={(e) => handleUpdateLocation(loc.id, "address", e.target.value)}
                        className="w-full px-3 py-2 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none leading-relaxed shadow-sm"
                        placeholder="Suite number, Street, City, State, ZIP code"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-gray-400 font-medium flex items-center justify-between">
                    <span>Preview in footer:</span>
                    <span className="text-[#1265E8] font-bold">{loc.title || "Untitled"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-center gap-3 text-xs text-blue-900">
            <i className="fa-solid fa-circle-info text-base text-[#1265E8] shrink-0"></i>
            <span>
              <strong>Tip:</strong> If you delete locations and keep only one (e.g. USA), the website footer will automatically adapt and display that single location cleanly without empty cards.
            </span>
          </div>
        </div>
      )}

      {/* TAB 3: DYNAMIC FOOTER LINKS */}
      {activeTab === "links" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-8 text-xs">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">
                <i className="fa-solid fa-link"></i>
              </span>
              Footer Navigation Links Management
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Add, edit, or delete any links in the Quick Links and Features footer columns.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-gray-900 text-sm flex items-center gap-2">
                <i className="fa-solid fa-bolt text-[#1265E8]"></i>
                Column 1: Quick Links ({quickLinks.length})
              </h4>
              <button
                type="button"
                onClick={() => handleAddLink("quick")}
                className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#1265E8] hover:bg-blue-100 font-bold border border-blue-200 flex items-center gap-1.5 transition-colors"
              >
                <i className="fa-solid fa-plus text-xs"></i>
                <span>Add Quick Link</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {quickLinks.map((link) => (
                <div
                  key={link.id}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-2"
                >
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => handleUpdateLink("quick", link.id, "label", e.target.value)}
                      className="w-full px-2.5 py-1 text-xs bg-white text-gray-900 font-bold border border-gray-300 rounded-lg outline-none focus:border-[#1265E8]"
                      placeholder="Link Label"
                    />
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleUpdateLink("quick", link.id, "url", e.target.value)}
                      className="w-full px-2.5 py-1 text-[11px] font-mono bg-white text-gray-600 border border-gray-300 rounded-lg outline-none focus:border-[#1265E8]"
                      placeholder="/route"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteLink("quick", link.id)}
                    className="w-7 h-7 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg shrink-0 transition-colors"
                    title="Delete link"
                  >
                    <i className="fa-solid fa-trash-can text-xs"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Features Column */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-gray-900 text-sm flex items-center gap-2">
                <i className="fa-solid fa-star text-amber-500"></i>
                Column 2: Feature Links ({featureLinks.length})
              </h4>
              <button
                type="button"
                onClick={() => handleAddLink("feature")}
                className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#1265E8] hover:bg-blue-100 font-bold border border-blue-200 flex items-center gap-1.5 transition-colors"
              >
                <i className="fa-solid fa-plus text-xs"></i>
                <span>Add Feature Link</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {featureLinks.map((link) => (
                <div
                  key={link.id}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-2"
                >
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => handleUpdateLink("feature", link.id, "label", e.target.value)}
                      className="w-full px-2.5 py-1 text-xs bg-white text-gray-900 font-bold border border-gray-300 rounded-lg outline-none focus:border-[#1265E8]"
                      placeholder="Link Label"
                    />
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleUpdateLink("feature", link.id, "url", e.target.value)}
                      className="w-full px-2.5 py-1 text-[11px] font-mono bg-white text-gray-600 border border-gray-300 rounded-lg outline-none focus:border-[#1265E8]"
                      placeholder="/route"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteLink("feature", link.id)}
                    className="w-7 h-7 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg shrink-0 transition-colors"
                    title="Delete link"
                  >
                    <i className="fa-solid fa-trash-can text-xs"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CONTACT & SUPPORT */}
      {activeTab === "contact" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-[#07152F] flex items-center justify-center text-xs">
                <i className="fa-solid fa-headset"></i>
              </span>
              Support &amp; Customer Channels
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Presented in the Contact column of the footer and clickable for rapid response.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Toll-Free Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                placeholder="1-855-924-0830"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Official Support Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                placeholder="info@smartphotoeditors.com"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Live Chat Button Label
              </label>
              <input
                type="text"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                className="w-full px-3 py-2 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                placeholder="Live Chat"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: COPYRIGHT & SOCIALS */}
      {activeTab === "social" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-[#07152F] flex items-center justify-center text-xs">
                <i className="fa-solid fa-share-nodes"></i>
              </span>
              Legal Notice &amp; Social Channel Handles
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Social icons appear on the right side of the footer; copyright banner spans the bottom edge.
            </p>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1.5">
              Copyright Notice Line
            </label>
            <input
              type="text"
              value={copyright}
              onChange={(e) => setCopyright(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                <i className="fa-brands fa-facebook text-blue-600 mr-1.5"></i>
                Facebook Page URL
              </label>
              <input
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full px-3 py-2 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                <i className="fa-brands fa-x-twitter text-slate-800 mr-1.5"></i>
                X / Twitter Profile URL
              </label>
              <input
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full px-3 py-2 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                <i className="fa-brands fa-linkedin text-blue-700 mr-1.5"></i>
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full px-3 py-2 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                <i className="fa-brands fa-pinterest text-red-600 mr-1.5"></i>
                Pinterest Board URL
              </label>
              <input
                type="text"
                value={pinterest}
                onChange={(e) => setPinterest(e.target.value)}
                className="w-full px-3 py-2 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
