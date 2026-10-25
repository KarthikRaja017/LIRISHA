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
  { id: 'ql-1', label: 'Services', url: '/services' },
  { id: 'ql-2', label: 'Resources', url: '/resources' },
  { id: 'ql-3', label: 'About Us', url: '/about-us' },
  { id: 'ql-4', label: 'Contact Us', url: '/contact-us' },
  { id: 'ql-5', label: 'Portfolio', url: '/sample-images' },
  { id: 'ql-login', label: 'Login', url: '/login' },
  { id: 'ql-6', label: 'Blog', url: '/blog' },
  { id: 'ql-7', label: 'Sitemap', url: '/sitemap' },
  { id: 'ql-8', label: 'Case Studies', url: '/case-study' },
  { id: 'ql-9', label: 'Resource Articles', url: '/articles' },
  { id: 'ql-10', label: 'Accessories', url: '/accessories' },
  { id: 'ql-11', label: 'Testimonials', url: '/testimonials' },
  { id: 'ql-12', label: 'Privacy Policy', url: '/privacy-policy' },
];

const defaultFeatureLinks: FooterLinkItem[] = [
  { id: 'fl-1', label: 'Security', url: '/security' },
  { id: 'fl-2', label: 'Quality', url: '/quality' },
  { id: 'fl-3', label: '24/7 Coverage', url: '/247-coverage' },
  { id: 'fl-4', label: 'Pricing', url: '/pricing' },
  { id: 'fl-5', label: 'Benefits', url: '/benefits' },
  { id: 'fl-6', label: 'Quick Delivery', url: '/turnaround-time' },
  { id: 'fl-7', label: '100% Compliance Software', url: '/compliant-software' },
  { id: 'fl-8', label: 'Adobe specialized artists', url: '/adobe-specialized-artists' },
  { id: 'fl-9', label: 'Sitemap', url: '/sitemap' },
  { id: 'fl-10', label: 'Glossary', url: '/glossary' },
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
    `${siteName} is a team of skilled photo editing specialists with a commitment to providing quality, excellence, and satisfaction.`,
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

  // Fallback to legacy individual location settings if footer_locations_json was never initialized
  if (!locationsJson) {
    const locs: FooterLocation[] = [];
    const usaAddr = getSettingValue('footer_address_usa', '116 Village Blvd, Suite 220, Princeton, NJ 08540');
    const usaTitle = getSettingValue('footer_address_usa_title', 'USA');
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
      if (Array.isArray(parsed)) quickLinks = parsed;
    } catch {}
  }

  const featureLinksJson = getSettingValue('footer_feature_links_json', '');
  let featureLinks: FooterLinkItem[] = defaultFeatureLinks;
  if (featureLinksJson) {
    try {
      const parsed = JSON.parse(featureLinksJson);
      if (Array.isArray(parsed)) featureLinks = parsed;
    } catch {}
  }

  const contactEmail = getSettingValue(
    'contact_email',
    'info@smartphotoeditors.com',
  );
  const contactPhone = getSettingValue('contact_phone', '1-855-924-0830');
  const chatText = getSettingValue('footer_chat_text', 'Live Chat');

  const copyrightText = getSettingValue(
    'footer_copyright',
    `© ${currentYear} www.smartphotoeditors.com | Web Property of Flatworld Solutions Inc.`,
  );

  const fbLink = getSettingValue(
    'footer_social_facebook',
    'https://www.facebook.com/SmartPHOTOeditors/',
  );
  const twitterLink = getSettingValue(
    'footer_social_twitter',
    'https://twitter.com/smartphotoedits',
  );
  const linkedinLink = getSettingValue(
    'footer_social_linkedin',
    'https://www.linkedin.com/company/smart-photo-editors/',
  );
  const pinterestLink = getSettingValue(
    'footer_social_pinterest',
    '//pinterest.com/smartphotoedits/',
  );

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(contactEmail).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      alert(`Email copied to clipboard: ${contactEmail}`);
    });
  };

  return (
    <footer style={{ backgroundColor: 'var(--background-dark)' }}>
      <div className="container">
        {/* Footer Top Brand */}
        <div
          className="footer-logo text-center"
          style={{ borderBottomColor: 'var(--surface-dark)' }}>
          <div className="inline-flex items-center gap-3 justify-center mb-3">
            <img
              src={footerLogo}
              alt={`${siteName} Footer logo`}
              className="footer-logo-img mx-auto"
              title={`${siteName} Footer logo`}
              style={{
                height: '46px',
                width: 'auto',
                maxWidth: '160px',
                objectFit: 'contain',
                display: 'inline-block',
              }}
            />
          </div>
          <p style={{ color: 'var(--text-secondary-dark)' }}>
            {brandDesc}
          </p>
        </div>

        {/* 4 Column Links & Info */}
        <div
          className="row"
          style={{ borderBottom: '2px solid #07152F', paddingBottom: '19px' }}>
          {/* Quick Links */}
          <div className="col-6 col-md-2 mb-4 mb-md-0">
            <div className="widget quick-links">
              <p className="footer-menu-heading">Quick Links</p>
              <ul>
                {quickLinks.map((item) => (
                  <li key={item.id}>
                    <Link href={item.url}> {item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Features */}
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <div className="widget quick-links">
              <p className="footer-menu-heading">Features</p>
              <ul>
                {featureLinks.map((item) => (
                  <li key={item.id}>
                    <Link href={item.url}> {item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Addresses - FULLY DYNAMIC WITH SINGLE OR MULTIPLE LOCATIONS */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <div className="widget address">
              <p className="footer-menu-heading">Address</p>
              {locations.length === 0 ? (
                <p className="text-gray-400 text-xs">No address locations specified.</p>
              ) : (
                locations.map((loc) => (
                  <div key={loc.id} className="add-1 mb-3">
                    <p className="country-name font-bold text-white text-sm mb-1">{loc.title}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{loc.address}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Contact Details */}
          <div className="col-12 col-md-4">
            <ul className="widget contact-us">
              <li className="contact-col">
                <span className="icons-size">
                  <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                </span>
                <div className="contact-text">
                  <p>
                    <span>Email</span> <br />
                    <a
                      href="#"
                      onClick={handleCopyEmail}
                      className="click2copy"
                      id="footerEmail">
                      {contactEmail}{' '}
                      <i
                        className={`far ${
                          copied ? 'fa-check-circle text-[#00C8F8]' : 'fa-copy'
                        } copy-icon`}></i>
                    </a>
                  </p>
                </div>
              </li>
              <li className="contact-col">
                <span className="icons-size">
                  <i className="fa-solid fa-comments" aria-hidden="true"></i>
                </span>
                <div className="contact-text">
                  <p>
                    <span>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(
                            'Live Chat will connect you with a representative.',
                          );
                        }}>
                        {chatText}
                      </a>
                    </span>
                  </p>
                </div>
              </li>
              <li className="contact-col">
                <span className="icons-size">
                  <i className="fa-solid fa-phone" aria-hidden="true"></i>
                </span>
                <div className="contact-text">
                  <p>
                    <span>Toll Free Number</span> <br />
                    <a
                      href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
                      id="footerPhone">
                      {contactPhone}
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Social */}
        <div className="copyright">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-xxl-8 col-sm-12 col-md-6">
              <p>
                {copyrightText}{' '}
                <span className="mx-2 opacity-30">|</span>
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-white transition-colors underline decoration-dotted text-xs inline-flex items-center gap-1">
                  <i className="fa-solid fa-arrow-right-to-bracket text-[10px]"></i> Login
                </Link>
              </p>
            </div>
            <div className="col-xl-4 col-lg-4 col-xxl-4 col-sm-12 col-md-6">
              <div className="social-icons">
                <p>
                  Social connect :{' '}
                  <a
                    href={fbLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook">
                    <i
                      className="fa-brands fa-facebook-f"
                      aria-hidden="true"></i>
                  </a>
                  <a
                    href={twitterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter">
                    <i
                      className="fa-brands fa-x-twitter"
                      aria-hidden="true"></i>
                  </a>
                  <a
                    href={linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Linkedin">
                    <i
                      className="fa-brands fa-linkedin-in"
                      aria-hidden="true"></i>
                  </a>
                  <a
                    href={pinterestLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pinterest">
                    <i
                      className="fa-brands fa-pinterest-p"
                      aria-hidden="true"></i>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
