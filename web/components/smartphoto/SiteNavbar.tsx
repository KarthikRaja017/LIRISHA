'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/context/SettingsContext';
import { ServiceCategory } from '@/types/content';
import { getServices } from '@/lib/api/content';
import { FALLBACK_SERVICES } from '@/lib/api/fallbackServices';

export const SiteNavbar: React.FC = () => {
  const { getSettingValue } = useSettings();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'resources' | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const [services, setServices] = useState<ServiceCategory[]>(FALLBACK_SERVICES);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const logoUrl = getSettingValue('site_logo', '/images/lirisha-camera-logo.png');
  const siteName = getSettingValue('site_name', 'LIRISHA');
  const contactPhone = getSettingValue('contact_phone', '1-855-695-6028');

  // Track scroll position for dynamic glassmorphic elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch dynamic CMS services
  useEffect(() => {
    let isMounted = true;
    getServices()
      .then((data) => {
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileExpandedCat(null);
  }, [pathname]);

  const handleMouseEnter = (name: 'services' | 'resources') => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileExpandedCat(null);
  };

  // Helper icon selector for service categories
  const getCategoryIcon = (slug?: string, iconClass?: string) => {
    if (iconClass && iconClass.startsWith('fa')) {
      return <i className={`${iconClass} text-blue-600 text-sm`} aria-hidden="true" />;
    }
    const s = (slug || '').toLowerCase();
    if (s.includes('clipping')) return <i className="fa-solid fa-scissors text-blue-600 text-sm" />;
    if (s.includes('portrait')) return <i className="fa-solid fa-user text-blue-600 text-sm" />;
    if (s.includes('real-estate')) return <i className="fa-solid fa-building text-blue-600 text-sm" />;
    if (s.includes('ecommerce')) return <i className="fa-solid fa-cart-shopping text-blue-600 text-sm" />;
    if (s.includes('jewelry')) return <i className="fa-solid fa-gem text-blue-600 text-sm" />;
    if (s.includes('photoshop')) return <i className="fa-solid fa-wand-magic-sparkles text-blue-600 text-sm" />;
    if (s.includes('fashion')) return <i className="fa-solid fa-shirt text-blue-600 text-sm" />;
    return <i className="fa-solid fa-camera text-blue-600 text-sm" />;
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.06)]'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.02]"
              aria-label={`${siteName} Homepage`}
            >
              <img
                src={logoUrl || '/images/lirisha-camera-logo.png'}
                alt={`${siteName} logo`}
                className="h-10 sm:h-11 w-auto max-w-[170px] object-contain transition-all duration-200"
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
            <span className="hidden xl:inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50/90 border border-blue-200/60 px-2 py-0.5 rounded-full">
              Global Studio
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Services Dropdown (Mega-Menu) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                  activeDropdown === 'services' || pathname.startsWith('/services')
                    ? 'text-blue-600 bg-blue-50/70'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
                onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                aria-expanded={activeDropdown === 'services'}
              >
                <span>Services</span>
                <i
                  className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${
                    activeDropdown === 'services' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Mega-Flyout Panel */}
              {activeDropdown === 'services' && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[780px] xl:w-[880px] animate-in fade-in zoom-in-95 duration-150"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-6 overflow-hidden">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          Professional Photo Editing Services
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          High-volume studio outsourcing with 12–24h rush delivery
                        </p>
                      </div>
                      <Link
                        href="/services"
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/all"
                      >
                        <span>Browse All Services</span>
                        <i className="fa-solid fa-arrow-right text-[10px] transition-transform group-hover/all:translate-x-0.5" />
                      </Link>
                    </div>

                    {/* Services 3-Column Grid */}
                    <div className="grid grid-cols-3 gap-3.5">
                      {services.slice(0, 9).map((cat) => {
                        const catKey = cat.slug || cat.id;
                        const catUrl = `/${catKey}`;
                        return (
                          <Link
                            key={catKey}
                            href={catUrl}
                            className="group/item flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150 hover:bg-slate-50/90 border border-transparent hover:border-slate-200/60"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100/80 flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-600 group-hover/item:border-blue-600 transition-colors duration-150">
                              <span className="group-hover/item:text-white transition-colors">
                                {getCategoryIcon(cat.slug, cat.iconClass)}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-slate-800 group-hover/item:text-blue-600 transition-colors truncate">
                                {cat.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {cat.shortDesc || cat.tagline || 'Specialized post-processing'}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Highlight Footer Banner */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/80 -mx-6 -mb-6 px-6 py-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-medium text-slate-700">
                          Free Sample Edit: Test our quality with up to 5 trial images.
                        </span>
                      </div>
                      <Link
                        href="/contact-us"
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider"
                      >
                        Claim Free Trial →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Portfolio */}
            <Link
              href="/sample-images"
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                pathname === '/sample-images'
                  ? 'text-blue-600 bg-blue-50/70'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Portfolio
            </Link>

            {/* About Us */}
            <Link
              href="/about-us"
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                pathname === '/about-us'
                  ? 'text-blue-600 bg-blue-50/70'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              About Us
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('resources')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                  activeDropdown === 'resources' || pathname.startsWith('/resources')
                    ? 'text-blue-600 bg-blue-50/70'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
                onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                aria-expanded={activeDropdown === 'resources'}
              >
                <span>Resources</span>
                <i
                  className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${
                    activeDropdown === 'resources' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {activeDropdown === 'resources' && (
                <div
                  className="absolute top-full left-0 pt-2 w-64 animate-in fade-in zoom-in-95 duration-150"
                  onMouseEnter={() => handleMouseEnter('resources')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 overflow-hidden">
                    <Link
                      href="/blog"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 hover:text-blue-600"
                    >
                      <i className="fa-regular fa-newspaper text-slate-400 w-4 text-center" />
                      <div>
                        <div className="text-xs font-bold">Studio Blog</div>
                        <div className="text-[11px] text-slate-400">Industry insights & guides</div>
                      </div>
                    </Link>
                    <Link
                      href="/case-study"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 hover:text-blue-600"
                    >
                      <i className="fa-solid fa-chart-line text-slate-400 w-4 text-center" />
                      <div>
                        <div className="text-xs font-bold">Case Studies</div>
                        <div className="text-[11px] text-slate-400">Real client scaling results</div>
                      </div>
                    </Link>
                    <Link
                      href="/articles"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 hover:text-blue-600"
                    >
                      <i className="fa-solid fa-book-open text-slate-400 w-4 text-center" />
                      <div>
                        <div className="text-xs font-bold">Resource Articles</div>
                        <div className="text-[11px] text-slate-400">Technical workflows & tips</div>
                      </div>
                    </Link>
                    <Link
                      href="/testimonials"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 hover:text-blue-600"
                    >
                      <i className="fa-regular fa-comments text-slate-400 w-4 text-center" />
                      <div>
                        <div className="text-xs font-bold">Client Testimonials</div>
                        <div className="text-[11px] text-slate-400">Reviews from photographers</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Pricing */}
            <Link
              href="/pricing"
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                pathname === '/pricing'
                  ? 'text-blue-600 bg-blue-50/70'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Pricing
            </Link>

            {/* Contact */}
            <Link
              href="/contact-us"
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                pathname === '/contact-us'
                  ? 'text-blue-600 bg-blue-50/70'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Direct Phone Link */}
            {contactPhone && (
              <a
                href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
                className="hidden xl:inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100/70"
                title="Call our specialists"
              >
                <i className="fa-solid fa-phone text-blue-500 text-xs" />
                <span>{contactPhone}</span>
              </a>
            )}

            {/* Sign In Link (Common for Client & Admin) */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <i className="fa-regular fa-user text-xs opacity-75" />
              <span>Sign In</span>
            </Link>

            {/* Primary Action Button: Free Trial / Instant Quote */}
            <Link
              href="/contact-us"
              className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/35 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            >
              <span>Get Free Quote</span>
              <i className="fa-solid fa-arrow-right text-[10px] transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/login"
              className="px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 border border-slate-200 rounded-lg"
            >
              Sign In
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl border border-slate-200/90 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <i className="fa-solid fa-xmark text-lg" />
              ) : (
                <i className="fa-solid fa-bars text-base" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modern Slide-down Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white/98 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="px-4 py-5 space-y-3">
            {/* Mobile Services Accordion */}
            <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
              <button
                type="button"
                onClick={() =>
                  setMobileExpandedCat(mobileExpandedCat === 'services' ? null : 'services')
                }
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-800 text-left"
              >
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-layer-group text-blue-600 text-xs" />
                  Services
                </span>
                <i
                  className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${
                    mobileExpandedCat === 'services' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {mobileExpandedCat === 'services' && (
                <div className="px-3 pb-3 space-y-1.5 pt-1 border-t border-slate-200/60 bg-white">
                  {services.map((cat) => {
                    const catKey = cat.slug || cat.id;
                    const catUrl = `/${catKey}`;
                    return (
                      <Link
                        key={catKey}
                        href={catUrl}
                        onClick={closeMobileMenu}
                        className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-lg transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          {getCategoryIcon(cat.slug, cat.iconClass)}
                          {cat.name}
                        </span>
                        <i className="fa-solid fa-angle-right text-[10px] text-slate-400" />
                      </Link>
                    );
                  })}
                  <div className="pt-2 text-center">
                    <Link
                      href="/services"
                      onClick={closeMobileMenu}
                      className="text-xs font-bold text-blue-600 hover:underline block py-1"
                    >
                      View All Services Overview →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Nav Links */}
            <Link
              href="/sample-images"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <i className="fa-regular fa-image text-slate-400 w-4" />
              <span>Portfolio</span>
            </Link>

            <Link
              href="/about-us"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <i className="fa-regular fa-building text-slate-400 w-4" />
              <span>About Us</span>
            </Link>

            <Link
              href="/pricing"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <i className="fa-solid fa-tags text-slate-400 w-4" />
              <span>Pricing</span>
            </Link>

            {/* Mobile Resources Accordion */}
            <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
              <button
                type="button"
                onClick={() =>
                  setMobileExpandedCat(mobileExpandedCat === 'resources' ? null : 'resources')
                }
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-800 text-left"
              >
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-book text-blue-600 text-xs" />
                  Resources
                </span>
                <i
                  className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${
                    mobileExpandedCat === 'resources' ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {mobileExpandedCat === 'resources' && (
                <div className="px-3 pb-3 space-y-1 pt-1 border-t border-slate-200/60 bg-white">
                  <Link
                    href="/blog"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 rounded-lg"
                  >
                    <i className="fa-regular fa-newspaper text-slate-400 text-xs" />
                    <span>Studio Blog</span>
                  </Link>
                  <Link
                    href="/case-study"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 rounded-lg"
                  >
                    <i className="fa-solid fa-chart-line text-slate-400 text-xs" />
                    <span>Case Studies</span>
                  </Link>
                  <Link
                    href="/articles"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 rounded-lg"
                  >
                    <i className="fa-solid fa-book-open text-slate-400 text-xs" />
                    <span>Resource Articles</span>
                  </Link>
                  <Link
                    href="/testimonials"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 rounded-lg"
                  >
                    <i className="fa-regular fa-comments text-slate-400 text-xs" />
                    <span>Testimonials</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/contact-us"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <i className="fa-regular fa-envelope text-slate-400 w-4" />
              <span>Contact Us</span>
            </Link>

            {/* Mobile Actions Bottom */}
            <div className="pt-4 border-t border-slate-200/80 space-y-2.5">
              {contactPhone && (
                <a
                  href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors"
                >
                  <i className="fa-solid fa-phone text-blue-600" />
                  <span>Call {contactPhone}</span>
                </a>
              )}

              <Link
                href="/contact-us"
                onClick={closeMobileMenu}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-xl shadow-md transition-transform active:scale-98"
              >
                <span>Get Free Quote &amp; 5 Sample Edits</span>
                <i className="fa-solid fa-arrow-right text-[10px]" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
