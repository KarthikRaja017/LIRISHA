'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';

interface FooterLocation {
  id: string;
  title: string;
  address: string;
}

interface FooterLinkItem {
  id: string;
  label: string;
  url: string;
}

const defaultQuickLinks: FooterLinkItem[] = [
  { id: 'ql-1', label: 'All Services', url: '/services' },
  { id: 'ql-2', label: 'Sample Portfolio', url: '/sample-images' },
  { id: 'ql-3', label: 'About Our Studio', url: '/about-us' },
  { id: 'ql-4', label: 'Pricing & Packages', url: '/pricing' },
  { id: 'ql-5', label: 'Contact Us', url: '/contact-us' },
  { id: 'ql-6', label: 'Client & Admin Portal', url: '/login' },
  { id: 'ql-7', label: 'Studio Blog', url: '/blog' },
  { id: 'ql-8', label: 'Case Studies', url: '/case-study' },
  { id: 'ql-9', label: 'Testimonials', url: '/testimonials' },
  { id: 'ql-10', label: 'Privacy Policy', url: '/privacy-policy' },
];

const defaultFeatureLinks: FooterLinkItem[] = [
  { id: 'fl-1', label: 'Data Security & NDA', url: '/security' },
  { id: 'fl-2', label: 'Quality Guarantee', url: '/quality' },
  { id: 'fl-3', label: '24/7 Global Production', url: '/247-coverage' },
  { id: 'fl-4', label: '12h Rush Turnaround', url: '/turnaround-time' },
  { id: 'fl-5', label: 'Outsource Benefits', url: '/benefits' },
  { id: 'fl-6', label: 'Compliant Software', url: '/compliant-software' },
  { id: 'fl-7', label: 'Adobe-Certified Artists', url: '/adobe-specialized-artists' },
  { id: 'fl-8', label: 'Photo Terminology Glossary', url: '/glossary' },
  { id: 'fl-9', label: 'Sitemap', url: '/sitemap' },
];

