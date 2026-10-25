'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ServiceCategory,
  ResourceArticle,
  TestimonialItem,
  GalleryTab,
  PageContent,
  SiteSettingsMap,
} from '@/types/content';
import {
  getServices,
  saveService,
  deleteService,
  getResources,
  saveResource,
  deleteResource,
  getTestimonials,
  saveTestimonial,
  deleteTestimonial,
  getGalleryTabs,
  saveGalleryTab,
  deleteGalleryTab,
  getPages,
  savePageContent,
  getSettings,
  saveSettings,
} from '@/lib/api/content';
import { useAuth } from '@/hooks/useAuth';
import { BrandLoader } from '@/components/ui/BrandLoader';

// Page Editors
import { HomePageEditor } from './pages/HomePageEditor';
import { AboutUsPageEditor } from './pages/AboutUsPageEditor';
import { ServicesPageEditor } from './pages/ServicesPageEditor';
import { PricingPageEditor } from './pages/PricingPageEditor';
import { TurnaroundPageEditor } from './pages/TurnaroundPageEditor';
import { QualityPageEditor } from './pages/QualityPageEditor';
import { GalleryPageEditor } from './pages/GalleryPageEditor';
import { TestimonialsPageEditor } from './pages/TestimonialsPageEditor';
import { ResourcesPageEditor } from './pages/ResourcesPageEditor';
import { BlogPageEditor } from './pages/BlogPageEditor';
import { DropboxPageEditor } from './pages/DropboxPageEditor';
import { ContactUsPageEditor } from './pages/ContactUsPageEditor';
import { SecurityPageEditor } from './pages/SecurityPageEditor';
import { PrivacyPolicyPageEditor } from './pages/PrivacyPolicyPageEditor';
import { BrandingEditor } from './pages/BrandingEditor';
import { FooterEditor } from './pages/FooterEditor';
import { AccountEditor } from './pages/AccountEditor';
import { OverviewDashboard } from './pages/OverviewDashboard';
import { FeaturePagesEditor } from './pages/FeaturePagesEditor';

export type PageMenuId =
  | 'home'
  | 'about-us'
  | 'services'
  | 'pricing'
  | 'turnaround-time'
  | 'quality'
  | 'sample-images'
  | 'testimonials'
  | 'resources'
  | 'blog'
  | 'contact-us'
  | 'security'
  | 'privacy-policy'
  | 'features'
  | 'dropbox'
  | 'footer'
  | 'overview'
  | 'branding'
  | 'account';

