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
  const [activeDropdown, setActiveDropdown] = useState<
    'services' | 'resources' | null
  >(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(
    null,
  );
  const [services, setServices] =
    useState<ServiceCategory[]>(FALLBACK_SERVICES);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const rawLogo = getSettingValue('site_logo', '');
  // Ensure we use the clean full horizontal brand logo
  const logoUrl =
    rawLogo && !rawLogo.includes('camera-logo')
      ? rawLogo
      : '/images/lirisha-logo-header.png';
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

  // Helper icon selector for service categories - inherits color dynamically
  const getCategoryIcon = (slug?: string, iconClass?: string) => {
    const base = 'text-sm transition-colors duration-150';
    if (iconClass) return <i className={`${iconClass} ${base}`} />;
    const s = (slug || '').toLowerCase();
    if (s.includes('clipping')) return <i className={`fa-solid fa-scissors ${base}`} />;
    if (s.includes('portrait')) return <i className={`fa-solid fa-user ${base}`} />;
    if (s.includes('real-estate')) return <i className={`fa-solid fa-building ${base}`} />;
    if (s.includes('ecommerce')) return <i className={`fa-solid fa-cart-shopping ${base}`} />;
    if (s.includes('jewelry')) return <i className={`fa-solid fa-gem ${base}`} />;
    if (s.includes('photoshop')) return <i className={`fa-solid fa-wand-magic-sparkles ${base}`} />;
    if (s.includes('fashion')) return <i className={`fa-solid fa-shirt ${base}`} />;
    if (s.includes('lightroom')) return <i className={`fa-solid fa-sliders ${base}`} />;
    if (s.includes('restoration')) return <i className={`fa-solid fa-clock-rotate-left ${base}`} />;
    return <i className={`fa-solid fa-camera ${base}`} />;
  };

  // Helper tagline selector for clean, concise service labels without ugly truncation
  const getCategoryTagline = (slug?: string, defaultDesc?: string) => {
    const s = (slug || '').toLowerCase();
    if (s.includes('ecommerce')) return 'Pure white #FFFFFF & shadow creation';
    if (s.includes('fashion')) return 'Ghost mannequin & studio apparel';
    if (s.includes('clipping')) return 'Handcrafted vector pen paths';
    if (s.includes('jewelry')) return 'Facet sparkle & high-end metal polish';
    if (s.includes('lightroom')) return 'Batch RAW color grading & correction';
    if (s.includes('restoration')) return 'Vintage scratch & damage repair';
    if (s.includes('photoshop')) return 'Creative retouch & photo composites';
    if (s.includes('real-estate')) return 'HDR exposure blending & twilight';
    if (s.includes('portrait')) return 'Skin smoothing & frequency separation';
    return defaultDesc || 'Specialized post-production';
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="flex items-center group transition-transform duration-200 hover:scale-[1.02]"
              aria-label={`${siteName} Homepage`}>
              <img
                src={logoUrl}
                alt={siteName}
                className="h-8 sm:h-9 w-auto object-contain transition-all duration-200"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/images/lirisha-logo-header.png') {
                    target.src = '/images/lirisha-logo-header.png';
                  }
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Services Dropdown (Mega-Menu) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}>
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-[13px] xl:text-[13.5px] font-medium rounded-lg transition-colors duration-150 whitespace-nowrap ${
                  activeDropdown === 'services' ||
                  pathname.startsWith('/services')
                    ? 'text-blue-600 bg-blue-50/80 font-semibold'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50/90'
                }`}
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === 'services' ? null : 'services',
                  )
                }
                aria-expanded={activeDropdown === 'services'}>
                <span>Services</span>
                <i
                  className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${
                    activeDropdown === 'services'
                      ? 'rotate-180 text-blue-600'
                      : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Mega-Flyout Panel */}
              {activeDropdown === 'services' && (
                <div
                  className="absolute top-full -left-2 xl:-left-4 pt-2.5 w-[760px] xl:w-[820px] animate-in fade-in-50 zoom-in-95 duration-150 z-50"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18),0_0_1px_1px_rgba(15,23,42,0.06)] border border-slate-200/90 p-5 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
                          <i className="fa-solid fa-layer-group" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 leading-none">
                            Studio Photo Editing Services
                          </h3>
                          <p className="text-[11.5px] text-slate-500 mt-1">
                            High-volume studio outsourcing • 12–24h rush delivery • ISO 9001 certified
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/70 hover:bg-blue-100/70 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                      >
                        <span>Browse All Services</span>
                        <i className="fa-solid fa-arrow-right text-[10px]" />
                      </Link>
                    </div>

                    {/* Services 3-Column Grid */}
                    <div className="grid grid-cols-3 gap-2.5">
                      {services.slice(0, 9).map((cat) => {
                        const catKey = cat.slug || cat.id;
                        const catUrl = `/${catKey}`;
                        return (
                          <Link
                            key={catKey}
                            href={catUrl}
                            className="group/item flex items-center gap-3 p-2.5 rounded-xl transition-all duration-150 hover:bg-slate-50 border border-transparent hover:border-slate-200/70 hover:shadow-xs"
                          >
                            <div className="w-9 h-9 rounded-xl bg-blue-50/90 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white group-hover/item:border-blue-600 transition-all duration-150 shadow-xs">
                              {getCategoryIcon(cat.slug, cat.iconClass)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[12.5px] font-bold text-slate-800 group-hover/item:text-blue-600 transition-colors truncate">
                                  {cat.name}
                                </h4>
                                <i className="fa-solid fa-chevron-right text-[8.5px] text-slate-300 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-blue-500 transition-all duration-150" />
                              </div>
                              <p className="text-[11px] text-slate-400 group-hover/item:text-slate-500 transition-colors truncate mt-0.5">
                                {getCategoryTagline(cat.slug, cat.shortDesc)}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Highlight Footer Banner */}
                    <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/80 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="font-semibold text-slate-900">Try Before You Commit:</span>
                        <span className="text-slate-500 hidden sm:inline">Test our speed &amp; quality with up to 5 free trial images.</span>
                      </div>
                      <Link
                        href="/contact-us"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 hover:border-blue-600 bg-white px-3 py-1.5 rounded-full transition-all duration-150 shadow-xs whitespace-nowrap"
                      >
                        <span>Claim 5 Free Edits</span>
                        <i className="fa-solid fa-arrow-right text-[10px]" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Portfolio */}
            <Link
              href="/sample-images"
              className={`px-3 py-2 text-[13px] xl:text-[13.5px] font-medium rounded-lg transition-colors duration-150 whitespace-nowrap ${
                pathname === '/sample-images'
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50/90'
              }`}>
              Portfolio
            </Link>

            {/* About Us */}
            <Link
              href="/about-us"
              className={`px-3 py-2 text-[13px] xl:text-[13.5px] font-medium rounded-lg transition-colors duration-150 whitespace-nowrap ${
                pathname === '/about-us'
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50/90'
              }`}>
              About Us
            </Link>

            {/* Pricing */}
            <Link
              href="/pricing"
              className={`px-3 py-2 text-[13px] xl:text-[13.5px] font-medium rounded-lg transition-colors duration-150 whitespace-nowrap ${
                pathname === '/pricing'
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50/90'
              }`}>
              Pricing
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('resources')}
              onMouseLeave={handleMouseLeave}>
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-[13px] xl:text-[13.5px] font-medium rounded-lg transition-colors duration-150 whitespace-nowrap ${
                  activeDropdown === 'resources' ||
                  pathname.startsWith('/resources')
                    ? 'text-blue-600 bg-blue-50/80 font-semibold'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50/90'
                }`}
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === 'resources' ? null : 'resources',
                  )
                }
                aria-expanded={activeDropdown === 'resources'}>
                <span>Resources</span>
                <i
                  className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${
                    activeDropdown === 'resources'
                      ? 'rotate-180 text-blue-600'
                      : 'text-slate-400'
                  }`}
                />
              </button>

              {activeDropdown === 'resources' && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-72 animate-in fade-in-50 zoom-in-95 duration-150 z-50"
                  onMouseEnter={() => handleMouseEnter('resources')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_-15px_rgba(15,23,42,0.18),0_0_1px_1px_rgba(15,23,42,0.06)] border border-slate-200/90 p-2.5 overflow-hidden">
                    <Link
                      href="/blog"
                      className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/70 transition-all duration-150 whitespace-nowrap"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-150">
                        <i className="fa-regular fa-newspaper text-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Studio Blog</div>
                        <div className="text-[11px] text-slate-400 group-hover:text-slate-500">Industry insights &amp; guides</div>
                      </div>
                      <i className="fa-solid fa-chevron-right text-[8px] text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-blue-500 transition-all" />
                    </Link>
                    <Link
                      href="/case-study"
                      className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/70 transition-all duration-150 whitespace-nowrap"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-150">
                        <i className="fa-solid fa-chart-line text-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Case Studies</div>
                        <div className="text-[11px] text-slate-400 group-hover:text-slate-500">Real client scaling results</div>
                      </div>
                      <i className="fa-solid fa-chevron-right text-[8px] text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-blue-500 transition-all" />
                    </Link>
                    <Link
                      href="/articles"
                      className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/70 transition-all duration-150 whitespace-nowrap"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-150">
                        <i className="fa-solid fa-book-open text-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Resource Articles</div>
                        <div className="text-[11px] text-slate-400 group-hover:text-slate-500">Technical workflows &amp; tips</div>
                      </div>
                      <i className="fa-solid fa-chevron-right text-[8px] text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-blue-500 transition-all" />
                    </Link>
                    <Link
                      href="/testimonials"
                      className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/70 transition-all duration-150 whitespace-nowrap"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-150">
                        <i className="fa-regular fa-comments text-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Client Testimonials</div>
                        <div className="text-[11px] text-slate-400 group-hover:text-slate-500">Reviews from photographers</div>
                      </div>
                      <i className="fa-solid fa-chevron-right text-[8px] text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-blue-500 transition-all" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Contact */}{/* Contact */}
            <Link
              href="/contact-us"
              className={`px-3 py-2 text-[13px] xl:text-[13.5px] font-medium rounded-lg transition-colors duration-150 whitespace-nowrap ${
                pathname === '/contact-us'
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50/90'
              }`}>
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            <div className="hidden xl:block h-4 w-px bg-slate-200/90 mr-1" />

            {/* Primary Action Button: Free Trial / Instant Quote */}
            <Link
              href="/contact-us"
              className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-sm shadow-blue-500/20 transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 whitespace-nowrap">
              <span>Get Free Quote</span>
              <i className="fa-solid fa-arrow-right text-[10px] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm">
              <span>Free Quote</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isOpen}>
              {isOpen ? (
                <i className="fa-solid fa-xmark text-lg text-slate-800" />
              ) : (
                <i className="fa-solid fa-bars text-lg text-slate-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Accordion Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white/98 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            {/* Direct Links */}
            <div className="space-y-1">
              <Link
                href="/services"
                onClick={closeMobileMenu}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                <span>All Services</span>
                <i className="fa-solid fa-chevron-right text-xs text-slate-400" />
              </Link>

              {/* Services Sub-Accordion */}
              <div className="pl-3 pr-1 py-1 space-y-1 border-l-2 border-blue-100 my-1">
                {services.slice(0, 7).map((cat) => {
                  const catKey = cat.slug || cat.id;
                  const isExpanded = mobileExpandedCat === catKey;
                  return (
                    <div key={catKey}>
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/${catKey}`}
                          onClick={closeMobileMenu}
                          className="flex items-center gap-2 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600">
                          <span className="w-5 text-center text-xs text-blue-600">
                            {getCategoryIcon(cat.slug, cat.iconClass)}
                          </span>
                          <span>{cat.name}</span>
                        </Link>
                        {cat.subServices && cat.subServices.length > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              setMobileExpandedCat(isExpanded ? null : catKey)
                            }
                            className="p-1 text-slate-400 hover:text-slate-600"
                            aria-label={`Expand ${cat.name}`}>
                            <i
                              className={`fa-solid fa-chevron-down text-[10px] transition-transform ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Sub-services list */}
                      {isExpanded && cat.subServices && (
                        <div className="pl-7 py-1 space-y-1 bg-slate-50/60 rounded-lg my-1">
                          {cat.subServices.slice(0, 5).map((sub, sIdx) => {
                            const subLink = sub.link
                              ? sub.link.replace(/\.php$/, '')
                              : `/${catKey}/${sub.id || ''}`;
                            return (
                              <Link
                                key={sIdx}
                                href={subLink}
                                onClick={closeMobileMenu}
                                className="block py-1 text-[11px] text-slate-600 hover:text-blue-600 truncate">
                                {sub.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <Link
                href="/sample-images"
                onClick={closeMobileMenu}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                <span>Portfolio</span>
                <i className="fa-solid fa-chevron-right text-xs text-slate-400" />
              </Link>

              <Link
                href="/about-us"
                onClick={closeMobileMenu}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                <span>About Us</span>
                <i className="fa-solid fa-chevron-right text-xs text-slate-400" />
              </Link>

              <Link
                href="/pricing"
                onClick={closeMobileMenu}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                <span>Pricing</span>
                <i className="fa-solid fa-chevron-right text-xs text-slate-400" />
              </Link>

              <Link
                href="/blog"
                onClick={closeMobileMenu}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                <span>Studio Blog</span>
                <i className="fa-solid fa-chevron-right text-xs text-slate-400" />
              </Link>

              <Link
                href="/contact-us"
                onClick={closeMobileMenu}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                <span>Contact Us</span>
                <i className="fa-solid fa-chevron-right text-xs text-slate-400" />
              </Link>
            </div>

            {/* Mobile Contact & Sign In Actions */}
            <div className="pt-4 border-t border-slate-200/80 space-y-3">
              {contactPhone && (
                <a
                  href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
                  <i className="fa-solid fa-phone text-blue-600 text-xs" />
                  <span>Call {contactPhone}</span>
                </a>
              )}

              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                <i className="fa-regular fa-user text-xs" />
                <span>Sign In to Portal</span>
              </Link>

              <Link
                href="/contact-us"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25">
                <span>Get Free Quote &amp; 5 Free Edits</span>
                <i className="fa-solid fa-arrow-right text-xs" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteNavbar;