export const SiteFooter: React.FC = () => {
  const { getSettingValue } = useSettings();
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const siteName = getSettingValue('site_name', 'LIRISHA');
  const footerLogo = getSettingValue(
    'site_footer_logo',
    getSettingValue('site_logo', '/images/lirisha-camera-logo.png'),
  );
  const brandDesc = getSettingValue(
    'footer_brand_desc',
    `${siteName} is a global outsourced image editing studio with 200+ dedicated photo artists, delivering 12–24h turnaround, ISO-certified consistency, and pixel-level accuracy for top commercial photographers and e-commerce brands.`,
  );

  // Dynamic Locations parsing
  const locationsJson = getSettingValue('footer_locations_json', '');
  let locations: FooterLocation[] = [];

  if (locationsJson) {
    try {
      const parsed = JSON.parse(locationsJson);
      if (Array.isArray(parsed)) {
        locations = parsed;
      }
    } catch {
      locations = [];
    }
  }

  if (!locationsJson) {
    const locs: FooterLocation[] = [];
    const usaAddr = getSettingValue('footer_address_usa', '116 Village Blvd, Suite 220, Princeton, NJ 08540');
    const usaTitle = getSettingValue('footer_address_usa_title', 'United States');
    if (usaAddr) locs.push({ id: 'loc-usa', title: usaTitle, address: usaAddr });

    const indiaAddr = getSettingValue('footer_address_india', 'No.6, Banaswadi Main Road, Dodda Banaswadi, Bangalore - 560 043');
    const indiaTitle = getSettingValue('footer_address_india_title', 'India');
    if (indiaAddr) locs.push({ id: 'loc-india', title: indiaTitle, address: indiaAddr });

    const philAddr = getSettingValue('footer_address_philippines', 'Aeon Towers, J.P. Laurel Avenue, Bajada, Davao 8000');
    const philTitle = getSettingValue('footer_address_philippines_title', 'Philippines');
    if (philAddr) locs.push({ id: 'loc-phil', title: philTitle, address: philAddr });

    locations = locs;
  }

  // Dynamic Navigation Links
  const quickLinksJson = getSettingValue('footer_quick_links_json', '');
  let quickLinks: FooterLinkItem[] = defaultQuickLinks;
  if (quickLinksJson) {
    try {
      const parsed = JSON.parse(quickLinksJson);
      if (Array.isArray(parsed) && parsed.length > 0) quickLinks = parsed;
    } catch {}
  }

  const featureLinksJson = getSettingValue('footer_feature_links_json', '');
  let featureLinks: FooterLinkItem[] = defaultFeatureLinks;
  if (featureLinksJson) {
    try {
      const parsed = JSON.parse(featureLinksJson);
      if (Array.isArray(parsed) && parsed.length > 0) featureLinks = parsed;
    } catch {}
  }

  const contactEmail = getSettingValue('contact_email', 'info@lirisha.com');
  const contactPhone = getSettingValue('contact_phone', '1-855-695-6028');
  const chatText = getSettingValue('footer_chat_text', 'Live Concierge');

  const copyrightText = getSettingValue(
    'footer_copyright',
    `© ${currentYear} ${siteName}. All Rights Reserved.`,
  );

  const fbLink = getSettingValue('footer_social_facebook', 'https://www.facebook.com/SmartPHOTOeditors/');
  const twitterLink = getSettingValue('footer_social_twitter', 'https://twitter.com/smartphotoedits');
  const linkedinLink = getSettingValue('footer_social_linkedin', 'https://www.linkedin.com/company/smart-photo-editors/');
  const pinterestLink = getSettingValue('footer_social_pinterest', 'https://pinterest.com/smartphotoedits/');

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(contactEmail).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    }
  };

  return (
    <footer className="bg-[#060911] text-slate-300 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative ambient background blur */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Brand Banner Top */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-12 mb-12 border-b border-slate-800/80 gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <img
                src={footerLogo || '/images/lirisha-camera-logo.png'}
                alt={`${siteName} Footer Logo`}
                className="h-11 w-auto max-w-[170px] object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (
                    target.src !== '/images/lirisha-camera-logo.png' &&
                    !target.src.endsWith('/images/lirisha-camera-logo.png')
                  ) {
                    target.src = '/images/lirisha-camera-logo.png';
                  }
                }}
              />
            </Link>
            <span className="hidden sm:inline-block h-6 w-px bg-slate-800" />
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              {brandDesc}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get Free Trial</span>
              <i className="fa-solid fa-arrow-right text-[10px]" />
            </Link>
          </div>
        </div>

        {/* 4-Column Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>Studio Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.slice(0, 8).map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    className="text-slate-400 hover:text-cyan-400 transition-colors inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Features & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Features &amp; Trust</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              {featureLinks.slice(0, 8).map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    className="text-slate-400 hover:text-cyan-400 transition-colors inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Global Production Hubs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Global Locations</span>
            </h4>
            <div className="space-y-4">
              {locations.length === 0 ? (
                <p className="text-slate-500 text-xs">No address locations specified.</p>
              ) : (
                locations.map((loc) => (
                  <div key={loc.id} className="text-xs">
                    <p className="font-bold text-white mb-1 flex items-center gap-1.5">
                      <i className="fa-solid fa-location-dot text-blue-500 text-[11px]" />
                      <span>{loc.title}</span>
                    </p>
                    <p className="text-slate-400 leading-relaxed pl-4">{loc.address}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Col 4: Quick Contact Channels */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Direct Concierge</span>
            </h4>
            <div className="space-y-3.5 text-xs">
              {/* Email */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-400/40 transition-colors">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  Direct Email
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-white hover:text-cyan-400 font-semibold flex items-center gap-2 text-left"
                >
                  <span>{contactEmail}</span>
                  <i
                    className={`far ${
                      copied ? 'fa-check-circle text-emerald-400' : 'fa-copy text-slate-400'
                    } text-xs`}
                  />
                </button>
              </div>

              {/* Phone */}
              {contactPhone && (
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-400/40 transition-colors">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    Toll-Free Phone
                  </span>
                  <a
                    href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
                    className="text-white hover:text-cyan-400 font-semibold block"
                  >
                    {contactPhone}
                  </a>
                </div>
              )}

              {/* Live Chat */}
              <button
                type="button"
                onClick={() => alert('Our 24/7 client concierge will connect with you immediately.')}
                className="w-full py-2.5 px-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-400/40 text-slate-300 hover:text-white font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <i className="fa-regular fa-comment-dots text-blue-400" />
                <span>{chatText}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span>{copyrightText}</span>
            <span className="opacity-30">|</span>
            <Link
              href="/login"
              className="text-slate-400 hover:text-white transition-colors underline decoration-dotted inline-flex items-center gap-1"
            >
              <i className="fa-solid fa-arrow-right-to-bracket text-[10px]" />
              <span>Portal Sign In</span>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-[11px] text-slate-500 mr-1">Social:</span>
            <a
              href={fbLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-400 transition-all hover:scale-110"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f text-xs" />
            </a>
            <a
              href={twitterLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-400 transition-all hover:scale-110"
              aria-label="X Twitter"
            >
              <i className="fa-brands fa-x-twitter text-xs" />
            </a>
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-400 transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in text-xs" />
            </a>
            <a
              href={pinterestLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-rose-600 hover:text-white flex items-center justify-center text-slate-400 transition-all hover:scale-110"
              aria-label="Pinterest"
            >
              <i className="fa-brands fa-pinterest-p text-xs" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
