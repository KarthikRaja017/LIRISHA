"use client";

import React, { useState, useEffect } from "react";
import { SiteSettingsMap } from "@/types/content";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";

interface FooterEditorProps {
  siteSettings: SiteSettingsMap;
  onSaveSettings: (settingsPayload: Record<string, string>) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const FooterEditor: React.FC<FooterEditorProps> = ({
  siteSettings,
  onSaveSettings,
  showToast,
}) => {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"brand" | "addresses" | "contact" | "social">("brand");

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

  // 2. Global Addresses
  const [usaTitle, setUsaTitle] = useState(getInitial("footer_address_usa_title", "USA"));
  const [usaAddr, setUsaAddr] = useState(
    getInitial("footer_address_usa", "116 Village Blvd, Suite 220, Princeton, NJ 08540")
  );

  const [indiaTitle, setIndiaTitle] = useState(getInitial("footer_address_india_title", "India"));
  const [indiaAddr, setIndiaAddr] = useState(
    getInitial(
      "footer_address_india",
      "No.6, Banaswadi Main Road, Dodda Banaswadi, Bangalore - 560 043"
    )
  );

  const [philTitle, setPhilTitle] = useState(
    getInitial("footer_address_philippines_title", "Philippines")
  );
  const [philAddr, setPhilAddr] = useState(
    getInitial("footer_address_philippines", "Aeon Towers, J.P. Laurel Avenue, Bajada, Davao 8000")
  );

  // 3. Contact & Support
  const [phone, setPhone] = useState(getInitial("contact_phone", "1-855-924-0830"));
  const [email, setEmail] = useState(getInitial("contact_email", "info@smartphotoeditors.com"));
  const [chatText, setChatText] = useState(getInitial("footer_chat_text", "Live Chat"));

  // 4. Copyright & Socials
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
      if (siteSettings.footer_address_usa_title?.value) setUsaTitle(siteSettings.footer_address_usa_title.value);
      if (siteSettings.footer_address_usa?.value) setUsaAddr(siteSettings.footer_address_usa.value);
      if (siteSettings.footer_address_india_title?.value) setIndiaTitle(siteSettings.footer_address_india_title.value);
      if (siteSettings.footer_address_india?.value) setIndiaAddr(siteSettings.footer_address_india.value);
      if (siteSettings.footer_address_philippines_title?.value) setPhilTitle(siteSettings.footer_address_philippines_title.value);
      if (siteSettings.footer_address_philippines?.value) setPhilAddr(siteSettings.footer_address_philippines.value);
      if (siteSettings.contact_phone?.value) setPhone(siteSettings.contact_phone.value);
      if (siteSettings.contact_email?.value) setEmail(siteSettings.contact_email.value);
      if (siteSettings.footer_chat_text?.value) setChatText(siteSettings.footer_chat_text.value);
      if (siteSettings.footer_copyright?.value) setCopyright(siteSettings.footer_copyright.value);
      if (siteSettings.footer_social_facebook?.value) setFacebook(siteSettings.footer_social_facebook.value);
      if (siteSettings.footer_social_twitter?.value) setTwitter(siteSettings.footer_social_twitter.value);
      if (siteSettings.footer_social_linkedin?.value) setLinkedin(siteSettings.footer_social_linkedin.value);
      if (siteSettings.footer_social_pinterest?.value) setPinterest(siteSettings.footer_social_pinterest.value);
    }
  }, [siteSettings]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload: Record<string, string> = {
        site_footer_logo: footerLogo,
        footer_brand_desc: brandDesc,
        footer_address_usa_title: usaTitle,
        footer_address_usa: usaAddr,
        footer_address_india_title: indiaTitle,
        footer_address_india: indiaAddr,
        footer_address_philippines_title: philTitle,
        footer_address_philippines: philAddr,
        contact_phone: phone,
        contact_email: email,
        footer_chat_text: chatText,
        footer_copyright: copyright,
        footer_social_facebook: facebook,
        footer_social_twitter: twitter,
        footer_social_linkedin: linkedin,
        footer_social_pinterest: pinterest,
      };

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
              Manage dark footer logo, brand narrative, international offices, customer contacts, copyright, and social handles.
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
          { id: "addresses", label: "2. Global Offices (3)", icon: "fa-location-dot" },
          { id: "contact", label: "3. Direct Contact Info", icon: "fa-headset" },
          { id: "social", label: "4. Copyright & Socials", icon: "fa-share-nodes" },
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

      {/* TAB 2: ADDRESSES */}
      {activeTab === "addresses" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-[#07152F] flex items-center justify-center text-xs">
                <i className="fa-solid fa-location-dot"></i>
              </span>
              International Office Addresses
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Presented in the Address column of the footer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* USA */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 font-black text-slate-800">
                <i className="fa-solid fa-flag-usa text-blue-600"></i>
                <span>Primary Office</span>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Country / Region</label>
                <input
                  type="text"
                  value={usaTitle}
                  onChange={(e) => setUsaTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-900 font-bold border border-gray-300 rounded-xl outline-none"
                  placeholder="USA"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Postal Address</label>
                <textarea
                  rows={3}
                  value={usaAddr}
                  onChange={(e) => setUsaAddr(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-900 text-xs border border-gray-300 rounded-xl outline-none"
                  placeholder="Street, Suite, City, State ZIP"
                />
              </div>
            </div>

            {/* India */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 font-black text-slate-800">
                <i className="fa-solid fa-building text-orange-600"></i>
                <span>Production Hub (India)</span>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Country / Region</label>
                <input
                  type="text"
                  value={indiaTitle}
                  onChange={(e) => setIndiaTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-900 font-bold border border-gray-300 rounded-xl outline-none"
                  placeholder="India"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Postal Address</label>
                <textarea
                  rows={3}
                  value={indiaAddr}
                  onChange={(e) => setIndiaAddr(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-900 text-xs border border-gray-300 rounded-xl outline-none"
                  placeholder="Street, Area, City, Pin Code"
                />
              </div>
            </div>

            {/* Philippines */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 font-black text-slate-800">
                <i className="fa-solid fa-earth-asia text-emerald-600"></i>
                <span>Asia-Pacific Hub</span>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Country / Region</label>
                <input
                  type="text"
                  value={philTitle}
                  onChange={(e) => setPhilTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-900 font-bold border border-gray-300 rounded-xl outline-none"
                  placeholder="Philippines"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Postal Address</label>
                <textarea
                  rows={3}
                  value={philAddr}
                  onChange={(e) => setPhilAddr(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-900 text-xs border border-gray-300 rounded-xl outline-none"
                  placeholder="Tower, Avenue, City, Postal Code"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DIRECT CONTACT */}
      {activeTab === "contact" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-[#07152F] flex items-center justify-center text-xs">
                <i className="fa-solid fa-headset"></i>
              </span>
              Direct Customer Support Channels
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Displayed in the Contact Us column with click-to-copy and direct phone dialing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block font-bold text-gray-800 mb-1.5 flex items-center gap-2">
                <i className="fa-solid fa-phone text-[#ff5b0a]"></i>
                Toll Free Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-bold border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                placeholder="1-855-924-0830"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-1.5 flex items-center gap-2">
                <i className="fa-solid fa-envelope text-blue-600"></i>
                Official Support Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-bold border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                placeholder="info@smartphotoeditors.com"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-1.5 flex items-center gap-2">
                <i className="fa-solid fa-comments text-emerald-600"></i>
                Live Chat Prompt Text
              </label>
              <input
                type="text"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-bold border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                placeholder="Live Chat"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COPYRIGHT & SOCIALS */}
      {activeTab === "social" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-[#07152F] flex items-center justify-center text-xs">
                <i className="fa-solid fa-share-nodes"></i>
              </span>
              Copyright Notice &amp; Social Links
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Bottom copyright bar and social platform URLs.
            </p>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1.5">
              Copyright Notice Text
            </label>
            <input
              type="text"
              value={copyright}
              onChange={(e) => setCopyright(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
              placeholder={`© ${currentYear} www.smartphotoeditors.com | Web Property of Flatworld Solutions Inc.`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-bold text-gray-800 mb-1.5 flex items-center gap-2">
                <i className="fa-brands fa-facebook-f text-blue-600"></i>
                Facebook Page URL
              </label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-mono text-xs border border-gray-300 rounded-xl outline-none"
                placeholder="https://www.facebook.com/SmartPHOTOeditors/"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-1.5 flex items-center gap-2">
                <i className="fa-brands fa-x-twitter text-slate-800"></i>
                Twitter / X URL
              </label>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-mono text-xs border border-gray-300 rounded-xl outline-none"
                placeholder="https://twitter.com/smartphotoedits"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-1.5 flex items-center gap-2">
                <i className="fa-brands fa-linkedin-in text-blue-700"></i>
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-mono text-xs border border-gray-300 rounded-xl outline-none"
                placeholder="https://www.linkedin.com/company/smart-photo-editors/"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-1.5 flex items-center gap-2">
                <i className="fa-brands fa-pinterest-p text-red-600"></i>
                Pinterest URL
              </label>
              <input
                type="text"
                value={pinterest}
                onChange={(e) => setPinterest(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-mono text-xs border border-gray-300 rounded-xl outline-none"
                placeholder="https://pinterest.com/smartphotoedits/"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="p-4 sm:p-5 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <i className="fa-solid fa-circle-info text-[#1265E8]"></i>
          <span>Updates saved here will reflect immediately across all page footers.</span>
        </div>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#07152F] to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
          <span>{saving ? "Saving Changes..." : "Save Footer Settings"}</span>
        </button>
      </div>
    </div>
  );
};