export default function AdminDashboard() {
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
    login,
    logout,
    updateUser,
  } = useAuth();
  const [activeMenu, setActiveMenu] = useState<PageMenuId>('home');
  const [menuSearch, setMenuSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  // Inline Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Content Data
  const [pages, setPages] = useState<PageContent[]>([]);
  const [services, setServices] = useState<ServiceCategory[]>([]);
  const [resources, setResources] = useState<ResourceArticle[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [gallery, setGallery] = useState<GalleryTab[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsMap>({});

  const showToast = (
    message: string,
    type: 'success' | 'error' = 'success',
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [s, r, t, g, p, cfg] = await Promise.all([
        getServices(),
        getResources(),
        getTestimonials(),
        getGalleryTabs(),
        getPages(),
        getSettings(),
      ]);
      setServices(s || []);
      setResources(r || []);
      setTestimonials(t || []);
      setGallery(g || []);
      setPages(p || []);
      setSiteSettings(cfg || {});
    } catch (err) {
      showToast('Failed to load content from database', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const handleInlineLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    try {
      await login({ email: loginEmail, password: loginPassword });
      showToast('Signed in as Administrator!');
    } catch (err: any) {
      setLoginError(
        err.message ||
          'Invalid credentials. Please verify your email and password.',
      );
    } finally {
      setLoggingIn(false);
    }
  };

  // Handlers
  const handleSavePageContent = async (page: PageContent) => {
    await savePageContent(page);
    setPages((prev) => {
      const idx = prev.findIndex((p) => p.slug === page.slug);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = page;
        return copy;
      }
      return [...prev, page];
    });
  };

  const handleSaveService = async (service: ServiceCategory) => {
    await saveService(service);
    await loadAllData();
  };

  const handleDeleteService = async (id: string) => {
    await deleteService(id);
    await loadAllData();
  };

  const handleSaveResource = async (resource: ResourceArticle) => {
    await saveResource(resource);
    await loadAllData();
  };

  const handleDeleteResource = async (id: string) => {
    await deleteResource(id);
    await loadAllData();
  };

  const handleSaveTestimonial = async (test: TestimonialItem) => {
    await saveTestimonial(test);
    await loadAllData();
  };

  const handleDeleteTestimonial = async (id: string) => {
    await deleteTestimonial(id);
    await loadAllData();
  };

  const handleSaveGalleryTab = async (tab: GalleryTab) => {
    await saveGalleryTab(tab);
    await loadAllData();
  };

  const handleDeleteGalleryTab = async (id: string) => {
    await deleteGalleryTab(id);
    await loadAllData();
  };

  const handleSaveSettings = async (
    settingsPayload: Record<string, string>,
  ) => {
    await saveSettings(settingsPayload);
    await loadAllData();
  };

  // Navigation Items
  const pageMenuItems = [
    {
      id: 'home',
      label: 'Home Page',
      route: '/',
      icon: 'fa-house',
      badge: '8 Sections',
    },
    {
      id: 'about-us',
      label: 'About Us Page',
      route: '/about-us',
      icon: 'fa-circle-info',
    },
    {
      id: 'services',
      label: 'Services Pages',
      route: '/services',
      icon: 'fa-layer-group',
      badge: `${services.length} Pages`,
    },
    { id: 'pricing', label: 'Pricing Page', route: '/pricing', icon: 'fa-tag' },
    {
      id: 'turnaround-time',
      label: 'Turnaround Time',
      route: '/turnaround-time',
      icon: 'fa-clock',
    },
    {
      id: 'quality',
      label: 'Quality Assurance',
      route: '/quality',
      icon: 'fa-certificate',
    },
    {
      id: 'sample-images',
      label: 'Sample Images & Gallery',
      route: '/sample-images',
      icon: 'fa-images',
      badge: `${gallery.length} Tabs`,
    },
    {
      id: 'testimonials',
      label: 'Testimonials Page',
      route: '/testimonials',
      icon: 'fa-comments',
      badge: `${testimonials.length}`,
    },
    {
      id: 'resources',
      label: 'Case Studies & Articles',
      route: '/case-study',
      icon: 'fa-newspaper',
      badge: `${resources.filter((r) => r.category !== 'Blog').length}`,
    },
    {
      id: 'blog',
      label: 'Blog Management',
      route: '/blog',
      icon: 'fa-blog',
      badge: `${resources.filter((r) => r.category === 'Blog' || r.category === 'blog').length} Posts`,
    },
    {
      id: 'dropbox',
      label: 'Dropbox Cloud Studio',
      route: 'Cloud Media',
      icon: 'fa-cloud',
      badge: 'Client Portal',
    },
    {
      id: 'contact-us',
      label: 'Contact Us Page',
      route: '/contact-us',
      icon: 'fa-envelope',
    },
    {
      id: 'security',
      label: 'Security & Compliance',
      route: '/security',
      icon: 'fa-shield-halved',
    },
    {
      id: 'privacy-policy',
      label: 'Privacy Policy',
      route: '/privacy-policy',
      icon: 'fa-scale-balanced',
    },
    {
      id: 'features',
      label: 'Feature & Info Pages',
      route: '/benefits etc.',
      icon: 'fa-file-lines',
      badge: '7 Pages',
    },
    {
      id: 'footer',
      label: 'Footer Settings',
      route: 'Global',
      icon: 'fa-shoe-prints',
    },
  ];

  const systemMenuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: 'fa-chart-pie' },
    { id: 'dropbox', label: 'Dropbox Cloud Studio', icon: 'fa-cloud' },
    { id: 'footer', label: 'Global Footer Settings', icon: 'fa-shoe-prints' },
    { id: 'branding', label: 'Website Branding & Logos', icon: 'fa-gear' },
    { id: 'account', label: 'Admin Credentials', icon: 'fa-user-shield' },
  ];

  const filteredPageMenuItems = pageMenuItems.filter(
    (item) =>
      item.label.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.route.toLowerCase().includes(menuSearch.toLowerCase()),
  );

  // Dynamic Browser Tab Title updating with active page
  useEffect(() => {
    const current =
      pageMenuItems.find((p) => p.id === activeMenu) ||
      systemMenuItems.find((s) => s.id === activeMenu);
    if (current && typeof document !== 'undefined') {
      document.title = `${current.label} | LIRISHA Admin Mode`;
    }
  }, [activeMenu]);

  // Ensure Favicon points to the new camera logo
  useEffect(() => {
    if (typeof document !== 'undefined') {
      let link: HTMLLinkElement | null =
        document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.type = 'image/png';
      link.href = '/favicon.png';
    }
  }, []);

  if (authLoading) {
    return (
      <BrandLoader
        fullScreen
        size="lg"
        message="Verifying Admin Session..."
        subMessage="Validating administrator credentials"
      />
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="admin-scope h-screen h-[100dvh] max-h-screen w-screen max-w-full overflow-hidden bg-gradient-to-br from-[#07152F] via-[#102749] to-[#07152F] flex items-center justify-center p-3 sm:p-4 font-sans">
        <div className="admin-container w-full max-w-md bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 sm:space-y-5 border border-slate-200">
          <div className="text-center space-y-2">
            <div className="w-18 h-18 w-[72px] h-[72px] rounded-2xl bg-slate-900 border border-slate-800 p-2 text-white flex items-center justify-center mx-auto shadow-xl shadow-blue-500/10">
              <img
                src="/images/lirisha-camera-logo.png"
                alt="LIRISHA"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight font-heading">
              Admin Authentication
            </h2>
            <p className="text-xs text-slate-500">
              Sign in with your administrator credentials to access LIRISHA
              Admin Mode
            </p>
          </div>


          {loginError && (
            <div className="p-3.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
              <i className="fa-solid fa-triangle-exclamation text-red-500"></i>
              <span className="font-medium">{loginError}</span>
            </div>
          )}

          <form onSubmit={handleInlineLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                Username / Email Address
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3.5 py-3 border border-slate-300 rounded-xl bg-white text-slate-900 font-semibold focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/15 outline-none transition-all text-xs shadow-sm"
                placeholder="admin@lirisha.com"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-3 border border-slate-300 rounded-xl bg-white text-slate-900 font-semibold focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/15 outline-none transition-all text-xs shadow-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 bg-gradient-to-r from-[#00C8F8] via-[#1265E8] to-[#713CFF] hover:opacity-95 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              <i
                className={`fa-solid ${loggingIn ? 'fa-spinner fa-spin' : 'fa-arrow-right-to-bracket'}`}></i>
              <span>
                {loggingIn ? 'Signing In...' : 'Sign In to Admin Mode'}
              </span>
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading && pages.length === 0 && services.length === 0) {
    return (
      <BrandLoader
        fullScreen
        size="lg"
        message="Loading LIRISHA Studio..."
        // subMessage="Connecting to PostgreSQL database & loading live records"
      />
    );
  }

  const activePageItem = pageMenuItems.find((p) => p.id === activeMenu);
  const activeSystemItem = systemMenuItems.find((s) => s.id === activeMenu);
  const activeItem = activePageItem || activeSystemItem;

  return (
    <div className="admin-scope h-screen h-[100dvh] max-h-screen w-screen max-w-full bg-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-white transition-all transform animate-bounce ${
            toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
          }`}>
          <i
            className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}`}></i>
          <span className="font-semibold text-xs">{toast.message}</span>
        </div>
      )}

      {/* Top Header Bar - Fixed Sleek Height */}
      <header className="bg-[#07152F] text-white shrink-0 z-40 shadow-md border-b border-slate-800">
        <div className="px-3 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-15">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs shrink-0">
              <i
                className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>

            {/* Logo Icon - Camera Logo */}
            <div className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-700/60 p-1 flex items-center justify-center shadow-md overflow-hidden shrink-0">
              <img
                src="/images/lirisha-camera-logo.png"
                alt="LIRISHA"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <span className="font-extrabold text-sm sm:text-base tracking-wide text-white whitespace-nowrap font-heading">
                LIRISHA Admin Mode
              </span>

              {/* Dynamic Active Page Indicator in Top Bar */}
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="text-slate-500 font-bold text-xs sm:text-sm">
                  /
                </span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#1265E8]/25 to-[#713CFF]/20 border border-[#1265E8]/40 text-[#00C8F8] font-bold text-xs shadow-sm min-w-0">
                  <i
                    className={`fa-solid ${activeItem?.icon || 'fa-file'} text-[#00C8F8] text-[11px] shrink-0`}></i>
                  <span className="truncate max-w-[120px] sm:max-w-none text-white">
                    {activeItem?.label || 'Home Page'}
                  </span>
                  {activePageItem?.route && (
                    <span className="hidden md:inline-block font-mono font-normal text-[10px] text-cyan-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-cyan-500/25 shrink-0">
                      {activePageItem.route}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={loadAllData}
              disabled={loading}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-semibold flex items-center gap-1.5 transition-all text-white border border-white/10 shadow-sm"
              title="Refresh all data from database">
              <i
                className={`fa-solid fa-arrows-rotate text-[#00C8F8] ${loading ? 'fa-spin' : ''}`}></i>
              <span className="hidden sm:inline">Sync DB</span>
            </button>
            <Link
              href="/"
              target="_blank"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-semibold flex items-center gap-1.5 text-white transition-all border border-white/10 shadow-sm">
              <i className="fa-solid fa-arrow-up-right-from-square text-[#00C8F8]"></i>
              <span className="hidden sm:inline">View Site</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Workspace with Left Sidebar & Content */}
      <div className="flex-1 min-h-0 flex w-full relative overflow-hidden">
        {/* Left Sidebar Menu (Page-Wise) */}
        <aside
          style={{ width: '260px', minWidth: '260px', maxWidth: '260px' }}
          className={`admin-sidebar fixed lg:static z-30 h-full bg-[#07152F] text-slate-300 border-r border-slate-800/80 flex flex-col shrink-0 transition-all duration-300 ${
            mobileMenuOpen ? 'left-0' : '-left-72 lg:left-0'
          }`}>
          {/* Quick Filter */}
          <div className="p-3 sm:p-3.5 border-b border-slate-800/80 shrink-0">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
              <input
                type="text"
                placeholder="Find page..."
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#102749]/60 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 outline-none focus:border-[#1265E8]"
              />
            </div>
          </div>

          {/* Navigation Links Scrollable Area - Zero Scrollbars */}
          <div className="flex-1 min-h-0 overflow-y-auto p-2.5 sm:p-3 space-y-4 scrollbar-none">
            {/* GROUP 1: WEBSITE PAGES */}
            <div>
              <div className="px-3 mb-2 flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Website Pages ({filteredPageMenuItems.length})
                </span>
                <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-mono">
                  Page-Wise
                </span>
              </div>
              <div className="space-y-1">
                {filteredPageMenuItems.map((item) => {
                  const isActive = activeMenu === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveMenu(item.id as PageMenuId);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                        isActive
                          ? 'bg-gradient-to-r from-[#00C8F8] via-[#1265E8] to-[#713CFF] text-white shadow-lg shadow-blue-950/40'
                          : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                      }`}>
                      <div className="flex items-center gap-2.5 truncate">
                        <i
                          className={`fa-solid ${item.icon} w-4 text-center ${isActive ? 'text-white' : 'text-slate-400'}`}></i>
                        <span className="truncate">{item.label}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono font-normal px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'text-slate-500 bg-slate-900'
                        }`}>
                        {item.route}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GROUP 2: GLOBAL & SYSTEM */}
            <div className="border-t border-slate-800/80 pt-3">
              <div className="px-3 mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Global Configuration
                </span>
              </div>
              <div className="space-y-1">
                {systemMenuItems.map((item) => {
                  const isActive = activeMenu === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveMenu(item.id as PageMenuId);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                        isActive
                          ? 'bg-gradient-to-r from-[#00C8F8] via-[#1265E8] to-[#713CFF] text-white shadow-lg shadow-blue-950/40'
                          : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                      }`}>
                      <i
                        className={`fa-solid ${item.icon} w-4 text-center ${isActive ? 'text-white' : 'text-slate-400'}`}></i>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar Footer User Info & Logout */}
          <div className="p-3 border-t border-slate-800/90 bg-[#102749]/60 flex items-center justify-between text-xs shrink-0 gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-[34px] h-[34px] rounded-xl bg-gradient-to-tr from-[#00C8F8] via-[#1265E8] to-[#713CFF] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md shadow-blue-950/40 ring-1 ring-white/10">
                {user?.first_name
                  ? user.first_name.charAt(0).toUpperCase()
                  : user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-white text-xs truncate leading-tight">
                  {user?.first_name || 'Administrator'}
                </p>
                <p className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">
                  {user?.email || 'admin@lirisha.com'}
                </p>
              </div>
            </div>

            {/* Logout Icon Button (icon only, no name) */}
            <button
              type="button"
              onClick={logout}
              title="Logout"
              aria-label="Logout"
              className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 hover:border-red-600 flex items-center justify-center transition-all duration-200 shrink-0 group shadow-sm active:scale-95">
              <i className="fa-solid fa-right-from-bracket text-xs group-hover:scale-110 transition-transform"></i>
            </button>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"></div>
        )}

        {/* Main Content Area */}
        <main className="admin-container admin-main flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden bg-[#F7F9FC]">
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 scrollbar-none">
            <div className="max-w-6xl mx-auto w-full space-y-6 pb-12">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center">
                  <BrandLoader
                    size="md"
                    message="Fetching live content from PostgreSQL database..."
                    subMessage="Synchronizing content models"
                  />
                </div>
              ) : (
                <>
                  {/* PAGE-WISE EDITORS */}
                  {activeMenu === 'home' && (
                    <HomePageEditor
                      page={pages.find((p) => p.slug === 'home')}
                      onSave={handleSavePageContent}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'about-us' && (
                    <AboutUsPageEditor
                      page={pages.find((p) => p.slug === 'about-us')}
                      onSave={handleSavePageContent}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'services' && (
                    <ServicesPageEditor
                      services={services}
                      onSaveService={handleSaveService}
                      onDeleteService={handleDeleteService}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'pricing' && (
                    <PricingPageEditor
                      page={pages.find((p) => p.slug === 'pricing')}
                      onSave={handleSavePageContent}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'turnaround-time' && (
                    <TurnaroundPageEditor
                      page={pages.find((p) => p.slug === 'turnaround-time')}
                      onSave={handleSavePageContent}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'quality' && (
                    <QualityPageEditor
                      page={pages.find((p) => p.slug === 'quality')}
                      onSave={handleSavePageContent}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'sample-images' && (
                    <GalleryPageEditor
                      galleryTabs={gallery}
                      onSaveTab={handleSaveGalleryTab}
                      onDeleteTab={handleDeleteGalleryTab}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'testimonials' && (
                    <TestimonialsPageEditor
                      testimonials={testimonials}
                      onSaveTestimonial={handleSaveTestimonial}
                      onDeleteTestimonial={handleDeleteTestimonial}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'resources' && (
                    <ResourcesPageEditor
                      resources={resources}
                      onSaveResource={handleSaveResource}
                      onDeleteResource={handleDeleteResource}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'blog' && (
                    <BlogPageEditor
                      resources={resources}
                      onSaveResource={handleSaveResource}
                      onDeleteResource={handleDeleteResource}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'dropbox' && (
                    <DropboxPageEditor
                      siteSettings={siteSettings}
                      onSaveSettings={handleSaveSettings}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'contact-us' && (
                    <ContactUsPageEditor
                      page={pages.find((p) => p.slug === 'contact-us')}
                      siteSettings={siteSettings}
                      onSave={handleSavePageContent}
                      onSaveSettings={handleSaveSettings}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'security' && (
                    <SecurityPageEditor
                      page={pages.find((p) => p.slug === 'security')}
                      onSave={handleSavePageContent}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'privacy-policy' && (
                    <PrivacyPolicyPageEditor
                      page={pages.find((p) => p.slug === 'privacy-policy')}
                      onSave={handleSavePageContent}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'features' && (
                    <FeaturePagesEditor
                      pages={pages}
                      onSave={handleSavePageContent}
                      showToast={showToast}
                    />
                  )}

                  {/* SYSTEM EDITORS */}
                  {activeMenu === 'overview' && (
                    <OverviewDashboard
                      pages={pages}
                      services={services}
                      resources={resources}
                      testimonials={testimonials}
                      gallery={gallery}
                      onSelectMenu={(menuId) =>
                        setActiveMenu(menuId as PageMenuId)
                      }
                    />
                  )}

                  {activeMenu === 'footer' && (
                    <FooterEditor
                      siteSettings={siteSettings}
                      onSaveSettings={handleSaveSettings}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'branding' && (
                    <BrandingEditor
                      siteSettings={siteSettings}
                      onSaveSettings={handleSaveSettings}
                      showToast={showToast}
                    />
                  )}

                  {activeMenu === 'account' && (
                    <AccountEditor
                      user={user}
                      onUpdateUser={updateUser}
                      showToast={showToast}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
