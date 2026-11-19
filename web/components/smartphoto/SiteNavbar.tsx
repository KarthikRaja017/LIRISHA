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
  const [activeServiceTab, setActiveServiceTab] = useState<
    'real-estate' | 'image-clipping' | 'portrait' | 'wedding'
  >('real-estate');
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(
    'real-estate',
  );
  const [services, setServices] =
    useState<ServiceCategory[]>(FALLBACK_SERVICES);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const rawLogo = getSettingValue('site_logo', '');
  const logoUrl =
    rawLogo && !rawLogo.includes('camera-logo')
      ? rawLogo
      : '/images/lirisha-logo-header.png';
  const siteName = getSettingValue('site_name', 'LIRISHA');

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
    setMobileExpandedCat('real-estate');
  }, [pathname]);

  const handleMouseEnter = (name: 'services' | 'resources') => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileExpandedCat(null);
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
            {/* Services Mega-Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}>
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[13.5px] font-medium rounded-lg transition-all duration-150 outline-none focus:outline-none focus:ring-0 select-none whitespace-nowrap ${
                  activeDropdown === 'services' ||
                  pathname.startsWith('/services') ||
                  pathname.startsWith('/real-estate') ||
                  pathname.startsWith('/image-clipping') ||
                  pathname.startsWith('/portrait') ||
                  pathname.startsWith('/wedding')
                    ? 'text-blue-600 bg-blue-50/80 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === 'services' ? null : 'services',
                  )
                }
                aria-expanded={activeDropdown === 'services'}>
                <span>Services</span>
                <i
                  className={`fa-solid fa-chevron-down text-[9.5px] transition-transform duration-200 ${
                    activeDropdown === 'services'
                      ? 'rotate-180 text-blue-600'
                      : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Mega-Flyout Panel */}
              {activeDropdown === 'services' && (
                <div
                  className="absolute top-full -left-2 xl:-left-6 pt-2.5 w-[920px] xl:w-[980px] animate-in fade-in-50 zoom-in-95 duration-150 z-50"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}>
                  <div
                    className="bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(15,23,42,0.25),0_0_1px_1px_rgba(15,23,42,0.08)] border border-slate-200/90 p-5 overflow-hidden"
                    style={{ backgroundColor: '#ffffff' }}>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shadow-xs">
                          <i className="fa-solid fa-layer-group" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 leading-none">
                            Professional Photo Editing Services
                          </h3>
                          <p className="text-[11.5px] text-slate-500 mt-1">
                            High-volume studio outsourcing • 12–24h rush
                            delivery • ISO 9001 certified
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 bg-slate-100/80 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-slate-200/60 hover:border-blue-200 transition-all duration-150 whitespace-nowrap">
                        <span>All Services Hub</span>
                        <i className="fa-solid fa-arrow-right text-[10px]" />
                      </Link>
                    </div>

                    {/* Interactive 2-Panel Layout: Category Tabs on Left, Full Sub-services on Right */}
                    <div className="grid grid-cols-12 gap-4">
                      {/* Left Navigation Tabs (4 services only) */}
                      <div className="col-span-4 space-y-1.5 border-r border-slate-100 pr-3">
                        <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 px-2.5 py-1">
                          Select Service Category
                        </div>

                        {/* 1. Real Estate Tab */}
                        <div
                          onMouseEnter={() => setActiveServiceTab('real-estate')}
                          className={`group p-2.5 rounded-xl cursor-pointer transition-all border ${
                            activeServiceTab === 'real-estate'
                              ? 'bg-blue-50/90 border-blue-200 shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-transparent'
                          }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors ${
                                  activeServiceTab === 'real-estate'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                                }`}>
                                <i className="fa-solid fa-house-chimney" />
                              </div>
                              <div>
                                <Link
                                  href="/real-estate"
                                  className={`text-[13px] font-bold block ${
                                    activeServiceTab === 'real-estate'
                                      ? 'text-blue-700'
                                      : 'text-slate-800 group-hover:text-blue-600'
                                  }`}>
                                  Real Estate Image Editing
                                </Link>
                                <span className="text-[11px] text-slate-500 block">
                                  12 Services + Floor Plans
                                </span>
                              </div>
                            </div>
                            <i
                              className={`fa-solid fa-chevron-right text-[10px] transition-transform ${
                                activeServiceTab === 'real-estate'
                                  ? 'text-blue-600 translate-x-0.5'
                                  : 'text-slate-300'
                              }`}
                            />
                          </div>
                        </div>

                        {/* 2. Image Clipping Tab */}
                        <div
                          onMouseEnter={() =>
                            setActiveServiceTab('image-clipping')
                          }
                          className={`group p-2.5 rounded-xl cursor-pointer transition-all border ${
                            activeServiceTab === 'image-clipping'
                              ? 'bg-blue-50/90 border-blue-200 shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-transparent'
                          }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors ${
                                  activeServiceTab === 'image-clipping'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                                }`}>
                                <i className="fa-solid fa-scissors" />
                              </div>
                              <div>
                                <Link
                                  href="/image-clipping"
                                  className={`text-[13px] font-bold block ${
                                    activeServiceTab === 'image-clipping'
                                      ? 'text-blue-700'
                                      : 'text-slate-800 group-hover:text-blue-600'
                                  }`}>
                                  Image Clipping Services
                                </Link>
                                <span className="text-[11px] text-slate-500 block">
                                  Background Removal &amp; Paths
                                </span>
                              </div>
                            </div>
                            <i
                              className={`fa-solid fa-chevron-right text-[10px] transition-transform ${
                                activeServiceTab === 'image-clipping'
                                  ? 'text-blue-600 translate-x-0.5'
                                  : 'text-slate-300'
                              }`}
                            />
                          </div>
                        </div>

                        {/* 3. Portrait Editing Tab */}
                        <div
                          onMouseEnter={() => setActiveServiceTab('portrait')}
                          className={`group p-2.5 rounded-xl cursor-pointer transition-all border ${
                            activeServiceTab === 'portrait'
                              ? 'bg-blue-50/90 border-blue-200 shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-transparent'
                          }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors ${
                                  activeServiceTab === 'portrait'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                                }`}>
                                <i className="fa-solid fa-user-check" />
                              </div>
                              <div>
                                <Link
                                  href="/portrait"
                                  className={`text-[13px] font-bold block ${
                                    activeServiceTab === 'portrait'
                                      ? 'text-blue-700'
                                      : 'text-slate-800 group-hover:text-blue-600'
                                  }`}>
                                  Portrait Editing Services
                                </Link>
                                <span className="text-[11px] text-slate-500 block">
                                  Dedicated Menu &amp; Page
                                </span>
                              </div>
                            </div>
                            <i
                              className={`fa-solid fa-chevron-right text-[10px] transition-transform ${
                                activeServiceTab === 'portrait'
                                  ? 'text-blue-600 translate-x-0.5'
                                  : 'text-slate-300'
                              }`}
                            />
                          </div>
                        </div>

                        {/* 4. Wedding Photo Post Processing Tab */}
                        <div
                          onMouseEnter={() => setActiveServiceTab('wedding')}
                          className={`group p-2.5 rounded-xl cursor-pointer transition-all border ${
                            activeServiceTab === 'wedding'
                              ? 'bg-blue-50/90 border-blue-200 shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-transparent'
                          }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors ${
                                  activeServiceTab === 'wedding'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                                }`}>
                                <i className="fa-solid fa-camera-retro" />
                              </div>
                              <div>
                                <Link
                                  href="/wedding-photo-post-processing"
                                  className={`text-[13px] font-bold block ${
                                    activeServiceTab === 'wedding'
                                      ? 'text-blue-700'
                                      : 'text-slate-800 group-hover:text-blue-600'
                                  }`}>
                                  Wedding Photo Post Processing
                                </Link>
                                <span className="text-[11px] text-slate-500 block">
                                  Dedicated Menu &amp; Page
                                </span>
                              </div>
                            </div>
                            <i
                              className={`fa-solid fa-chevron-right text-[10px] transition-transform ${
                                activeServiceTab === 'wedding'
                                  ? 'text-blue-600 translate-x-0.5'
                                  : 'text-slate-300'
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right Detail Pane: Dynamic Based on Active Tab */}
                      <div className="col-span-8 pl-1">
                        {/* 1. REAL ESTATE VIEW */}
                        {activeServiceTab === 'real-estate' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                                  Real Estate Services
                                </span>
                                <span className="text-[10px] font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                  All 12 Services + Floor Plans
                                </span>
                              </div>
                              <Link
                                href="/real-estate"
                                className="text-xs font-semibold text-blue-600 hover:underline">
                                View Real Estate Hub &rarr;
                              </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                              <Link
                                href="/real-estate/image-enhancement"
                                className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-xs font-medium text-slate-800 group-hover/item:text-blue-600 truncate">
                                  Image Enhancement
                                </span>
                              </Link>
                              <Link
                                href="/real-estate/hdr-blending"
                                className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-xs font-medium text-slate-800 group-hover/item:text-blue-600 truncate">
                                  HDR Blending
                                </span>
                              </Link>
                              <Link
                                href="/real-estate/aerial-editing"
                                className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-xs font-medium text-slate-800 group-hover/item:text-blue-600 truncate">
                                  Aerial Editing
                                </span>
                              </Link>
                              <Link
                                href="/real-estate/360-panorama"
                                className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-xs font-medium text-slate-800 group-hover/item:text-blue-600 truncate">
                                  360 Panorama
                                </span>
                              </Link>
                              <Link
                                href="/real-estate/360-image-enhancement"
                                className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-xs font-medium text-slate-800 group-hover/item:text-blue-600 truncate">
                                  360 Image Enhancement
                                </span>
                              </Link>
                              <Link
                                href="/real-estate/digital-declutter-item-removal"
                                className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-xs font-medium text-slate-800 group-hover/item:text-blue-600 truncate">
                                  Digital Declutter / Item Removal
                                </span>
                              </Link>
                              <Link
                                href="/real-estate/day-to-dusk-conversion"
                                className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                <span className="text-xs font-medium text-slate-800 group-hover/item:text-amber-600 truncate">
                                  Day to Dusk Conversion (Virtual Twilight)
                                </span>
                              </Link>
                              <Link
                                href="/real-estate/sky-replacement-services"
                                className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-xs font-medium text-slate-800 group-hover/item:text-blue-600 truncate">
                                  Sky Replacement Services
                                </span>
                              </Link>
                              <Link
                                href="/real-estate/virtual-staging-and-renovation"
                                className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                <span className="text-xs font-medium text-slate-800 group-hover/item:text-indigo-600 truncate">
                                  Virtual Staging and Renovation
                                </span>
                              </Link>
                              <Link
                                href="/real-estate/360-virtual-tours"
                                className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                <span className="text-xs font-medium text-slate-800 group-hover/item:text-indigo-600 truncate">
                                  360 Virtual Tours
                                </span>
                              </Link>
                              <Link
                                href="/real-estate/real-estate-video-editing"
                                className="group/item flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors col-span-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                <span className="text-xs font-medium text-slate-800 group-hover/item:text-rose-600 truncate">
                                  Real Estate Video Editing
                                </span>
                              </Link>
                            </div>

                            {/* Sub-group: Floor Plans with Sub-services */}
                            <div className="mt-2 pt-2.5 border-t border-slate-100 bg-gradient-to-r from-blue-50/60 to-slate-50 p-2.5 rounded-xl border border-blue-100/70">
                              <div className="flex items-center justify-between mb-1.5">
                                <Link
                                  href="/real-estate/floor-plans"
                                  className="text-xs font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1.5">
                                  <i className="fa-solid fa-ruler-combined text-blue-600 text-[11px]" />
                                  <span>Floor Plans (with sub-services):</span>
                                </Link>
                                <span className="text-[10px] text-blue-600 font-semibold">
                                  CAD &amp; 3D Drafting
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <Link
                                  href="/real-estate/floor-plans/2d-floor-plan"
                                  className="text-[11.5px] font-medium text-slate-700 hover:text-blue-600 bg-white px-2 py-1 rounded-md border border-slate-200/80 shadow-2xs hover:border-blue-300">
                                  • 2D Floor Plan
                                </Link>
                                <Link
                                  href="/real-estate/floor-plans/3d-floor-plan"
                                  className="text-[11.5px] font-medium text-slate-700 hover:text-blue-600 bg-white px-2 py-1 rounded-md border border-slate-200/80 shadow-2xs hover:border-blue-300">
                                  • 3D Floor Plan
                                </Link>
                                <Link
                                  href="/real-estate/floor-plans/site-plan"
                                  className="text-[11.5px] font-medium text-slate-700 hover:text-blue-600 bg-white px-2 py-1 rounded-md border border-slate-200/80 shadow-2xs hover:border-blue-300">
                                  • Site Plan
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 2. IMAGE CLIPPING VIEW */}
                        {activeServiceTab === 'image-clipping' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                                Image Clipping Services (Dropdown)
                              </span>
                              <Link
                                href="/image-clipping"
                                className="text-xs font-semibold text-blue-600 hover:underline">
                                View Clipping Hub &rarr;
                              </Link>
                            </div>

                            <div className="space-y-2">
                              {/* Dedicated requested item: Background Removal Services */}
                              <Link
                                href="/image-clipping/background-removal-services"
                                className="group flex items-start gap-3 p-3 rounded-xl bg-blue-50/50 hover:bg-blue-50 border border-blue-100 transition-all">
                                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm shrink-0 shadow-xs">
                                  <i className="fa-solid fa-eraser" />
                                </div>
                                <div>
                                  <div className="text-[13.5px] font-bold text-slate-900 group-hover:text-blue-600">
                                    Background Removal Services
                                  </div>
                                  <div className="text-xs text-slate-600 mt-0.5 leading-snug">
                                    Handcrafted pen tool clipping paths, pure
                                    white #FFFFFF Amazon backgrounds, and soft
                                    commercial drop shadow creation.
                                  </div>
                                </div>
                              </Link>

                              <Link
                                href="/image-clipping/clipping-path-services"
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-all">
                                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-sm shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600">
                                  <i className="fa-solid fa-bezier-curve" />
                                </div>
                                <div>
                                  <div className="text-[13px] font-bold text-slate-800 group-hover:text-blue-600">
                                    Handcrafted Vector Clipping Paths
                                  </div>
                                  <div className="text-xs text-slate-500 mt-0.5 leading-snug">
                                    Sub-pixel vector pen paths embedded directly
                                    into PSD layers for print and packaging.
                                  </div>
                                </div>
                              </Link>

                              <Link
                                href="/image-clipping/hair-masking"
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-all">
                                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-sm shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600">
                                  <i className="fa-solid fa-mask" />
                                </div>
                                <div>
                                  <div className="text-[13px] font-bold text-slate-800 group-hover:text-blue-600">
                                    Hair Masking &amp; Alpha Channels
                                  </div>
                                  <div className="text-xs text-slate-500 mt-0.5 leading-snug">
                                    Complex isolation for fine flyaway hair,
                                    fur, transparent glass, and intricate edges.
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        )}

                        {/* 3. PORTRAIT EDITING VIEW */}
                        {activeServiceTab === 'portrait' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                                Portrait Editing Services (Dedicated Menu &amp;
                                Page)
                              </span>
                              <Link
                                href="/portrait"
                                className="text-xs font-semibold text-blue-600 hover:underline">
                                Go to Portrait Page &rarr;
                              </Link>
                            </div>

                            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/80 to-slate-50 border border-blue-100 space-y-3">
                              <div className="flex items-start gap-3.5">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-base shrink-0 shadow-sm">
                                  <i className="fa-solid fa-user-check" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-slate-900">
                                    Natural, Magazine-Grade Portrait Retouching
                                  </h4>
                                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                    Preserves 100% authentic skin pore texture
                                    using advanced Frequency Separation and
                                    micro Dodge &amp; Burn. Never plastic or
                                    over-processed.
                                  </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-blue-100/80">
                                <div className="text-xs text-slate-700 flex items-center gap-1.5">
                                  <i className="fa-solid fa-check text-blue-600 text-[10px]" />
                                  <span>Frequency Separation</span>
                                </div>
                                <div className="text-xs text-slate-700 flex items-center gap-1.5">
                                  <i className="fa-solid fa-check text-blue-600 text-[10px]" />
                                  <span>Corporate Headshot Grooming</span>
                                </div>
                                <div className="text-xs text-slate-700 flex items-center gap-1.5">
                                  <i className="fa-solid fa-check text-blue-600 text-[10px]" />
                                  <span>Teeth &amp; Eye Sparkle</span>
                                </div>
                                <div className="text-xs text-slate-700 flex items-center gap-1.5">
                                  <i className="fa-solid fa-check text-blue-600 text-[10px]" />
                                  <span>Stray Hair &amp; Lint Cleanup</span>
                                </div>
                              </div>

                              <div className="pt-2">
                                <Link
                                  href="/portrait"
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs">
                                  <span>Open Dedicated Portrait Page</span>
                                  <i className="fa-solid fa-arrow-right text-[10px]" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 4. WEDDING PHOTO POST PROCESSING VIEW */}
                        {activeServiceTab === 'wedding' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                                Wedding Photo Post Processing (Dedicated Menu
                                &amp; Page)
                              </span>
                              <Link
                                href="/wedding-photo-post-processing"
                                className="text-xs font-semibold text-blue-600 hover:underline">
                                Go to Wedding Page &rarr;
                              </Link>
                            </div>

                            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/80 to-slate-50 border border-indigo-100 space-y-3">
                              <div className="flex items-start gap-3.5">
                                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-base shrink-0 shadow-sm">
                                  <i className="fa-solid fa-camera-retro" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-slate-900">
                                    High-Volume Wedding RAW Culling &amp; Color
                                    Grading
                                  </h4>
                                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                    Dedicated backend post-production studio for
                                    wedding photographers. We calibrate to your
                                    exact Lightroom presets, balance erratic
                                    lighting, and deliver ready-to-print albums.
                                  </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-indigo-100/80">
                                <div className="text-xs text-slate-700 flex items-center gap-1.5">
                                  <i className="fa-solid fa-check text-indigo-600 text-[10px]" />
                                  <span>Lightroom Preset Calibration</span>
                                </div>
                                <div className="text-xs text-slate-700 flex items-center gap-1.5">
                                  <i className="fa-solid fa-check text-indigo-600 text-[10px]" />
                                  <span>Smart 3,000+ RAW Culling</span>
                                </div>
                                <div className="text-xs text-slate-700 flex items-center gap-1.5">
                                  <i className="fa-solid fa-check text-indigo-600 text-[10px]" />
                                  <span>Church &amp; Sunset Tone Harmonization</span>
                                </div>
                                <div className="text-xs text-slate-700 flex items-center gap-1.5">
                                  <i className="fa-solid fa-check text-indigo-600 text-[10px]" />
                                  <span>Hero Bride &amp; Groom Retouching</span>
                                </div>
                              </div>

                              <div className="pt-2">
                                <Link
                                  href="/wedding-photo-post-processing"
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs">
                                  <span>Open Dedicated Wedding Page</span>
                                  <i className="fa-solid fa-arrow-right text-[10px]" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Highlight Footer Banner */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/80 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="font-semibold text-slate-900">
                          Try Before You Commit:
                        </span>
                        <span className="text-slate-500 hidden sm:inline">
                          Test our speed &amp; quality with up to 5 free trial
                          images.
                        </span>
                      </div>
                      <Link
                        href="/contact-us"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-1.5 rounded-full shadow-xs hover:shadow transition-all duration-150 whitespace-nowrap">
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
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 outline-none focus:outline-none'
              }`}>
              Portfolio
            </Link>

            {/* About Us */}
            <Link
              href="/about-us"
              className={`px-3 py-2 text-[13px] xl:text-[13.5px] font-medium rounded-lg transition-colors duration-150 whitespace-nowrap ${
                pathname === '/about-us'
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 outline-none focus:outline-none'
              }`}>
              About Us
            </Link>

            {/* Pricing */}
            <Link
              href="/pricing"
              className={`px-3 py-2 text-[13px] xl:text-[13.5px] font-medium rounded-lg transition-colors duration-150 whitespace-nowrap ${
                pathname === '/pricing'
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 outline-none focus:outline-none'
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
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[13.5px] font-medium rounded-lg transition-all duration-150 outline-none focus:outline-none focus:ring-0 select-none whitespace-nowrap ${
                  activeDropdown === 'resources' ||
                  pathname.startsWith('/resources')
                    ? 'text-blue-600 bg-blue-50/80 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === 'resources' ? null : 'resources',
                  )
                }
                aria-expanded={activeDropdown === 'resources'}>
                <span>Resources</span>
                <i
                  className={`fa-solid fa-chevron-down text-[9.5px] transition-transform duration-200 ${
                    activeDropdown === 'resources'
                      ? 'rotate-180 text-blue-600'
                      : 'text-slate-400'
                  }`}
                />
              </button>

              {activeDropdown === 'resources' && (
                <div
                  className="absolute top-full right-0 pt-2.5 w-[320px] animate-in fade-in-50 zoom-in-95 duration-150 z-50"
                  onMouseEnter={() => handleMouseEnter('resources')}
                  onMouseLeave={handleMouseLeave}>
                  <div className="bg-white rounded-2xl shadow-[0_20px_50px_-10px_rgba(15,23,42,0.25),0_0_1px_1px_rgba(15,23,42,0.08)] border border-slate-200/90 p-3 space-y-1">
                    <Link
                      href="/blog"
                      className="group flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100/80 transition-colors w-full">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <i className="fa-regular fa-newspaper text-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-semibold text-slate-800 group-hover:text-blue-600">
                          Studio Blog
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          Industry insights &amp; retouching guides
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/case-study"
                      className="group flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100/80 transition-colors w-full">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <i className="fa-solid fa-chart-line text-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-semibold text-slate-800 group-hover:text-blue-600">
                          Case Studies
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          Real client scale &amp; turnaround results
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/articles"
                      className="group flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100/80 transition-colors w-full">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <i className="fa-solid fa-book-open text-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-semibold text-slate-800 group-hover:text-blue-600">
                          Resource Articles
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          Technical retouching workflows &amp; tips
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/testimonials"
                      className="group flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100/80 transition-colors w-full">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <i className="fa-regular fa-comments text-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-semibold text-slate-800 group-hover:text-blue-600">
                          Client Testimonials
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          Verified feedback from studio partners
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Contact */}
            <Link
              href="/contact-us"
              className={`px-3 py-2 text-[13px] xl:text-[13.5px] font-medium rounded-lg transition-colors duration-150 whitespace-nowrap ${
                pathname === '/contact-us'
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 outline-none focus:outline-none'
              }`}>
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
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
        <div className="lg:hidden border-t border-slate-200/80 bg-white shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            <div className="space-y-1">
              {/* Services Mobile Category */}
              <div className="font-bold text-xs uppercase tracking-wider text-blue-600 px-3 py-1">
                Services
              </div>

              {/* 1. Real Estate Accordion */}
              <div>
                <div className="flex items-center justify-between px-3 py-2 rounded-xl font-bold text-slate-900 hover:bg-slate-50">
                  <Link
                    href="/real-estate"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 text-slate-900">
                    <i className="fa-solid fa-house-chimney text-blue-600 text-sm" />
                    <span>Real Estate Image Editing</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedCat(
                        mobileExpandedCat === 'real-estate'
                          ? null
                          : 'real-estate',
                      )
                    }
                    className="p-1 text-slate-400 hover:text-slate-600">
                    <i
                      className={`fa-solid fa-chevron-down text-xs transition-transform ${
                        mobileExpandedCat === 'real-estate' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                {mobileExpandedCat === 'real-estate' && (
                  <div className="pl-6 py-1 space-y-1 bg-slate-50/70 rounded-xl my-1 border-l-2 border-blue-200">
                    <Link
                      href="/real-estate/image-enhancement"
                      onClick={closeMobileMenu}
                      className="block py-1 text-xs text-slate-700 hover:text-blue-600">
                      Image Enhancement
                    </Link>
                    <Link
                      href="/real-estate/hdr-blending"
                      onClick={closeMobileMenu}
                      className="block py-1 text-xs text-slate-700 hover:text-blue-600">
                      HDR Blending
                    </Link>
                    <Link
                      href="/real-estate/aerial-editing"
                      onClick={closeMobileMenu}
                      className="block py-1 text-xs text-slate-700 hover:text-blue-600">
                      Aerial Editing
                    </Link>
                    <Link
                      href="/real-estate/360-panorama"
                      onClick={closeMobileMenu}
                      className="block py-1 text-xs text-slate-700 hover:text-blue-600">
                      360 Panorama
                    </Link>
                    <Link
                      href="/real-estate/360-image-enhancement"
                      onClick={closeMobileMenu}
                      className="block py-1 text-xs text-slate-700 hover:text-blue-600">
                      360 Image Enhancement
                    </Link>
                    <Link
                      href="/real-estate/digital-declutter-item-removal"
                      onClick={closeMobileMenu}
                      className="block py-1 text-xs text-slate-700 hover:text-blue-600">
                      Digital Declutter / Item Removal
                    </Link>
                    <Link
                      href="/real-estate/day-to-dusk-conversion"
                      onClick={closeMobileMenu}
                      className="block py-1 text-xs text-slate-700 hover:text-blue-600">
                      Day to Dusk Conversion (Virtual Twilight)
                    </Link>
                    <Link
                      href="/real-estate/sky-replacement-services"
                      onClick={closeMobileMenu}
                      className="block py-1 text-xs text-slate-700 hover:text-blue-600">
                      Sky Replacement Services
                    </Link>
                    <Link
                      href="/real-estate/virtual-staging-and-renovation"
                      onClick={closeMobileMenu}
                      className="block py-1 text-xs text-slate-700 hover:text-blue-600">
                      Virtual Staging and Renovation
                    </Link>
                    <Link
                      href="/real-estate/360-virtual-tours"
                      onClick={closeMobileMenu}
                      className="block py-1 text-xs text-slate-700 hover:text-blue-600">
                      360 Virtual Tours
                    </Link>
                    <Link
                      href="/real-estate/real-estate-video-editing"
                      onClick={closeMobileMenu}
                      className="block py-1 text-xs text-slate-700 hover:text-blue-600">
                      Real Estate Video Editing
                    </Link>
                    <div className="pt-1 mt-1 border-t border-slate-200">
                      <Link
                        href="/real-estate/floor-plans"
                        onClick={closeMobileMenu}
                        className="block py-1 text-xs font-bold text-blue-600 hover:text-blue-700">
                        Floor Plans
                      </Link>
                      <div className="pl-3 space-y-0.5">
                        <Link
                          href="/real-estate/floor-plans/2d-floor-plan"
                          onClick={closeMobileMenu}
                          className="block py-0.5 text-[11px] text-slate-600 hover:text-blue-600">
                          • 2D Floor Plan
                        </Link>
                        <Link
                          href="/real-estate/floor-plans/3d-floor-plan"
                          onClick={closeMobileMenu}
                          className="block py-0.5 text-[11px] text-slate-600 hover:text-blue-600">
                          • 3D Floor Plan
                        </Link>
                        <Link
                          href="/real-estate/floor-plans/site-plan"
                          onClick={closeMobileMenu}
                          className="block py-0.5 text-[11px] text-slate-600 hover:text-blue-600">
                          • Site Plan
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Image Clipping Accordion */}
              <div>
                <div className="flex items-center justify-between px-3 py-2 rounded-xl font-bold text-slate-900 hover:bg-slate-50">
                  <Link
                    href="/image-clipping"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 text-slate-900">
                    <i className="fa-solid fa-scissors text-blue-600 text-sm" />
                    <span>Image Clipping Services</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedCat(
                        mobileExpandedCat === 'image-clipping'
                          ? null
                          : 'image-clipping',
                      )
                    }
                    className="p-1 text-slate-400 hover:text-slate-600">
                    <i
                      className={`fa-solid fa-chevron-down text-xs transition-transform ${
                        mobileExpandedCat === 'image-clipping'
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>
                </div>
                {mobileExpandedCat === 'image-clipping' && (
                  <div className="pl-6 py-1 space-y-1 bg-slate-50/70 rounded-xl my-1 border-l-2 border-blue-200">
                    <Link
                      href="/image-clipping/background-removal-services"
                      onClick={closeMobileMenu}
                      className="block py-1 text-xs text-slate-700 hover:text-blue-600">
                      Background Removal Services
                    </Link>
                    <Link
                      href="/image-clipping/clipping-path-services"
                      onClick={closeMobileMenu}
                      className="block py-1 text-xs text-slate-700 hover:text-blue-600">
                      Handcrafted Vector Clipping Paths
                    </Link>
                    <Link
                      href="/image-clipping/hair-masking"
                      onClick={closeMobileMenu}
                      className="block py-1 text-xs text-slate-700 hover:text-blue-600">
                      Hair Masking &amp; Alpha Channels
                    </Link>
                  </div>
                )}
              </div>

              {/* 3. Portrait Editing Services */}
              <Link
                href="/portrait"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                <i className="fa-solid fa-user-check text-blue-600 text-sm" />
                <span>Portrait Editing Services</span>
              </Link>

              {/* 4. Wedding Photo Post Processing */}
              <Link
                href="/wedding-photo-post-processing"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                <i className="fa-solid fa-camera-retro text-blue-600 text-sm" />
                <span>Wedding Photo Post Processing</span>
              </Link>

              {/* Standard Links */}
              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/sample-images"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between px-3 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  <span>Portfolio</span>
                  <i className="fa-solid fa-chevron-right text-xs text-slate-400" />
                </Link>

                <Link
                  href="/pricing"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between px-3 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  <span>Pricing</span>
                  <i className="fa-solid fa-chevron-right text-xs text-slate-400" />
                </Link>

                <Link
                  href="/about-us"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between px-3 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  <span>About Us</span>
                  <i className="fa-solid fa-chevron-right text-xs text-slate-400" />
                </Link>

                <Link
                  href="/blog"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between px-3 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  <span>Studio Blog</span>
                  <i className="fa-solid fa-chevron-right text-xs text-slate-400" />
                </Link>

                <Link
                  href="/contact-us"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between px-3 py-2 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  <span>Contact Us</span>
                  <i className="fa-solid fa-chevron-right text-xs text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Mobile Contact & Actions */}
            <div className="pt-4 border-t border-slate-200/80 space-y-3">
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
