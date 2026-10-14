"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ServiceCategory,
  ResourceArticle,
  TestimonialItem,
  GalleryTab,
  PageContent,
} from "@/types/content";
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
} from "@/lib/api/content";
import { SiteSettingsMap } from "@/types/content";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";
import { useAuth } from "@/hooks/useAuth";

type AdminTab = "overview" | "services" | "resources" | "testimonials" | "gallery" | "pages" | "settings" | "account";

export default function AdminDashboard() {
  const { user, isAuthenticated, isLoading: authLoading, login, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Admin Account & Credentials states
  const [adminEmail, setAdminEmail] = useState("");
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");
  const [adminNewPassword, setAdminNewPassword] = useState("");
  const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
  const [adminUpdating, setAdminUpdating] = useState(false);

  // Inline Login form states
  const [loginEmail, setLoginEmail] = useState("admin@example.com");
  const [loginPassword, setLoginPassword] = useState("Password123!");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Data states
  const [services, setServices] = useState<ServiceCategory[]>([]);
  const [resources, setResources] = useState<ResourceArticle[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [gallery, setGallery] = useState<GalleryTab[]>([]);
  const [pages, setPages] = useState<PageContent[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsMap>({});

  // Search filters
  const [searchFilter, setSearchFilter] = useState("");

  // Modal / Editing states
  const [editingService, setEditingService] = useState<ServiceCategory | null>(null);
  const [editingResource, setEditingResource] = useState<ResourceArticle | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [editingGalleryTab, setEditingGalleryTab] = useState<GalleryTab | null>(null);
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
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
      showToast("Failed to load content from database", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: Record<string, string> = {};
      Object.entries(siteSettings).forEach(([k, v]) => {
        payload[k] = v.value;
      });
      await saveSettings(payload);
      showToast("Global branding and settings saved successfully!");
      loadAllData();
    } catch (err) {
      showToast("Failed to save settings", "error");
    }
  };

  useEffect(() => {
    if (user) {
      setAdminEmail(user.email || "");
      setAdminFirstName(user.first_name || "");
      setAdminLastName(user.last_name || "");
    }
  }, [user]);

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
      showToast("Signed in as Admin!");
    } catch (err: any) {
      setLoginError(err.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleSaveAdminAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail.trim()) {
      showToast("Email address is required", "error");
      return;
    }

    if (adminNewPassword) {
      if (adminNewPassword.length < 6) {
        showToast("Password must be at least 6 characters long", "error");
        return;
      }
      if (adminNewPassword !== adminConfirmPassword) {
        showToast("New password and confirm password do not match", "error");
        return;
      }
    }

    setAdminUpdating(true);
    try {
      await updateUser({
        email: adminEmail.trim(),
        first_name: adminFirstName.trim(),
        last_name: adminLastName.trim(),
        password: adminNewPassword || undefined,
      });
      showToast("Admin credentials updated successfully in PostgreSQL!");
      setAdminNewPassword("");
      setAdminConfirmPassword("");
    } catch (err: any) {
      showToast(err.message || "Failed to update admin credentials", "error");
    } finally {
      setAdminUpdating(false);
    }
  };

  // Save Handlers
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    try {
      await saveService(editingService);
      showToast(`Service '${editingService.name}' saved to database!`);
      setEditingService(null);
      loadAllData();
    } catch (err) {
      showToast("Error saving service", "error");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteService(id);
      showToast("Service deleted");
      loadAllData();
    } catch (err) {
      showToast("Failed to delete service", "error");
    }
  };

  const handleSaveResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResource) return;
    try {
      await saveResource(editingResource);
      showToast(`Resource '${editingResource.title}' saved to database!`);
      setEditingResource(null);
      loadAllData();
    } catch (err) {
      showToast("Error saving resource", "error");
    }
  };

  const handleDeleteResource = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteResource(id);
      showToast("Item deleted");
      loadAllData();
    } catch (err) {
      showToast("Failed to delete resource", "error");
    }
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    try {
      await saveTestimonial(editingTestimonial);
      showToast("Testimonial saved to database!");
      setEditingTestimonial(null);
      loadAllData();
    } catch (err) {
      showToast("Error saving testimonial", "error");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      showToast("Testimonial removed");
      loadAllData();
    } catch (err) {
      showToast("Failed to delete testimonial", "error");
    }
  };

  const handleSaveGalleryTab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGalleryTab) return;
    try {
      await saveGalleryTab(editingGalleryTab);
      showToast(`Gallery tab '${editingGalleryTab.name}' saved!`);
      setEditingGalleryTab(null);
      loadAllData();
    } catch (err) {
      showToast("Error saving gallery tab", "error");
    }
  };

  const handleDeleteGalleryTab = async (id: string) => {
    if (!confirm("Delete this gallery tab?")) return;
    try {
      await deleteGalleryTab(id);
      showToast("Gallery tab deleted");
      loadAllData();
    } catch (err) {
      showToast("Failed to delete gallery tab", "error");
    }
  };

  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;
    try {
      await savePageContent(editingPage);
      showToast(`Page '${editingPage.title}' updated successfully!`);
      setEditingPage(null);
      loadAllData();
    } catch (err) {
      showToast("Error saving page", "error");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-[#ff5b0a]"></i>
          <p className="text-sm font-semibold text-slate-300">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1c2a5a] to-[#0f172a] flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#ff5b0a] text-white flex items-center justify-center mx-auto text-2xl shadow-lg">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Admin Authentication</h2>
            <p className="text-xs text-gray-500">Sign in with your administrator credentials to access the CMS console</p>
          </div>

          {/* Quick-fill Banner */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5">
                <i className="fa-solid fa-key text-amber-600"></i> Admin Credentials:
              </span>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail("admin@example.com");
                  setLoginPassword("Password123!");
                }}
                className="px-2.5 py-0.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md font-bold text-[10px] transition-colors"
              >
                Auto-fill
              </button>
            </div>
            <div className="font-mono text-[11px] text-gray-700 bg-white/70 p-2 rounded-lg border border-amber-200/50">
              <div><strong>Username:</strong> admin@example.com</div>
              <div><strong>Password:</strong> Password123!</div>
            </div>
          </div>

          {loginError && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleInlineLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Username / Email Address</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white focus:border-[#ff5b0a] outline-none transition-all text-xs"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full p-3 border rounded-xl bg-gray-50 focus:bg-white focus:border-[#ff5b0a] outline-none transition-all text-xs"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 bg-[#ff5b0a] hover:bg-[#e04f05] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <i className={`fa-solid ${loggingIn ? "fa-spinner fa-spin" : "fa-arrow-right-to-bracket"}`}></i>
              <span>{loggingIn ? "Signing In..." : "Sign In to Admin Mode"}</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-white transition-all transform animate-bounce ${
            toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          <i className={`fa-solid ${toast.type === "success" ? "fa-circle-check" : "fa-triangle-exclamation"}`}></i>
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-[#1c2a5a] text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#ff5b0a] flex items-center justify-center font-bold text-white shadow-inner">
              <i className="fa-solid fa-sliders"></i>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-wide text-white">SPE CMS Console</span>
              <span className="hidden sm:inline-block ml-2 text-xs bg-orange-500/30 text-orange-200 px-2 py-0.5 rounded-full border border-orange-400/40">
                PostgreSQL Live
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg text-xs">
              <i className="fa-solid fa-user-shield text-[#ff5b0a]"></i>
              <span className="text-gray-200 font-semibold">{user?.email || "Admin"}</span>
            </div>
            <button
              onClick={loadAllData}
              disabled={loading}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Refresh all data from database"
            >
              <i className={`fa-solid fa-arrows-rotate ${loading ? "fa-spin" : ""}`}></i>
              <span className="hidden sm:inline">Sync DB</span>
            </button>
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 text-white transition-all"
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
              <span className="hidden sm:inline">View Site</span>
            </Link>
            <button
              onClick={logout}
              className="px-3.5 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-xs font-bold flex items-center gap-1.5 text-white shadow-sm transition-all"
              title="Sign Out of Admin Console"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 scrollbar-none">
            {[
              { id: "overview", label: "Overview", icon: "fa-chart-pie" },
              { id: "services", label: `Services (${services.length})`, icon: "fa-layer-group" },
              { id: "resources", label: `Articles & Blogs (${resources.length})`, icon: "fa-newspaper" },
              { id: "testimonials", label: `Testimonials (${testimonials.length})`, icon: "fa-comments" },
              { id: "gallery", label: `Gallery Tabs (${gallery.length})`, icon: "fa-images" },
              { id: "pages", label: `Pages CMS (${pages.length})`, icon: "fa-file-lines" },
              { id: "settings", label: "Branding & Logos", icon: "fa-gear" },
              { id: "account", label: "Admin Credentials", icon: "fa-user-shield" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as AdminTab);
                  setSearchFilter("");
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-[#ff5b0a] text-white shadow-sm"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <i className={`fa-solid ${tab.icon}`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center text-gray-400 gap-3">
            <i className="fa-solid fa-circle-notch fa-spin text-3xl text-[#ff5b0a]"></i>
            <p className="text-sm">Fetching live content from PostgreSQL database...</p>
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Website Content Management Overview</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage and edit every page, service, resource article, testimonial, and comparison image dynamically.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                  {[
                    { label: "Active Services", count: services.length, icon: "fa-layer-group", tab: "services", color: "from-blue-600 to-indigo-700" },
                    { label: "Articles & Blogs", count: resources.length, icon: "fa-newspaper", tab: "resources", color: "from-purple-600 to-pink-600" },
                    { label: "Client Reviews", count: testimonials.length, icon: "fa-comments", tab: "testimonials", color: "from-amber-500 to-orange-600" },
                    { label: "Gallery Categories", count: gallery.length, icon: "fa-images", tab: "gallery", color: "from-emerald-600 to-teal-700" },
                    { label: "Pages CMS", count: pages.length, icon: "fa-file-lines", tab: "pages", color: "from-cyan-600 to-blue-700" },
                    { label: "Admin Security", count: 1, icon: "fa-user-shield", tab: "account", color: "from-slate-700 to-slate-900" },
                  ].map((card, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveTab(card.tab as AdminTab)}
                      className="cursor-pointer bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#ff5b0a] transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500 uppercase">{card.label}</span>
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${card.color} text-white flex items-center justify-center text-xs shadow-sm`}>
                          <i className={`fa-solid ${card.icon}`}></i>
                        </div>
                      </div>
                      <div className="mt-4 flex items-baseline justify-between">
                        <span className="text-3xl font-extrabold text-gray-900">{card.count}</span>
                        <span className="text-xs font-semibold text-[#ff5b0a] flex items-center gap-1 hover:underline">
                          Edit <i className="fa-solid fa-arrow-right text-[10px]"></i>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Shortcuts */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Quick Content Jump</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setActiveTab("services");
                          setEditingService(s);
                        }}
                        className="p-3 text-left border rounded-xl hover:border-[#ff5b0a] hover:bg-orange-50/50 transition-all text-xs font-medium text-gray-700 flex flex-col justify-between gap-2"
                      >
                        <i className={`${s.iconClass} text-[#ff5b0a] text-sm`}></i>
                        <span className="truncate font-semibold">{s.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === "services" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Services Catalog</h2>
                    <p className="text-xs text-gray-500">Edit descriptions, subservices, turnaround times, and before/after URLs.</p>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="px-3 py-1.5 text-xs rounded-lg border border-gray-300 w-full sm:w-60 focus:outline-none focus:border-[#ff5b0a]"
                    />
                    <button
                      onClick={() =>
                        setEditingService({
                          id: `service-${Date.now()}`,
                          slug: "new-service",
                          name: "New Service Category",
                          tagline: "Short marketing tagline",
                          shortDesc: "",
                          fullDesc: "",
                          iconClass: "fa-solid fa-wand-magic-sparkles",
                          heroImage: "/images/banner-bg.webp",
                          beforeSrc: "",
                          afterSrc: "",
                          beforeAlt: "Before",
                          afterAlt: "After",
                          turnaroundTime: "12-24 Hours",
                          deliverables: ["High-Res JPEG", "Layered PSD"],
                          keyBenefits: ["Fast turnaround", "Dedicated team"],
                          subServices: [],
                        })
                      }
                      className="px-3 py-1.5 text-xs font-bold bg-[#ff5b0a] text-white rounded-lg hover:bg-[#e04f05] flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                    >
                      <i className="fa-solid fa-plus"></i> Add Service
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services
                    .filter((s) => s.name.toLowerCase().includes(searchFilter.toLowerCase()) || s.slug.includes(searchFilter.toLowerCase()))
                    .map((service) => (
                      <div
                        key={service.id}
                        className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm">
                                <i className={service.iconClass || "fa-solid fa-layer-group"}></i>
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 text-sm">{service.name}</h3>
                                <span className="text-[11px] text-gray-400 font-mono">/{service.slug}</span>
                              </div>
                            </div>
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                              {service.turnaroundTime}
                            </span>
                          </div>

                          <p className="text-xs text-gray-600 mt-3 line-clamp-2 leading-relaxed">
                            {service.shortDesc || service.tagline}
                          </p>

                          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                            <span>
                              <strong className="text-gray-800">{service.subServices?.length || 0}</strong> sub-services
                            </span>
                            <span>
                              <strong className="text-gray-800">{service.deliverables?.length || 0}</strong> deliverables
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                          <Link
                            href={`/${service.slug}`}
                            target="_blank"
                            className="text-xs text-gray-500 hover:text-[#ff5b0a] flex items-center gap-1"
                          >
                            <i className="fa-solid fa-eye"></i> View
                          </Link>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setEditingService(service)}
                              className="px-2.5 py-1 text-xs font-semibold bg-gray-100 hover:bg-[#ff5b0a] hover:text-white text-gray-700 rounded-lg transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteService(service.id)}
                              className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* RESOURCES TAB */}
            {activeTab === "resources" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Articles, Case Studies & Blog Posts</h2>
                    <p className="text-xs text-gray-500">Edit marketing copy, tags, author details, and client case study results.</p>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Search title, category, or tags..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="px-3 py-1.5 text-xs rounded-lg border border-gray-300 w-full sm:w-60 focus:outline-none focus:border-[#ff5b0a]"
                    />
                    <button
                      onClick={() =>
                        setEditingResource({
                          id: `res-${Date.now()}`,
                          slug: "new-article",
                          category: "Articles",
                          title: "New Resource Article",
                          excerpt: "Brief summary of article content.",
                          content: "Full markdown or body content here.",
                          date: "2026",
                          author: "SPE Editorial Team",
                          readTime: "5 min read",
                          image: "/images/homepage/real-estate.webp",
                          link: "/articles/new-article",
                          tags: ["Tutorial", "Best Practices"],
                          metrics: [],
                        })
                      }
                      className="px-3 py-1.5 text-xs font-bold bg-[#ff5b0a] text-white rounded-lg hover:bg-[#e04f05] flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                    >
                      <i className="fa-solid fa-plus"></i> Add Resource
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Title</th>
                          <th className="px-4 py-3">Author & Date</th>
                          <th className="px-4 py-3">Tags</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-700">
                        {resources
                          .filter(
                            (r) =>
                              r.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                              r.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
                              (r.tags && r.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase())))
                          )
                          .map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    item.category === "Articles"
                                      ? "bg-blue-100 text-blue-700"
                                      : item.category === "Case Studies"
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-orange-100 text-orange-700"
                                  }`}
                                >
                                  {item.category}
                                </span>
                              </td>
                              <td className="px-4 py-3 font-semibold text-gray-900 max-w-xs truncate">
                                {item.title}
                              </td>
                              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                {item.author} &bull; {item.date}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex gap-1 flex-wrap max-w-xs">
                                  {item.tags?.slice(0, 3).map((tag, idx) => (
                                    <span key={idx} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-right whitespace-nowrap">
                                <button
                                  onClick={() => setEditingResource(item)}
                                  className="px-2.5 py-1 text-xs font-semibold bg-gray-100 hover:bg-[#ff5b0a] hover:text-white text-gray-700 rounded-lg mr-1.5 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteResource(item.id)}
                                  className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TESTIMONIALS TAB */}
            {activeTab === "testimonials" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Client Reviews & Testimonials</h2>
                    <p className="text-xs text-gray-500">Edit ratings, client quotes, company names, and project types.</p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingTestimonial({
                        id: `test-${Date.now()}`,
                        author: "Client Name",
                        role: "Creative Director",
                        company: "Studio Name",
                        location: "USA",
                        avatar: "",
                        quote: "Great service and turnaround times!",
                        rating: 5,
                        projectType: "Real Estate HDR",
                      })
                    }
                    className="px-3 py-1.5 text-xs font-bold bg-[#ff5b0a] text-white rounded-lg hover:bg-[#e04f05] flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                  >
                    <i className="fa-solid fa-plus"></i> Add Testimonial
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {testimonials.map((test) => (
                    <div
                      key={test.id}
                      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex text-amber-400 text-xs">
                            {Array.from({ length: test.rating || 5 }).map((_, idx) => (
                              <i key={idx} className="fa-solid fa-star"></i>
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400 font-semibold">{test.projectType}</span>
                        </div>
                        <p className="text-xs text-gray-700 italic leading-relaxed">
                          &ldquo;{test.quote}&rdquo;
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-xs text-gray-900">{test.author}</div>
                          <div className="text-[11px] text-gray-500">
                            {test.role} &bull; {test.company} ({test.location})
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingTestimonial(test)}
                            className="px-2 py-1 text-xs font-semibold bg-gray-100 hover:bg-[#ff5b0a] hover:text-white rounded-lg transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(test.id)}
                            className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GALLERY TAB */}
            {activeTab === "gallery" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Portfolio Gallery Tabs & Comparison Sliders</h2>
                    <p className="text-xs text-gray-500">Manage categories, before/after images, and comparison titles.</p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingGalleryTab({
                        id: `tab-${Date.now()}`,
                        name: "New Gallery Category",
                        items: [],
                      })
                    }
                    className="px-3 py-1.5 text-xs font-bold bg-[#ff5b0a] text-white rounded-lg hover:bg-[#e04f05] flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                  >
                    <i className="fa-solid fa-plus"></i> Add Gallery Tab
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gallery.map((tab) => (
                    <div
                      key={tab.id}
                      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-gray-900 text-base">{tab.name}</h3>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-semibold">
                            {tab.items?.length || 0} comparison pairs
                          </span>
                        </div>

                        <div className="mt-4 space-y-2">
                          {tab.items?.slice(0, 3).map((item) => (
                            <div
                              key={item.id}
                              className="text-xs bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex items-center justify-between"
                            >
                              <span className="font-semibold text-gray-800">{item.title}</span>
                              <span className="text-[10px] text-gray-400 font-mono truncate max-w-[200px]">
                                {item.beforeSrc?.split("/").pop()}
                              </span>
                            </div>
                          ))}
                          {tab.items && tab.items.length > 3 && (
                            <div className="text-[11px] text-gray-400 text-center font-medium">
                              +{tab.items.length - 3} more items in this tab
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <Link
                          href="/sample-images.php"
                          target="_blank"
                          className="text-xs text-gray-500 hover:text-[#ff5b0a] flex items-center gap-1"
                        >
                          <i className="fa-solid fa-eye"></i> Preview Gallery
                        </Link>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setEditingGalleryTab(tab)}
                            className="px-3 py-1 text-xs font-semibold bg-gray-100 hover:bg-[#ff5b0a] hover:text-white rounded-lg transition-colors"
                          >
                            Edit Tab Items
                          </button>
                          <button
                            onClick={() => handleDeleteGalleryTab(tab.id)}
                            className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAGES CMS TAB */}
            {activeTab === "pages" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Page-by-Page CMS Store</h2>
                    <p className="text-xs text-gray-500">Edit page titles, meta descriptions, hero banners, and dynamic sections.</p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingPage({
                        slug: "custom-page",
                        title: "Custom Page Title",
                        metaDescription: "Page description for SEO",
                        hero: {
                          title: "Hero Banner Headline",
                          tagline: "Engaging sub-headline",
                          ctaText: "Contact Us",
                          ctaLink: "/contact-us.php",
                        },
                        sections: [],
                      })
                    }
                    className="px-3 py-1.5 text-xs font-bold bg-[#ff5b0a] text-white rounded-lg hover:bg-[#e04f05] flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                  >
                    <i className="fa-solid fa-plus"></i> Add New Page
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pages.map((page) => (
                    <div
                      key={page.slug}
                      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">
                            /{page.slug}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-base">{page.title}</h3>
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                          {page.metaDescription || page.hero?.tagline || "No description set"}
                        </p>
                        {page.hero?.title && (
                          <div className="mt-3 p-2 bg-gray-50 rounded-lg text-[11px] text-gray-600">
                            <strong>Hero:</strong> {page.hero.title}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <Link
                          href={`/${page.slug}`}
                          target="_blank"
                          className="text-xs text-gray-500 hover:text-[#ff5b0a] flex items-center gap-1"
                        >
                          <i className="fa-solid fa-eye"></i> View Page
                        </Link>
                        <button
                          onClick={() => setEditingPage(page)}
                          className="px-3 py-1 text-xs font-semibold bg-gray-100 hover:bg-[#ff5b0a] hover:text-white rounded-lg transition-colors"
                        >
                          Edit Content
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB 7: SETTINGS & BRANDING ================= */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border shadow-sm">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Website Branding, Logos & Icons</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Dynamically manage header logo, footer logo, top browser favicon icon, and contact information.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border shadow-sm p-6 sm:p-8 space-y-6">
                  {/* Logo & Favicon Section */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b">
                      Logos & Browser Icons (Stored in Supabase)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Header Logo */}
                      <div className="p-4 border rounded-2xl bg-gray-50/50 space-y-3">
                        <label className="block font-bold text-gray-800 text-xs">
                          Header Logo (Navbar)
                        </label>
                        <div className="h-20 bg-white border rounded-xl flex items-center justify-center p-2 overflow-hidden">
                          {siteSettings["site_logo"]?.value ? (
                            <img
                              src={siteSettings["site_logo"].value}
                              alt="Header logo preview"
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <span className="text-xs text-gray-400">No logo set</span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={siteSettings["site_logo"]?.value || ""}
                          onChange={(e) =>
                            setSiteSettings({
                              ...siteSettings,
                              site_logo: { ...siteSettings["site_logo"], value: e.target.value },
                            })
                          }
                          className="w-full p-2 border rounded-xl text-xs bg-white"
                          placeholder="Image URL"
                        />
                        <ImageUploadButton
                          folder="logos"
                          label="Upload New Logo"
                          currentValue={siteSettings["site_logo"]?.value || ""}
                          onUploadSuccess={(url) => {
                            setSiteSettings({
                              ...siteSettings,
                              site_logo: { ...siteSettings["site_logo"], value: url },
                            });
                            showToast("Header logo uploaded to Supabase Storage!");
                          }}
                        />
                      </div>

                      {/* Footer Logo */}
                      <div className="p-4 border rounded-2xl bg-gray-50/50 space-y-3">
                        <label className="block font-bold text-gray-800 text-xs">
                          Footer Logo
                        </label>
                        <div className="h-20 bg-slate-900 border rounded-xl flex items-center justify-center p-2 overflow-hidden">
                          {siteSettings["site_footer_logo"]?.value ? (
                            <img
                              src={siteSettings["site_footer_logo"].value}
                              alt="Footer logo preview"
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <span className="text-xs text-gray-400">No logo set</span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={siteSettings["site_footer_logo"]?.value || ""}
                          onChange={(e) =>
                            setSiteSettings({
                              ...siteSettings,
                              site_footer_logo: { ...siteSettings["site_footer_logo"], value: e.target.value },
                            })
                          }
                          className="w-full p-2 border rounded-xl text-xs bg-white"
                          placeholder="Image URL"
                        />
                        <ImageUploadButton
                          folder="logos"
                          label="Upload Footer Logo"
                          currentValue={siteSettings["site_footer_logo"]?.value || ""}
                          onUploadSuccess={(url) => {
                            setSiteSettings({
                              ...siteSettings,
                              site_footer_logo: { ...siteSettings["site_footer_logo"], value: url },
                            });
                            showToast("Footer logo uploaded to Supabase Storage!");
                          }}
                        />
                      </div>

                      {/* Browser Favicon */}
                      <div className="p-4 border rounded-2xl bg-gray-50/50 space-y-3">
                        <label className="block font-bold text-gray-800 text-xs">
                          Top Page Icon (Browser Favicon)
                        </label>
                        <div className="h-20 bg-white border rounded-xl flex items-center justify-center p-2">
                          {siteSettings["site_favicon"]?.value ? (
                            <img
                              src={siteSettings["site_favicon"].value}
                              alt="Favicon preview"
                              className="w-8 h-8 object-contain shadow-sm rounded"
                            />
                          ) : (
                            <span className="text-xs text-gray-400">No icon set</span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={siteSettings["site_favicon"]?.value || ""}
                          onChange={(e) =>
                            setSiteSettings({
                              ...siteSettings,
                              site_favicon: { ...siteSettings["site_favicon"], value: e.target.value },
                            })
                          }
                          className="w-full p-2 border rounded-xl text-xs bg-white"
                          placeholder="Favicon .ico or .png URL"
                        />
                        <ImageUploadButton
                          folder="favicons"
                          label="Upload New Favicon"
                          currentValue={siteSettings["site_favicon"]?.value || ""}
                          onUploadSuccess={(url) => {
                            setSiteSettings({
                              ...siteSettings,
                              site_favicon: { ...siteSettings["site_favicon"], value: url },
                            });
                            showToast("Favicon uploaded to Supabase Storage!");
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Brand Information Section */}
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b">
                      Brand Information & Contacts
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Company / Brand Name</label>
                        <input
                          type="text"
                          value={siteSettings["site_name"]?.value || ""}
                          onChange={(e) =>
                            setSiteSettings({
                              ...siteSettings,
                              site_name: { ...siteSettings["site_name"], value: e.target.value },
                            })
                          }
                          className="w-full p-2.5 border rounded-xl text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Site Tagline</label>
                        <input
                          type="text"
                          value={siteSettings["site_tagline"]?.value || ""}
                          onChange={(e) =>
                            setSiteSettings({
                              ...siteSettings,
                              site_tagline: { ...siteSettings["site_tagline"], value: e.target.value },
                            })
                          }
                          className="w-full p-2.5 border rounded-xl text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Contact Phone</label>
                        <input
                          type="text"
                          value={siteSettings["contact_phone"]?.value || ""}
                          onChange={(e) =>
                            setSiteSettings({
                              ...siteSettings,
                              contact_phone: { ...siteSettings["contact_phone"], value: e.target.value },
                            })
                          }
                          className="w-full p-2.5 border rounded-xl text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Contact Email</label>
                        <input
                          type="email"
                          value={siteSettings["contact_email"]?.value || ""}
                          onChange={(e) =>
                            setSiteSettings({
                              ...siteSettings,
                              contact_email: { ...siteSettings["contact_email"], value: e.target.value },
                            })
                          }
                          className="w-full p-2.5 border rounded-xl text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t flex items-center justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#ff5b0a] hover:bg-[#e04f05] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-2"
                    >
                      <i className="fa-solid fa-floppy-disk"></i>
                      <span>Save All Brand Settings</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ================= TAB 8: ADMIN CREDENTIALS & SECURITY ================= */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border shadow-sm">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Admin Account & Credentials</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Update your administrator login username (email), display name, and password stored in PostgreSQL.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                      <i className="fa-solid fa-shield-halved mr-1"></i> Role: {user?.role || "admin"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Account Overview Box */}
                  <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#ff5b0a]/10 text-[#ff5b0a] flex items-center justify-center text-2xl font-bold mx-auto">
                      <i className="fa-solid fa-user-gear"></i>
                    </div>
                    <div className="text-center">
                      <h3 className="font-extrabold text-gray-900 text-base">
                        {user?.first_name} {user?.last_name}
                      </h3>
                      <p className="text-xs font-mono text-gray-500 mt-1">{user?.email}</p>
                    </div>

                    <div className="pt-4 border-t space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">User ID</span>
                        <span className="font-mono font-bold text-gray-800">#{user?.id}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Access Level</span>
                        <span className="font-bold text-emerald-600 uppercase">Administrator</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-500">Storage</span>
                        <span className="text-gray-700 font-semibold">PostgreSQL (Supabase)</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                      <i className="fa-solid fa-triangle-exclamation mr-1 text-amber-600"></i>
                      <strong>Important:</strong> Changing your email or password updates your user record in PostgreSQL immediately. You will use the new credentials for all subsequent sign-ins.
                    </div>
                  </div>

                  {/* Edit Form */}
                  <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-6 sm:p-8">
                    <form onSubmit={handleSaveAdminAccount} className="space-y-6">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b">
                          Basic Profile & Username
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              Admin Username / Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              value={adminEmail}
                              onChange={(e) => setAdminEmail(e.target.value)}
                              className="w-full p-2.5 border rounded-xl text-xs bg-white focus:border-[#ff5b0a] outline-none"
                              required
                            />
                            <p className="text-[10px] text-gray-400 mt-1">This is the email address used to log into the Admin Console.</p>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              Role / Permissions
                            </label>
                            <input
                              type="text"
                              value={user?.role || "admin"}
                              disabled
                              className="w-full p-2.5 border rounded-xl text-xs bg-gray-100 text-gray-500 cursor-not-allowed"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">First Name</label>
                            <input
                              type="text"
                              value={adminFirstName}
                              onChange={(e) => setAdminFirstName(e.target.value)}
                              className="w-full p-2.5 border rounded-xl text-xs bg-white focus:border-[#ff5b0a] outline-none"
                              placeholder="System"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Last Name</label>
                            <input
                              type="text"
                              value={adminLastName}
                              onChange={(e) => setAdminLastName(e.target.value)}
                              className="w-full p-2.5 border rounded-xl text-xs bg-white focus:border-[#ff5b0a] outline-none"
                              placeholder="Admin"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Change Password Section */}
                      <div className="pt-4 border-t">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b">
                          Security & Change Password
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              New Password
                            </label>
                            <input
                              type="password"
                              value={adminNewPassword}
                              onChange={(e) => setAdminNewPassword(e.target.value)}
                              placeholder="Leave blank to keep current"
                              className="w-full p-2.5 border rounded-xl text-xs bg-white focus:border-[#ff5b0a] outline-none"
                              minLength={6}
                            />
                            <p className="text-[10px] text-gray-400 mt-1">Minimum 6 characters. Leave empty if you only want to change your username/name.</p>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              value={adminConfirmPassword}
                              onChange={(e) => setAdminConfirmPassword(e.target.value)}
                              placeholder="Confirm new password"
                              className="w-full p-2.5 border rounded-xl text-xs bg-white focus:border-[#ff5b0a] outline-none"
                              minLength={6}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t flex items-center justify-end">
                        <button
                          type="submit"
                          disabled={adminUpdating}
                          className="px-6 py-2.5 bg-[#ff5b0a] hover:bg-[#e04f05] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                          <i className={`fa-solid ${adminUpdating ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
                          <span>{adminUpdating ? "Updating in PostgreSQL..." : "Save Admin Credentials"}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* ================= MODAL EDITORS ================= */}

      {/* 1. EDIT SERVICE MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Edit Service Category</h3>
                <p className="text-xs text-gray-500">ID: {editingService.id}</p>
              </div>
              <button
                onClick={() => setEditingService(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Service Name</label>
                  <input
                    type="text"
                    value={editingService.name}
                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Slug (URL Path)</label>
                  <input
                    type="text"
                    value={editingService.slug}
                    onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Marketing Tagline</label>
                <input
                  type="text"
                  value={editingService.tagline || ""}
                  onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                  className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Turnaround Time</label>
                  <input
                    type="text"
                    value={editingService.turnaroundTime || ""}
                    onChange={(e) => setEditingService({ ...editingService, turnaroundTime: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                    placeholder="12 - 24 Hours"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">FontAwesome Icon Class</label>
                  <input
                    type="text"
                    value={editingService.iconClass || ""}
                    onChange={(e) => setEditingService({ ...editingService, iconClass: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                    placeholder="fa-solid fa-house-chimney"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Short Description (Cards & Previews)</label>
                <textarea
                  rows={2}
                  value={editingService.shortDesc || ""}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Detailed Description</label>
                <textarea
                  rows={4}
                  value={editingService.fullDesc || ""}
                  onChange={(e) => setEditingService({ ...editingService, fullDesc: e.target.value })}
                  className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-gray-700">Before Image</label>
                    <ImageUploadButton
                      folder="services"
                      label="Upload Before"
                      currentValue={editingService.beforeSrc || ""}
                      onUploadSuccess={(url) => setEditingService({ ...editingService, beforeSrc: url })}
                    />
                  </div>
                  <input
                    type="text"
                    value={editingService.beforeSrc || ""}
                    onChange={(e) => setEditingService({ ...editingService, beforeSrc: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                    placeholder="Image URL"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-gray-700">After Image</label>
                    <ImageUploadButton
                      folder="services"
                      label="Upload After"
                      currentValue={editingService.afterSrc || ""}
                      onUploadSuccess={(url) => setEditingService({ ...editingService, afterSrc: url })}
                    />
                  </div>
                  <input
                    type="text"
                    value={editingService.afterSrc || ""}
                    onChange={(e) => setEditingService({ ...editingService, afterSrc: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                    placeholder="Image URL"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Deliverables (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingService.deliverables?.join(", ") || ""}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      deliverables: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Key Benefits (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingService.keyBenefits?.join(", ") || ""}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      keyBenefits: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                />
              </div>

              <div className="pt-4 border-t flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl border hover:bg-gray-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white font-bold shadow-md"
                >
                  Save to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. EDIT RESOURCE MODAL */}
      {editingResource && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Edit Resource Item</h3>
                <p className="text-xs text-gray-500">ID: {editingResource.id}</p>
              </div>
              <button
                onClick={() => setEditingResource(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSaveResource} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingResource.title}
                    onChange={(e) => setEditingResource({ ...editingResource, title: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={editingResource.category}
                    onChange={(e) => setEditingResource({ ...editingResource, category: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none bg-white"
                  >
                    <option value="Articles">Articles</option>
                    <option value="Case Studies">Case Studies</option>
                    <option value="Blog">Blog</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Slug</label>
                  <input
                    type="text"
                    value={editingResource.slug}
                    onChange={(e) => setEditingResource({ ...editingResource, slug: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={editingResource.author}
                    onChange={(e) => setEditingResource({ ...editingResource, author: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingResource.readTime}
                    onChange={(e) => setEditingResource({ ...editingResource, readTime: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Excerpt Summary</label>
                <textarea
                  rows={2}
                  value={editingResource.excerpt}
                  onChange={(e) => setEditingResource({ ...editingResource, excerpt: e.target.value })}
                  className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Article / Body Content</label>
                <textarea
                  rows={5}
                  value={editingResource.content || ""}
                  onChange={(e) => setEditingResource({ ...editingResource, content: e.target.value })}
                  className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-gray-700">Featured Image</label>
                  <ImageUploadButton
                    folder="articles"
                    label="Upload Article Image"
                    currentValue={editingResource.image}
                    onUploadSuccess={(url) => setEditingResource({ ...editingResource, image: url })}
                  />
                </div>
                <input
                  type="text"
                  value={editingResource.image}
                  onChange={(e) => setEditingResource({ ...editingResource, image: e.target.value })}
                  className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                  placeholder="Image URL"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={editingResource.tags?.join(", ") || ""}
                  onChange={(e) =>
                    setEditingResource({
                      ...editingResource,
                      tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                />
              </div>

              <div className="pt-4 border-t flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingResource(null)}
                  className="px-4 py-2 rounded-xl border hover:bg-gray-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white font-bold shadow-md"
                >
                  Save to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. EDIT TESTIMONIAL MODAL */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-bold text-gray-900">Edit Client Testimonial</h3>
              <button
                onClick={() => setEditingTestimonial(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Client Quote</label>
                <textarea
                  rows={3}
                  value={editingTestimonial.quote}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                  className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={editingTestimonial.author}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Role / Job Title</label>
                  <input
                    type="text"
                    value={editingTestimonial.role}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={editingTestimonial.company}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Location (Country/City)</label>
                  <input
                    type="text"
                    value={editingTestimonial.location}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, location: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Rating (1 to 5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={editingTestimonial.rating}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) || 5 })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Project Type</label>
                  <input
                    type="text"
                    value={editingTestimonial.projectType}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, projectType: e.target.value })}
                    className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-gray-700">Client Avatar Image</label>
                  <ImageUploadButton
                    folder="testimonials"
                    label="Upload Avatar"
                    currentValue={editingTestimonial.avatar}
                    onUploadSuccess={(url) => setEditingTestimonial({ ...editingTestimonial, avatar: url })}
                  />
                </div>
                <input
                  type="text"
                  value={editingTestimonial.avatar}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, avatar: e.target.value })}
                  className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none text-xs"
                  placeholder="Avatar Image URL"
                />
              </div>

              <div className="pt-4 border-t flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
                  className="px-4 py-2 rounded-xl border hover:bg-gray-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white font-bold shadow-md"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. EDIT GALLERY TAB MODAL */}
      {editingGalleryTab && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Edit Gallery Tab</h3>
                <p className="text-xs text-gray-500">ID: {editingGalleryTab.id}</p>
              </div>
              <button
                onClick={() => setEditingGalleryTab(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSaveGalleryTab} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Category Tab Name</label>
                <input
                  type="text"
                  value={editingGalleryTab.name}
                  onChange={(e) => setEditingGalleryTab({ ...editingGalleryTab, name: e.target.value })}
                  className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-gray-700">Before / After Comparison Items</label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingGalleryTab({
                        ...editingGalleryTab,
                        items: [
                          ...(editingGalleryTab.items || []),
                          {
                            id: `item-${Date.now()}`,
                            title: "New Comparison",
                            beforeSrc: "",
                            beforeAlt: "Before",
                            afterSrc: "",
                            afterAlt: "After",
                          },
                        ],
                      })
                    }
                    className="text-[11px] text-[#ff5b0a] font-bold hover:underline flex items-center gap-1"
                  >
                    <i className="fa-solid fa-plus"></i> Add Item
                  </button>
                </div>

                <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
                  {editingGalleryTab.items?.map((item, idx) => (
                    <div key={item.id} className="p-3 border rounded-2xl bg-gray-50 space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-800">Item #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setEditingGalleryTab({
                              ...editingGalleryTab,
                              items: editingGalleryTab.items.filter((_, i) => i !== idx),
                            })
                          }
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>

                      <div>
                        <label className="block text-[11px] text-gray-500">Title</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const newItems = [...editingGalleryTab.items];
                            newItems[idx].title = e.target.value;
                            setEditingGalleryTab({ ...editingGalleryTab, items: newItems });
                          }}
                          className="w-full p-2 border rounded-lg bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="flex items-center justify-between mb-0.5">
                            <label className="text-[11px] text-gray-500">Before Image</label>
                            <ImageUploadButton
                              folder="gallery"
                              label="Upload"
                              currentValue={item.beforeSrc}
                              onUploadSuccess={(url) => {
                                const newItems = [...editingGalleryTab.items];
                                newItems[idx].beforeSrc = url;
                                setEditingGalleryTab({ ...editingGalleryTab, items: newItems });
                              }}
                            />
                          </div>
                          <input
                            type="text"
                            value={item.beforeSrc}
                            onChange={(e) => {
                              const newItems = [...editingGalleryTab.items];
                              newItems[idx].beforeSrc = e.target.value;
                              setEditingGalleryTab({ ...editingGalleryTab, items: newItems });
                            }}
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="Before Image URL"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-0.5">
                            <label className="text-[11px] text-gray-500">After Image</label>
                            <ImageUploadButton
                              folder="gallery"
                              label="Upload"
                              currentValue={item.afterSrc}
                              onUploadSuccess={(url) => {
                                const newItems = [...editingGalleryTab.items];
                                newItems[idx].afterSrc = url;
                                setEditingGalleryTab({ ...editingGalleryTab, items: newItems });
                              }}
                            />
                          </div>
                          <input
                            type="text"
                            value={item.afterSrc}
                            onChange={(e) => {
                              const newItems = [...editingGalleryTab.items];
                              newItems[idx].afterSrc = e.target.value;
                              setEditingGalleryTab({ ...editingGalleryTab, items: newItems });
                            }}
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="After Image URL"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingGalleryTab(null)}
                  className="px-4 py-2 rounded-xl border hover:bg-gray-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white font-bold shadow-md"
                >
                  Save Gallery Tab
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. EDIT PAGE CMS MODAL */}
      {editingPage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Edit Page CMS Content</h3>
                <p className="text-xs text-gray-500">Slug: /{editingPage.slug}</p>
              </div>
              <button
                onClick={() => setEditingPage(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSavePage} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Page Title</label>
                <input
                  type="text"
                  value={editingPage.title}
                  onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                  className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">SEO Meta Description</label>
                <textarea
                  rows={2}
                  value={editingPage.metaDescription || ""}
                  onChange={(e) => setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                  className="w-full p-2.5 border rounded-xl focus:border-[#ff5b0a] outline-none"
                />
              </div>

              <div className="p-4 border rounded-2xl bg-gray-50 space-y-3">
                <h4 className="font-bold text-gray-900 text-sm">Hero Banner Settings</h4>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">Hero Title</label>
                  <input
                    type="text"
                    value={editingPage.hero?.title || ""}
                    onChange={(e) =>
                      setEditingPage({
                        ...editingPage,
                        hero: { ...editingPage.hero, title: e.target.value },
                      })
                    }
                    className="w-full p-2.5 border rounded-xl bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">Hero Tagline / Subtitle</label>
                  <input
                    type="text"
                    value={editingPage.hero?.tagline || ""}
                    onChange={(e) =>
                      setEditingPage({
                        ...editingPage,
                        hero: { ...editingPage.hero, tagline: e.target.value },
                      })
                    }
                    className="w-full p-2.5 border rounded-xl bg-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] text-gray-600 font-bold">Hero Banner Image</label>
                    <ImageUploadButton
                      folder="pages"
                      label="Upload Hero Image"
                      currentValue={editingPage.hero?.image || ""}
                      onUploadSuccess={(url) =>
                        setEditingPage({
                          ...editingPage,
                          hero: { ...editingPage.hero, image: url },
                        })
                      }
                    />
                  </div>
                  <input
                    type="text"
                    value={editingPage.hero?.image || ""}
                    onChange={(e) =>
                      setEditingPage({
                        ...editingPage,
                        hero: { ...editingPage.hero, image: e.target.value },
                      })
                    }
                    className="w-full p-2.5 border rounded-xl bg-white text-xs"
                    placeholder="Image URL"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-600 mb-1">Hero CTA Button Text</label>
                    <input
                      type="text"
                      value={editingPage.hero?.ctaText || ""}
                      onChange={(e) =>
                        setEditingPage({
                          ...editingPage,
                          hero: { ...editingPage.hero, ctaText: e.target.value },
                        })
                      }
                      className="w-full p-2.5 border rounded-xl bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-600 mb-1">Hero CTA Link</label>
                    <input
                      type="text"
                      value={editingPage.hero?.ctaLink || ""}
                      onChange={(e) =>
                        setEditingPage({
                          ...editingPage,
                          hero: { ...editingPage.hero, ctaLink: e.target.value },
                        })
                      }
                      className="w-full p-2.5 border rounded-xl bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-4 py-2 rounded-xl border hover:bg-gray-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white font-bold shadow-md"
                >
                  Save Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
