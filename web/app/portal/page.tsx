"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getSettings, saveSingleSetting } from "@/lib/api/content";
import {
  ClientSharedDeliverable,
  DeliverableFile,
  defaultSharedDeliverables,
  normalizeDeliverable,
} from "@/types/deliverables";
import { BrandLoader } from "@/components/ui/BrandLoader";

export default function ClientPortalPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();

  const [deliverables, setDeliverables] = useState<ClientSharedDeliverable[]>(
    defaultSharedDeliverables.map(normalizeDeliverable)
  );
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeLightbox, setActiveLightbox] = useState<{
    item: ClientSharedDeliverable;
    fileIndex: number;
  } | null>(null);
  const [showBeforeAfter, setShowBeforeAfter] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [newBatchNotes, setNewBatchNotes] = useState("");
  const [newBatchSubmitted, setNewBatchSubmitted] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Load client deliverables from site settings
  const loadDeliverables = async () => {
    setLoading(true);
    try {
      const settings = await getSettings();
      if (settings?.client_shared_media_json?.value) {
        const parsed = JSON.parse(settings.client_shared_media_json.value);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDeliverables(parsed.map(normalizeDeliverable));
          setLoading(false);
          return;
        }
      }
      setDeliverables(defaultSharedDeliverables.map(normalizeDeliverable));
    } catch {
      setDeliverables(defaultSharedDeliverables.map(normalizeDeliverable));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeliverables();
  }, []);

  // Filter deliverables: if authenticated, filter by user email or show all if admin/demo
  const [previewClientEmail, setPreviewClientEmail] = useState<string>("");

  const userEmail = (user?.email || "").trim().toLowerCase();
  const isAdmin = user?.role === "admin";

  const allClientEmails = Array.from(
    new Set(deliverables.map((d) => (d.clientEmail || "").trim().toLowerCase()).filter(Boolean))
  );

  const effectiveEmail = (isAdmin && previewClientEmail)
    ? previewClientEmail.trim().toLowerCase()
    : userEmail;

  const clientScopedItems = deliverables.filter((item) => {
    if (isAdmin && !previewClientEmail) return true;
    const itemEmail = (item.clientEmail || "").trim().toLowerCase();
    return Boolean(effectiveEmail) && itemEmail === effectiveEmail;
  });

  const categories = ["All", ...Array.from(new Set(clientScopedItems.map((d) => d.category)))];

  const filteredItems = clientScopedItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.notes && item.notes.toLowerCase().includes(q)) ||
      item.files.some((f) => f.name.toLowerCase().includes(q));

    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Client approval / status update action
  const handleUpdateStatus = async (item: ClientSharedDeliverable, newStatus: ClientSharedDeliverable["status"]) => {
    const updated = deliverables.map((d) => (d.id === item.id ? { ...d, status: newStatus } : d));
    setDeliverables(updated);
    if (activeLightbox?.item.id === item.id) {
      setActiveLightbox({
        ...activeLightbox,
        item: { ...activeLightbox.item, status: newStatus },
      });
    }
    try {
      await saveSingleSetting("client_shared_media_json", JSON.stringify(updated));
      showToast(
        newStatus === "Approved"
          ? `✓ "${item.title}" approved successfully!`
          : `Status updated to "${newStatus}"`
      );
    } catch {
      showToast("Updated locally. Connect API to persist changes.");
    }
  };

  const handleDownloadFile = async (file: DeliverableFile, batchTitle: string) => {
    const downloadUrl = file.downloadUrl || file.imageUrl;
    showToast(`Downloading photo: ${file.name}...`);
    try {
      const response = await fetch(downloadUrl, { mode: "cors" });
      if (!response.ok) throw new Error("Fetch failed");
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${file.name.replace(/[^a-z0-9_-]/gi, "_").toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.download = `${file.name.replace(/[^a-z0-9_-]/gi, "_").toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadAllInBatch = (item: ClientSharedDeliverable) => {
    if (!item.files || item.files.length === 0) return;
    item.files.forEach((f, idx) => {
      setTimeout(() => {
        handleDownloadFile(f, item.title);
      }, idx * 400);
    });
    showToast(`Downloading all ${item.files.length} photos in "${item.title}"...`);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
        <BrandLoader message="Authenticating client session..." />
      </div>
    );
  }

  // Unauthenticated screen (Light theme)
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-slate-50 text-slate-900">
        <div className="w-full max-w-md bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 p-3 flex items-center justify-center mx-auto text-blue-600 shadow-sm">
            <i className="fa-solid fa-lock text-2xl text-blue-600"></i>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-heading text-slate-900">
              Client Portal
            </h1>
            <p className="text-sm text-slate-600 mt-2">
              Sign in with your client credentials to access your private deliverable sets and download high-resolution batches.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/login?redirect=/portal"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white shadow-md bg-blue-600 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-arrow-right-to-bracket text-xs"></i>
              <span>Go to Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalBatches = clientScopedItems.length;
  const totalPhotosCount = clientScopedItems.reduce((acc, curr) => acc + (curr.files?.length || 1), 0);
  const readyCount = clientScopedItems.filter((i) => i.status === "Ready for Download").length;
  const approvedCount = clientScopedItems.filter((i) => i.status === "Approved").length;
  const inReviewCount = clientScopedItems.filter((i) => i.status === "In Review").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-xs font-bold shadow-xl flex items-center gap-3 animate-slideDown">
          <i className="fa-solid fa-circle-check text-emerald-600 text-sm"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Portal Top Header (Light Theme) */}
      <header className="bg-white/95 border-b border-slate-200 backdrop-blur-md sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <img
                  src="/images/lirisha-camera-logo.png"
                  alt="LIRISHA"
                  className="w-full h-full object-contain filter drop-shadow-xs"
                />
              </div>
              <div>
                <span className="font-black text-base sm:text-lg tracking-wider text-slate-900 font-heading block leading-tight">
                  LIRISHA
                </span>
                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider block">
                  Client Deliverables Portal
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold transition-all"
              >
                <i className="fa-solid fa-gear text-purple-600"></i>
                <span>Switch to Admin CMS</span>
              </Link>
            )}

            <div className="text-right hidden md:block">
              <span className="block text-xs font-bold text-slate-900">
                {user?.first_name ? `${user.first_name} ${user.last_name || ""}` : user?.email}
              </span>
              <span className="block text-[10px] text-slate-500">
                {isAdmin ? "Admin Role (Portal Preview)" : "Verified Client"}
              </span>
            </div>

            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-700 hover:text-rose-600 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrow-right-from-bracket text-xs text-rose-500"></i>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Admin Preview Mode Bar */}
        {isAdmin && (
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse"></span>
              <span className="font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                <i className="fa-solid fa-shield-halved text-purple-600"></i>
                Admin Preview Bar:
              </span>
              <span className="text-purple-700">Test client portal isolation across accounts</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label className="text-purple-900 font-bold">Simulate Client View:</label>
              <select
                value={previewClientEmail}
                onChange={(e) => setPreviewClientEmail(e.target.value)}
                className="bg-white border border-purple-300 text-purple-950 rounded-xl px-3 py-1.5 focus:outline-none focus:border-purple-500 font-medium shadow-xs"
              >
                <option value="">All Clients (Master Admin View - {deliverables.length} Sets)</option>
                {allClientEmails.map((email) => {
                  const count = deliverables.filter(
                    (d) => (d.clientEmail || "").trim().toLowerCase() === email
                  ).length;
                  return (
                    <option key={email} value={email}>
                      {email} ({count} {count === 1 ? "Set" : "Sets"})
                    </option>
                  );
                })}
              </select>
              <Link
                href="/admin"
                className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                <i className="fa-solid fa-gear text-[11px]"></i>
                <span>Open Dropbox Studio</span>
              </Link>
            </div>
          </div>
        )}

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-[#1265E8] to-indigo-700 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-wider">
                <i className="fa-solid fa-layer-group text-blue-200"></i>
                <span>Client Orders &amp; Photo Sets</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-heading">
                Welcome, {user?.first_name || (user?.email ? user.email.split("@")[0] : "Client")}!
              </h1>
              <p className="text-xs sm:text-sm text-blue-50 leading-relaxed">
                Here are your completed photo batches and deliverable sets. Review individual photos, inspect full-resolution files in the lightbox, or download entire sets at once.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-blue-50 text-blue-700 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-cloud-arrow-up text-sm"></i>
                <span>Request New Batch</span>
              </button>
              <button
                onClick={loadDeliverables}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-arrows-rotate text-xs"></i>
                <span>Sync Deliverables</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row (Light Theme) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Deliverable Sets</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <i className="fa-solid fa-folder-open text-sm"></i>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">{totalBatches}</div>
            <span className="text-[11px] text-slate-500">{totalPhotosCount} Total Photos</span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-emerald-600 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Ready for Download</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <i className="fa-solid fa-download text-sm"></i>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-heading">{readyCount}</div>
            <span className="text-[11px] text-slate-500">Batches Available</span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-blue-600 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Approved</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <i className="fa-solid fa-circle-check text-sm"></i>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-600 font-heading">{approvedCount}</div>
            <span className="text-[11px] text-slate-500">Client Signed-Off</span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-amber-600 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Under Review</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <i className="fa-solid fa-clock text-sm"></i>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600 font-heading">{inReviewCount}</div>
            <span className="text-[11px] text-slate-500">Awaiting Feedback</span>
          </div>
        </div>

        {/* Filter & Search Bar (Light Theme) */}
        <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 hidden sm:inline">
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-magnifying-glass text-xs"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search batches or photos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-xl px-3 py-1.5 focus:outline-none focus:bg-white focus:border-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Ready for Download">Ready for Download</option>
                <option value="Approved">Approved</option>
                <option value="In Review">In Review</option>
              </select>
            </div>
          </div>
        </div>

        {/* Deliverables Grid (Light Theme) */}
        {loading ? (
          <div className="py-20 text-center">
            <BrandLoader message="Fetching latest deliverable sets..." />
          </div>
        ) : clientScopedItems.length === 0 ? (
          <div className="py-20 text-center bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-5 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto text-2xl shadow-xs">
              <i className="fa-solid fa-cloud-arrow-down"></i>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">No Photo Batches Shared Yet</h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Welcome, <span className="text-blue-700 font-bold">{user?.first_name || user?.email}</span>! There are currently no completed photo deliverable sets assigned to <span className="font-mono text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded text-xs">{effectiveEmail}</span>.
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Our post-production team will upload your retouched photos directly into your account. You will then be able to inspect before/after comparisons, approve deliverables, and download full-resolution photo sets.
              </p>
            </div>
            <button
              onClick={loadDeliverables}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 shadow-sm"
            >
              <i className="fa-solid fa-arrows-rotate text-xs"></i>
              <span>Check for New Deliverables</span>
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-white border border-slate-200 rounded-3xl space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400 text-2xl">
              <i className="fa-solid fa-folder-open"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">No Deliverables Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                No deliverables matched your current filters. Clear your search or sync to see the latest assets.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedStatus("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold text-blue-700 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const fileCount = item.files.length;
              return (
                <div
                  key={item.id}
                  className="group bg-white border border-slate-200 hover:border-blue-400 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col hover:-translate-y-1"
                >
                  {/* Main Cover Image */}
                  <div
                    className="relative aspect-[16/10] bg-slate-100 overflow-hidden cursor-pointer"
                    onClick={() => {
                      setActiveLightbox({ item, fileIndex: 0 });
                      setShowBeforeAfter(false);
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-blue-700 backdrop-blur-sm border border-slate-200 shadow-sm">
                        {item.category}
                      </span>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/85 text-white backdrop-blur-sm border border-white/20 flex items-center gap-1.5 shadow-sm">
                        <i className="fa-solid fa-photo-film text-amber-400"></i>
                        <span>{fileCount} {fileCount === 1 ? "Photo" : "Photos"}</span>
                      </span>
                    </div>

                    {/* Bottom Status Badge */}
                    <div className="absolute bottom-3 right-3 pointer-events-none">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5 shadow-sm ${
                          item.status === "Approved"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : item.status === "Ready for Download"
                            ? "bg-blue-100 text-blue-800 border border-blue-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        <i
                          className={`fa-solid text-[9px] ${
                            item.status === "Approved"
                              ? "fa-circle-check text-emerald-700"
                              : item.status === "Ready for Download"
                              ? "fa-cloud-arrow-down text-blue-700"
                              : "fa-clock text-amber-700"
                          }`}
                        ></i>
                        <span>{item.status}</span>
                      </span>
                    </div>

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="px-3.5 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <i className="fa-solid fa-expand text-blue-600"></i>
                        <span>Browse Batch ({fileCount} Photos)</span>
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail Strip for Multi-Photo Set */}
                  {fileCount > 1 && (
                    <div className="bg-slate-50 px-3 py-2 flex items-center gap-2 border-b border-slate-100 overflow-x-auto scrollbar-none">
                      {item.files.map((file, fIdx) => (
                        <button
                          key={file.id || fIdx}
                          onClick={() => {
                            setActiveLightbox({ item, fileIndex: fIdx });
                            setShowBeforeAfter(false);
                          }}
                          className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-slate-200 hover:border-blue-500 shrink-0 transition-all relative group/thumb shadow-xs"
                          title={file.name}
                        >
                          <img src={file.imageUrl} alt={file.name} className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 right-0 bg-slate-900/80 text-[8px] text-white px-1 font-mono leading-none">
                            {fIdx + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Card Info Body (Light Theme) */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                    <div className="space-y-2">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {item.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-mono">
                        <span className="flex items-center gap-1 text-blue-700 font-sans font-bold">
                          <i className="fa-solid fa-layer-group text-[10px]"></i>
                          {fileCount} {fileCount === 1 ? "Photo Set" : "Photos in Set"}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-calendar-check text-[10px] text-slate-400"></i>
                          {item.deliveredDate}
                        </span>
                      </div>

                      {item.notes && (
                        <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200 p-2.5 rounded-xl line-clamp-2 leading-relaxed">
                          <span className="font-bold text-blue-700">Editor Notes: </span>
                          {item.notes}
                        </p>
                      )}
                    </div>

                    {/* Actions Row */}
                    <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => handleDownloadAllInBatch(item)}
                        className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                        title="Download all photos in this batch"
                      >
                        <i className="fa-solid fa-download text-xs"></i>
                        <span>Download All ({fileCount})</span>
                      </button>

                      {item.status !== "Approved" ? (
                        <button
                          onClick={() => handleUpdateStatus(item, "Approved")}
                          className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-bold transition-all flex items-center gap-1.5"
                          title="Approve deliverable batch"
                        >
                          <i className="fa-solid fa-check text-xs"></i>
                          <span className="hidden sm:inline">Approve</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateStatus(item, "In Review")}
                          className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 text-xs font-bold transition-all flex items-center gap-1.5"
                          title="Request revision"
                        >
                          <i className="fa-solid fa-rotate-left text-xs"></i>
                          <span className="hidden sm:inline">Revise</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setActiveLightbox({ item, fileIndex: 0 });
                          setShowBeforeAfter(false);
                        }}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 text-xs transition-all"
                        title="Browse batch gallery"
                      >
                        <i className="fa-solid fa-up-right-and-down-left-from-center text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Batch Lightbox / Multi-File Viewer (High contrast photo canvas + light specs panel) */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-6xl max-h-[95vh] bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-rose-600 hover:border-rose-500 transition-all flex items-center justify-center shadow-lg"
              title="Close viewer"
            >
              <i className="fa-solid fa-xmark text-base"></i>
            </button>

            {/* Left Column: Image Canvas with Navigation */}
            <div className="flex-1 bg-slate-950 flex flex-col justify-between overflow-hidden relative min-h-[50vh] lg:min-h-[75vh]">
              {/* Top Bar inside Canvas */}
              <div className="p-4 flex items-center justify-between text-xs text-slate-300 z-10 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-md font-bold font-mono text-[11px] border border-blue-400/30">
                    Photo {activeLightbox.fileIndex + 1} of {activeLightbox.item.files.length}
                  </span>
                  <span className="text-white font-semibold truncate max-w-xs">
                    {activeLightbox.item.files[activeLightbox.fileIndex]?.name}
                  </span>
                </div>

                {activeLightbox.item.files[activeLightbox.fileIndex]?.beforeImageUrl && (
                  <button
                    onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-blue-300 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-code-compare"></i>
                    <span>{showBeforeAfter ? "Show Final After" : "Show Original Before"}</span>
                  </button>
                )}
              </div>

              {/* Main Photo Display */}
              <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
                <img
                  src={
                    showBeforeAfter && activeLightbox.item.files[activeLightbox.fileIndex]?.beforeImageUrl
                      ? activeLightbox.item.files[activeLightbox.fileIndex].beforeImageUrl
                      : activeLightbox.item.files[activeLightbox.fileIndex]?.imageUrl
                  }
                  alt={activeLightbox.item.files[activeLightbox.fileIndex]?.name}
                  className="max-w-full max-h-[55vh] lg:max-h-[70vh] object-contain rounded-xl shadow-2xl transition-all"
                />

                {/* Left Arrow */}
                {activeLightbox.item.files.length > 1 && (
                  <button
                    onClick={() => {
                      const total = activeLightbox.item.files.length;
                      setActiveLightbox({
                        ...activeLightbox,
                        fileIndex: (activeLightbox.fileIndex - 1 + total) % total,
                      });
                      setShowBeforeAfter(false);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-all border border-white/20"
                    title="Previous photo"
                  >
                    <i className="fa-solid fa-chevron-left text-sm"></i>
                  </button>
                )}

                {/* Right Arrow */}
                {activeLightbox.item.files.length > 1 && (
                  <button
                    onClick={() => {
                      const total = activeLightbox.item.files.length;
                      setActiveLightbox({
                        ...activeLightbox,
                        fileIndex: (activeLightbox.fileIndex + 1) % total,
                      });
                      setShowBeforeAfter(false);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-all border border-white/20"
                    title="Next photo"
                  >
                    <i className="fa-solid fa-chevron-right text-sm"></i>
                  </button>
                )}
              </div>

              {/* Bottom Thumbnail Navigation Carousel */}
              {activeLightbox.item.files.length > 1 && (
                <div className="bg-slate-900/95 p-3 flex items-center gap-2 overflow-x-auto border-t border-slate-800">
                  {activeLightbox.item.files.map((f, idx) => (
                    <button
                      key={f.id || idx}
                      onClick={() => {
                        setActiveLightbox({ ...activeLightbox, fileIndex: idx });
                        setShowBeforeAfter(false);
                      }}
                      className={`w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all relative ${
                        activeLightbox.fileIndex === idx
                          ? "border-blue-500 scale-105 shadow-md shadow-blue-500/40"
                          : "border-slate-700 opacity-60 hover:opacity-100"
                      }`}
                      title={f.name}
                    >
                      <img src={f.imageUrl} alt={f.name} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 right-0 px-1 text-[8px] bg-black/80 text-white font-mono leading-none">
                        #{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Batch & Photo Specifications (Light Theme) */}
            <div className="w-full lg:w-96 bg-white p-6 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-between overflow-y-auto space-y-6 text-slate-900">
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                    {activeLightbox.item.category}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      activeLightbox.item.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : activeLightbox.item.status === "Ready for Download"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {activeLightbox.item.status}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-blue-600 font-bold uppercase tracking-wider block">
                    Deliverable Batch
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading mt-0.5">
                    {activeLightbox.item.title}
                  </h2>
                </div>

                {/* Active Photo Info */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Current Photo #{activeLightbox.fileIndex + 1}
                  </span>
                  <div className="font-bold text-slate-900 text-sm">
                    {activeLightbox.item.files[activeLightbox.fileIndex]?.name}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600 pt-1 border-t border-slate-200">
                    <div>
                      <span className="block text-slate-400 text-[10px]">Resolution</span>
                      <span className="text-slate-800 font-semibold">
                        {activeLightbox.item.files[activeLightbox.fileIndex]?.resolution || "Full High-Res"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[10px]">File Size</span>
                      <span className="text-slate-800 font-semibold">
                        {activeLightbox.item.files[activeLightbox.fileIndex]?.fileSize || "10 MB"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Batch Notes */}
                {activeLightbox.item.notes && (
                  <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                      Production Notes
                    </span>
                    <p className="text-slate-700 text-xs leading-relaxed">{activeLightbox.item.notes}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons inside Lightbox */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                <button
                  onClick={() =>
                    handleDownloadFile(
                      activeLightbox.item.files[activeLightbox.fileIndex],
                      activeLightbox.item.title
                    )
                  }
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-download"></i>
                  <span>Download This Photo (#{activeLightbox.fileIndex + 1})</span>
                </button>

                <button
                  onClick={() => handleDownloadAllInBatch(activeLightbox.item)}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-folder-arrow-down"></i>
                  <span>Download Complete Batch ({activeLightbox.item.files.length} Photos)</span>
                </button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleUpdateStatus(activeLightbox.item, "Approved")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      activeLightbox.item.status === "Approved"
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                    }`}
                  >
                    <i className="fa-solid fa-circle-check"></i>
                    <span>Approve Batch</span>
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(activeLightbox.item, "In Review")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      activeLightbox.item.status === "In Review"
                        ? "bg-amber-600 border-amber-600 text-white"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200"
                    }`}
                  >
                    <i className="fa-solid fa-clock-rotate-left"></i>
                    <span>Request Tweak</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request New Batch Modal (Light Theme) */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Request New Batch Retouch</h3>
                  <p className="text-xs text-slate-500">Submit instructions or Dropbox link for a new photoshoot.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsRequestModalOpen(false);
                  setNewBatchSubmitted(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {newBatchSubmitted ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mx-auto">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h4 className="text-base font-bold text-slate-900">Batch Request Received!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Our production leads will review your assets and update your portal with initial previews within your turnaround window.
                </p>
                <button
                  onClick={() => {
                    setIsRequestModalOpen(false);
                    setNewBatchSubmitted(false);
                    setNewBatchNotes("");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewBatchSubmitted(true);
                  showToast("Batch request submitted to production team!");
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Dropbox Folder Link or RAW File URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://www.dropbox.com/sh/..."
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 font-mono text-[11px] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Service Required</label>
                  <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 transition-all">
                    <option>Real Estate Photo Enhancement</option>
                    <option>Portrait &amp; Model Airbrushing</option>
                    <option>E-Commerce Product Clipping &amp; Retouch</option>
                    <option>Photo Restoration</option>
                    <option>360 Panorama Stitching</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Specific Instructions / Notes</label>
                  <textarea
                    rows={3}
                    value={newBatchNotes}
                    onChange={(e) => setNewBatchNotes(e.target.value)}
                    placeholder="Describe color grading preferences, sky replacement, turnaround urgency..."
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 leading-relaxed transition-all"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsRequestModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition-all"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
