"use client";

import React, { useState, useEffect } from "react";
import { SiteSettingsMap } from "@/types/content";
import { DropboxExplorer } from "@/features/dropbox";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import {
  ClientSharedDeliverable,
  DeliverableFile,
  defaultSharedDeliverables,
  normalizeDeliverable,
} from "@/types/deliverables";

export type { ClientSharedDeliverable, DeliverableFile };

export interface DBUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface DropboxPageEditorProps {
  siteSettings: SiteSettingsMap;
  onSaveSettings: (settingsPayload: Record<string, string>) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const DropboxPageEditor: React.FC<DropboxPageEditorProps> = ({
  siteSettings,
  onSaveSettings,
  showToast,
}) => {
  // Navigation Tabs: Dropbox Cloud, Client Accounts & Credentials, Deliverable Sets
  const [activeTab, setActiveTab] = useState<"dropbox" | "clients" | "shared">("clients");

  // Client Deliverables State
  const [sharedDeliverables, setSharedDeliverables] = useState<ClientSharedDeliverable[]>(
    defaultSharedDeliverables.map(normalizeDeliverable)
  );
  const [editingItem, setEditingItem] = useState<ClientSharedDeliverable | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterClientEmail, setFilterClientEmail] = useState<string>("All");

  // Client Users (PostgreSQL DB) State
  const [usersList, setUsersList] = useState<DBUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [clientSearch, setClientSearch] = useState("");

  // Create Client Modal State
  const [showCreateClientModal, setShowCreateClientModal] = useState(false);
  const [clientFirstName, setClientFirstName] = useState("");
  const [clientLastName, setClientLastName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [creatingClient, setCreatingClient] = useState(false);

  // Reset Password Modal State
  const [userToResetPassword, setUserToResetPassword] = useState<DBUser | null>(null);
  const [newPasswordVal, setNewPasswordVal] = useState("");
  const [showResetPasswordText, setShowResetPasswordText] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);

  // Credentials Highlight Modal State (shown upon creation or copy)
  const [credentialsModal, setCredentialsModal] = useState<{
    clientName: string;
    email: string;
    password?: string;
    isNew: boolean;
  } | null>(null);

  // Load Deliverables from site settings
  useEffect(() => {
    if (siteSettings?.client_shared_media_json?.value) {
      try {
        const parsed = JSON.parse(siteSettings.client_shared_media_json.value);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSharedDeliverables(parsed.map(normalizeDeliverable));
        }
      } catch (e) {
        console.error("Failed to parse client_shared_media_json", e);
      }
    }
  }, [siteSettings]);

  // Load Users from Database
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res: any = await apiClient.get(ENDPOINTS.USERS.BASE, {
        params: { page_size: 100 },
      });
      if (res && res.items) {
        setUsersList(res.items);
      } else if (Array.isArray(res)) {
        setUsersList(res);
      }
    } catch (err: any) {
      console.warn("Could not fetch users list:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Secure Cryptographic Password Generator
  const generateStrongPassword = () => {
    const uppers = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const lowers = "abcdefghijkmnopqrstuvwxyz";
    const digits = "23456789";
    const symbols = "!@#$%&*";

    const getRandomChar = (charset: string) => {
      if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
        const arr = new Uint32Array(1);
        window.crypto.getRandomValues(arr);
        return charset[arr[0] % charset.length];
      }
      return charset[Math.floor(Math.random() * charset.length)];
    };

    let pwd = "Lir#";
    for (let i = 0; i < 3; i++) pwd += getRandomChar(uppers);
    for (let i = 0; i < 4; i++) pwd += getRandomChar(lowers);
    for (let i = 0; i < 3; i++) pwd += getRandomChar(digits);
    pwd += getRandomChar(symbols);
    return pwd;
  };

  const copyTextToClipboard = (text: string, successMsg: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => {
        fallbackCopyText(text, successMsg);
      });
      return;
    }
    fallbackCopyText(text, successMsg);
  };

  const fallbackCopyText = (text: string, successMsg: string) => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      showToast(successMsg);
    } catch {
      showToast("Ready to copy manually");
    }
  };

  // Helper to copy complete credentials message to clipboard
  const handleCopyCredentialsText = (name: string, email: string, password?: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const loginUrl = `${origin}/login`;

    const text = [
      `Hello ${name},`,
      ``,
      `Your private photo deliverables portal credentials for LIRISHA are ready:`,
      ``,
      `• Portal Sign-In URL: ${loginUrl}`,
      `• Email Address: ${email}`,
      password ? `• Secure Password: ${password}` : `• Password: (Use your assigned password)`,
      ``,
      `Once logged in, you can review retouched batches, inspect high-resolution photos, and download your deliverables.`,
    ].join("\n");

    copyTextToClipboard(text, `Credentials for ${email} copied to clipboard!`);
  };

  // Create Client Submit Handler
  const handleCreateClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = clientEmail.trim().toLowerCase();
    const cleanPassword = clientPassword.trim();
    const cleanFirst = clientFirstName.trim() || "Client";
    const cleanLast = clientLastName.trim() || "User";

    if (!cleanEmail || !cleanPassword) {
      showToast("Email address and password are required", "error");
      return;
    }

    if (cleanPassword.length < 8) {
      showToast("Password must be at least 8 characters long", "error");
      return;
    }

    setCreatingClient(true);
    try {
      await apiClient.post(ENDPOINTS.USERS.BASE, {
        email: cleanEmail,
        password: cleanPassword,
        first_name: cleanFirst,
        last_name: cleanLast,
        role: "user",
      });

      showToast(`Client account '${cleanEmail}' created successfully!`);

      // Refresh DB users
      await fetchUsers();

      // Close create form and show credentials summary modal
      setShowCreateClientModal(false);
      setCredentialsModal({
        clientName: `${cleanFirst} ${cleanLast}`,
        email: cleanEmail,
        password: cleanPassword,
        isNew: true,
      });

      // If we were currently editing or creating a deliverable set, preselect this new client
      if (editingItem) {
        setEditingItem({
          ...editingItem,
          clientEmail: cleanEmail,
        });
      }

      // Reset form states
      setClientFirstName("");
      setClientLastName("");
      setClientEmail("");
      setClientPassword("");
    } catch (err: any) {
      showToast(err.message || "Failed to create client user account", "error");
    } finally {
      setCreatingClient(false);
    }
  };

  // Reset Password Submit Handler
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userToResetPassword) return;

    const cleanPassword = newPasswordVal.trim();
    if (!cleanPassword || cleanPassword.length < 8) {
      showToast("New password must be at least 8 characters long", "error");
      return;
    }

    setResettingPassword(true);
    try {
      await apiClient.put(ENDPOINTS.USERS.BY_ID(userToResetPassword.id), {
        password: cleanPassword,
      });

      showToast(`Password updated for ${userToResetPassword.email}!`);
      const updatedUser = userToResetPassword;
      setUserToResetPassword(null);
      setNewPasswordVal("");

      // Open credentials card with the new password
      setCredentialsModal({
        clientName: `${updatedUser.first_name} ${updatedUser.last_name}`,
        email: updatedUser.email,
        password: cleanPassword,
        isNew: false,
      });
    } catch (err: any) {
      showToast(err.message || "Failed to update password", "error");
    } finally {
      setResettingPassword(false);
    }
  };

  // Delete Client Handler
  const handleDeleteClient = async (user: DBUser) => {
    if (user.role === "admin") {
      showToast("Administrator accounts cannot be deleted here.", "error");
      return;
    }

    if (!confirm(`Are you sure you want to permanently delete client account '${user.email}'?`)) {
      return;
    }

    try {
      await apiClient.delete(ENDPOINTS.USERS.BY_ID(user.id));
      showToast(`Client account '${user.email}' deleted.`);
      await fetchUsers();
    } catch (err: any) {
      showToast(err.message || "Failed to delete user", "error");
    }
  };

  // Deliverables Batch Management
  const handleCreateNew = (targetEmail?: string) => {
    const defaultEmail = targetEmail || (usersList.find((u) => u.role !== "admin")?.email || "user@example.com");

    const newItem: ClientSharedDeliverable = {
      id: `deliv-${Date.now()}`,
      clientEmail: defaultEmail,
      title: "New Client Project / Photo Set",
      category: "Real Estate",
      imageUrl: "/images/homepage/real-estate.webp",
      downloadUrl: "/images/homepage/real-estate.webp",
      fileSize: "2 Photos",
      resolution: "6000 x 4000 px",
      deliveredDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "Ready for Download",
      notes: "Post-production batch complete. High resolution set of photos ready for review and download.",
      files: [
        {
          id: `f-${Date.now()}-1`,
          name: "Photo 1 - Exterior Day-to-Dusk",
          imageUrl: "/images/homepage/real-estate.webp",
          downloadUrl: "/images/homepage/real-estate.webp",
          fileSize: "12.0 MB",
          resolution: "6000 x 4000 px",
        },
        {
          id: `f-${Date.now()}-2`,
          name: "Photo 2 - Living Room HDR Retouch",
          imageUrl:
            "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Lawn-Replacement/001-after-525x.webp",
          downloadUrl:
            "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Lawn-Replacement/001-after-525x.webp",
          fileSize: "12.0 MB",
          resolution: "6000 x 4000 px",
        },
      ],
    };
    setEditingItem(newItem);
  };

  const handleAddFileToBatch = () => {
    if (!editingItem) return;
    const newFile: DeliverableFile = {
      id: `f-${Date.now()}-${(editingItem.files || []).length + 1}`,
      name: `Photo ${(editingItem.files || []).length + 1}`,
      imageUrl: "/images/homepage/real-estate.webp",
      downloadUrl: "/images/homepage/real-estate.webp",
      fileSize: "10.0 MB",
      resolution: "6000 x 4000 px",
    };
    setEditingItem({
      ...editingItem,
      files: [...(editingItem.files || []), newFile],
    });
  };

  const handleUpdateFileInBatch = (index: number, updates: Partial<DeliverableFile>) => {
    if (!editingItem) return;
    const currentFiles = [...(editingItem.files || [])];
    if (currentFiles[index]) {
      currentFiles[index] = { ...currentFiles[index], ...updates };
      const mainImg = index === 0 && updates.imageUrl ? updates.imageUrl : editingItem.imageUrl;
      setEditingItem({
        ...editingItem,
        imageUrl: mainImg,
        downloadUrl: index === 0 && updates.downloadUrl ? updates.downloadUrl : editingItem.downloadUrl,
        files: currentFiles,
      });
    }
  };

  const handleRemoveFileFromBatch = (index: number) => {
    if (!editingItem) return;
    const currentFiles = [...(editingItem.files || [])];
    if (currentFiles.length <= 1) {
      showToast("A deliverable set must have at least 1 photo", "error");
      return;
    }
    currentFiles.splice(index, 1);
    setEditingItem({
      ...editingItem,
      imageUrl: currentFiles[0]?.imageUrl || editingItem.imageUrl,
      downloadUrl: currentFiles[0]?.downloadUrl || editingItem.downloadUrl,
      files: currentFiles,
    });
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.files || editingItem.files.length === 0) {
      showToast("Please add at least one photo file to this deliverable set", "error");
      return;
    }

    setSaving(true);
    try {
      const normalized = normalizeDeliverable(editingItem);
      normalized.fileSize = `${normalized.files.length} Photo${normalized.files.length > 1 ? "s" : ""}`;

      const isExisting = sharedDeliverables.some((d) => d.id === normalized.id);
      const updatedList = isExisting
        ? sharedDeliverables.map((d) => (d.id === normalized.id ? normalized : d))
        : [normalized, ...sharedDeliverables];

      setSharedDeliverables(updatedList);
      await onSaveSettings({
        client_shared_media_json: JSON.stringify(updatedList),
      });

      showToast(
        `Deliverable set '${normalized.title}' (${normalized.files.length} photos) saved & shared with ${normalized.clientEmail}!`
      );
      setEditingItem(null);
    } catch (err: any) {
      showToast(err.message || "Failed to save deliverable batch", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to remove this deliverable set?")) return;
    try {
      const updatedList = sharedDeliverables.filter((d) => d.id !== id);
      setSharedDeliverables(updatedList);
      await onSaveSettings({
        client_shared_media_json: JSON.stringify(updatedList),
      });
      showToast("Shared deliverable set removed from client portal");
    } catch (err: any) {
      showToast(err.message || "Failed to remove deliverable", "error");
    }
  };

  // Helper stats
  const registeredClients = usersList.filter((u) => u.role !== "admin");
  const filteredUsers = registeredClients.filter((u) => {
    const q = clientSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      u.email.toLowerCase().includes(q) ||
      u.first_name.toLowerCase().includes(q) ||
      u.last_name.toLowerCase().includes(q)
    );
  });

  const totalDeliveredPhotos = sharedDeliverables.reduce(
    (acc, curr) => acc + (curr.files?.length || 1),
    0
  );

  const filteredDeliverables = sharedDeliverables.filter((item) => {
    if (filterClientEmail !== "All") {
      return (item.clientEmail || "").trim().toLowerCase() === filterClientEmail.trim().toLowerCase();
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#071E4A] via-[#1265E8] to-[#00C8F8] text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-cloud"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">
                Dropbox &amp; Client Deliverables Studio
              </h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1265E8] font-bold whitespace-nowrap shrink-0">
                Client Accounts, Credentials &amp; Photo Sets
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Manage client user logins, generate portal credentials, upload files to Dropbox, and deliver private photo sets to clients.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          {activeTab === "clients" && (
            <button
              type="button"
              onClick={() => {
                setClientFirstName("");
                setClientLastName("");
                setClientEmail("");
                setClientPassword(generateStrongPassword());
                setShowCreateClientModal(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#1265E8] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all whitespace-nowrap shrink-0"
            >
              <i className="fa-solid fa-user-plus"></i>
              <span>Create New Client &amp; Credentials</span>
            </button>
          )}

          {activeTab === "shared" && (
            <button
              type="button"
              onClick={() => handleCreateNew()}
              className="px-5 py-2.5 rounded-xl bg-[#1265E8] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all whitespace-nowrap shrink-0"
            >
              <i className="fa-solid fa-folder-plus"></i>
              <span>Create Deliverable Batch (Set of Photos)</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 text-xs font-bold overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("clients")}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "clients"
              ? "bg-[#07152F] text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <i className="fa-solid fa-users"></i>
          <span>1. Client Accounts &amp; Credentials ({registeredClients.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("shared")}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "shared"
              ? "bg-[#07152F] text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <i className="fa-solid fa-images"></i>
          <span>2. Shared Photo Deliverables ({sharedDeliverables.length} Sets)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("dropbox")}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "dropbox"
              ? "bg-[#07152F] text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <i className="fa-solid fa-folder-tree"></i>
          <span>3. Dropbox Cloud Explorer &amp; Direct Uploader</span>
        </button>
      </div>

      {/* ========================================================================================= */}
      {/* TAB 1: CLIENT ACCOUNTS & CREDENTIALS                                                      */}
      {/* ========================================================================================= */}
      {activeTab === "clients" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          {/* Section Description & Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[11px] font-bold text-gray-500 uppercase">Registered Clients</span>
              <div className="text-2xl font-black text-gray-900 mt-1">{registeredClients.length}</div>
              <span className="text-[10px] text-gray-400">Accounts with portal access</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[11px] font-bold text-gray-500 uppercase">Deliverable Sets Assigned</span>
              <div className="text-2xl font-black text-[#1265E8] mt-1">{sharedDeliverables.length}</div>
              <span className="text-[10px] text-gray-400">Total project batches delivered</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[11px] font-bold text-gray-500 uppercase">Total High-Res Photos</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">{totalDeliveredPhotos}</div>
              <span className="text-[10px] text-gray-400">Shared across all client portals</span>
            </div>
          </div>

          {/* Search & Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <i className="fa-solid fa-magnifying-glass text-xs"></i>
              </span>
              <input
                type="text"
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                placeholder="Search clients by name or email..."
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#1265E8] transition-all text-gray-900"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={fetchUsers}
                className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center gap-1.5 transition-colors"
                title="Refresh user accounts list"
              >
                <i className={`fa-solid fa-arrows-rotate ${loadingUsers ? "fa-spin" : ""}`}></i>
                <span>Refresh</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setClientFirstName("");
                  setClientLastName("");
                  setClientEmail("");
                  setClientPassword(generateStrongPassword());
                  setShowCreateClientModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#1265E8] hover:bg-blue-700 text-white font-bold flex items-center gap-2 shadow-sm transition-all"
              >
                <i className="fa-solid fa-user-plus"></i>
                <span>Create Client</span>
              </button>
            </div>
          </div>

          {/* Clients List Table */}
          {loadingUsers ? (
            <div className="p-12 text-center text-gray-500 space-y-2">
              <i className="fa-solid fa-circle-notch fa-spin text-2xl text-[#1265E8]"></i>
              <p className="font-semibold">Loading registered clients from database...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1265E8] flex items-center justify-center mx-auto text-xl">
                <i className="fa-solid fa-user-group"></i>
              </div>
              <p className="text-gray-700 font-bold text-sm">No client accounts found</p>
              <p className="text-gray-500 text-xs max-w-md mx-auto">
                Create your first client account and generate credentials so they can securely log in to the Client Portal at <strong>/login</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setClientFirstName("");
                  setClientLastName("");
                  setClientEmail("");
                  setClientPassword(generateStrongPassword());
                  setShowCreateClientModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#1265E8] text-white font-bold inline-flex items-center gap-2"
              >
                <i className="fa-solid fa-user-plus"></i>
                <span>Create New Client</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Client Profile</th>
                    <th className="py-3 px-3">Login Email</th>
                    <th className="py-3 px-3 text-center">Assigned Sets</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-right">Actions &amp; Deliverables</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((u) => {
                    const clientBatches = sharedDeliverables.filter(
                      (d) => (d.clientEmail || "").trim().toLowerCase() === u.email.trim().toLowerCase()
                    );
                    const photoCount = clientBatches.reduce(
                      (acc, curr) => acc + (curr.files?.length || 1),
                      0
                    );

                    return (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition-colors group">
                        {/* Name & Avatar */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#071E4A] to-[#1265E8] text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm shrink-0">
                              {u.first_name?.[0] || u.email[0]}
                              {u.last_name?.[0] || ""}
                            </div>
                            <div>
                              <span className="font-bold text-gray-900 block">
                                {u.first_name} {u.last_name}
                              </span>
                              <span className="text-[10px] text-gray-400 font-mono">ID: #{u.id}</span>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-1.5 font-mono text-gray-800 text-[11px]">
                            <i className="fa-regular fa-envelope text-[#1265E8]"></i>
                            <span>{u.email}</span>
                          </div>
                        </td>

                        {/* Batches & Photos */}
                        <td className="py-3.5 px-3 text-center">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-[#1265E8] font-bold text-[11px] border border-blue-200">
                            <i className="fa-solid fa-photo-film text-[10px]"></i>
                            <span>
                              {clientBatches.length} {clientBatches.length === 1 ? "Set" : "Sets"} ({photoCount} Photos)
                            </span>
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-3 text-center">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              u.is_active
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {u.is_active ? "Active" : "Disabled"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-3 text-right">
                          <div className="inline-flex items-center gap-1.5 justify-end flex-wrap">
                            {/* Share Photos button */}
                            <button
                              type="button"
                              onClick={() => {
                                setActiveTab("shared");
                                handleCreateNew(u.email);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-[#1265E8] hover:bg-blue-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all"
                              title={`Deliver new photo set to ${u.email}`}
                            >
                              <i className="fa-solid fa-images text-[10px]"></i>
                              <span>Share Photos</span>
                            </button>

                            {/* Copy Credentials button */}
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyCredentialsText(
                                  `${u.first_name} ${u.last_name}`,
                                  u.email
                                )
                              }
                              className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[11px] flex items-center gap-1 transition-colors"
                              title="Copy login details to clipboard"
                            >
                              <i className="fa-regular fa-copy text-[10px]"></i>
                              <span>Copy Login</span>
                            </button>

                            {/* Reset Password button */}
                            <button
                              type="button"
                              onClick={() => {
                                setUserToResetPassword(u);
                                setNewPasswordVal(generateStrongPassword());
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-[11px] flex items-center gap-1 transition-colors border border-amber-200"
                              title="Reset client password"
                            >
                              <i className="fa-solid fa-key text-[10px]"></i>
                              <span>Reset Pwd</span>
                            </button>

                            {/* Delete User */}
                            <button
                              type="button"
                              onClick={() => handleDeleteClient(u)}
                              className="w-7 h-7 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 flex items-center justify-center transition-colors"
                              title="Delete client account"
                            >
                              <i className="fa-solid fa-trash-can text-xs"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================================= */}
      {/* TAB 2: CLIENT DELIVERABLE SETS (PHOTO SHARING)                                            */}
      {/* ========================================================================================= */}
      {activeTab === "shared" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <i className="fa-solid fa-layer-group text-[#1265E8]"></i>
                Client Deliverable Batches &amp; Sets of Photos ({sharedDeliverables.length})
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Each deliverable set contains multiple photos visible exclusively to that assigned client in their <strong>/portal</strong>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Filter by Client */}
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-gray-500 text-[11px]">Filter by Client:</span>
                <select
                  value={filterClientEmail}
                  onChange={(e) => setFilterClientEmail(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium text-xs focus:border-[#1265E8] outline-none shadow-sm"
                >
                  <option value="All">All Clients ({sharedDeliverables.length} Sets)</option>
                  {Array.from(
                    new Set(sharedDeliverables.map((d) => (d.clientEmail || "").trim().toLowerCase()).filter(Boolean))
                  ).map((email) => {
                    const count = sharedDeliverables.filter(
                      (d) => (d.clientEmail || "").trim().toLowerCase() === email
                    ).length;
                    return (
                      <option key={email} value={email}>
                        {email} ({count} {count === 1 ? "Set" : "Sets"})
                      </option>
                    );
                  })}
                </select>
              </div>

              <button
                type="button"
                onClick={() => handleCreateNew()}
                className="px-4 py-2 rounded-xl bg-blue-50 text-[#1265E8] hover:bg-blue-100 font-bold border border-blue-200 flex items-center gap-2 transition-colors shrink-0 shadow-sm"
              >
                <i className="fa-solid fa-plus"></i>
                <span>Create New Batch</span>
              </button>
            </div>
          </div>

          {filteredDeliverables.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <i className="fa-solid fa-images text-gray-400 text-3xl mb-2"></i>
              <p className="text-gray-600 font-bold">No deliverable sets found for this filter</p>
              <p className="text-gray-400 text-xs mt-1 mb-4">
                Click "Create New Batch" to deliver photos to a client.
              </p>
              {filterClientEmail !== "All" && (
                <button
                  type="button"
                  onClick={() => setFilterClientEmail("All")}
                  className="px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs"
                >
                  Clear Filter
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeliverables.map((item) => {
                const normalized = normalizeDeliverable(item);
                const fileCount = normalized.files.length;
                return (
                  <div
                    key={item.id}
                    className="bg-slate-50 hover:bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Main Cover Photo */}
                      <div className="h-44 bg-slate-900 overflow-hidden relative">
                        <img
                          src={normalized.imageUrl}
                          alt={normalized.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#07152F]/90 backdrop-blur-md text-[#00C8F8] text-[10px] font-bold rounded-lg shadow-sm border border-cyan-500/30">
                          {normalized.category}
                        </span>
                        <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold rounded-lg shadow-sm border border-white/20 flex items-center gap-1.5">
                          <i className="fa-solid fa-photo-film text-amber-400"></i>
                          <span>{fileCount} {fileCount === 1 ? "Photo" : "Photos"} in Batch</span>
                        </span>
                        <span
                          className={`absolute bottom-3 right-3 px-2 py-0.5 text-[10px] font-bold rounded shadow-sm ${
                            normalized.status === "Approved"
                              ? "bg-emerald-600 text-white"
                              : normalized.status === "Ready for Download"
                              ? "bg-blue-600 text-white"
                              : "bg-amber-500 text-slate-950"
                          }`}
                        >
                          {normalized.status}
                        </span>
                      </div>

                      {/* Mini Thumbnail Ribbon */}
                      {fileCount > 1 && (
                        <div className="bg-slate-900/90 px-3 py-2 flex items-center gap-2 overflow-x-auto border-b border-slate-800">
                          {normalized.files.map((f, idx) => (
                            <div
                              key={f.id || idx}
                              className="w-8 h-8 rounded-md overflow-hidden bg-slate-800 border border-slate-700 shrink-0"
                              title={f.name}
                            >
                              <img src={f.imageUrl} alt={f.name} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-gray-500">
                          <span className="font-semibold text-gray-700">
                            <i className="fa-regular fa-envelope mr-1 text-[#1265E8]"></i>
                            {normalized.clientEmail}
                          </span>
                          <span>{normalized.deliveredDate}</span>
                        </div>

                        <h4 className="font-bold text-gray-900 text-sm line-clamp-1">
                          {normalized.title}
                        </h4>

                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {normalized.notes || "Complete photo batch ready for client download and review."}
                        </p>

                        <div className="flex items-center gap-2 text-[11px] text-gray-400 font-mono pt-1">
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-semibold font-sans">
                            {fileCount} Files Set
                          </span>
                          <span>•</span>
                          <span>{normalized.resolution || "Full High-Res"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border-t border-gray-200 bg-white flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setEditingItem({ ...normalized })}
                        className="px-3 py-1.5 bg-[#1265E8] hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-sm transition-all inline-flex items-center gap-1.5"
                      >
                        <i className="fa-solid fa-pen-to-square text-[10px]"></i>
                        <span>Edit Batch ({fileCount} Files)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="w-7 h-7 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg text-xs transition-colors"
                        title="Delete deliverable batch"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================================= */}
      {/* TAB 3: DROPBOX CLOUD EXPLORER                                                             */}
      {/* ========================================================================================= */}
      {activeTab === "dropbox" && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-cloud-arrow-up text-base text-[#1265E8]"></i>
              <div>
                <span className="font-bold block">Dropbox Cloud Connection &amp; Live Uploader</span>
                <span className="text-[11px] text-gray-600">
                  Browse your connected Dropbox folders, upload master photography assets, generate share links, and organize client media.
                </span>
              </div>
            </div>
          </div>

          <DropboxExplorer
            initialPath=""
            title="Dropbox Media Explorer &amp; Direct Uploader"
            subtitle="Browse cloud folders, create new client directories, preview high-res RAW/edited photos, and upload deliverables."
          />
        </div>
      )}

      {/* ========================================================================================= */}
      {/* MODAL: CREATE NEW CLIENT USER                                                             */}
      {/* ========================================================================================= */}
      {showCreateClientModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 border border-gray-200 text-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1265E8] flex items-center justify-center text-lg">
                  <i className="fa-solid fa-user-plus"></i>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">Create Client Account</h3>
                  <p className="text-[11px] text-gray-500">Provide login credentials for Client Portal</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateClientModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleCreateClientSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={clientFirstName}
                    onChange={(e) => setClientFirstName(e.target.value)}
                    required
                    placeholder="e.g. Sarah"
                    className="w-full px-3 py-2 bg-slate-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#1265E8] outline-none text-gray-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={clientLastName}
                    onChange={(e) => setClientLastName(e.target.value)}
                    required
                    placeholder="e.g. Connor"
                    className="w-full px-3 py-2 bg-slate-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#1265E8] outline-none text-gray-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Client Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  required
                  placeholder="client@agency.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#1265E8] outline-none text-gray-900 font-mono text-[11px]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-gray-700">
                    Password (min 8 chars) <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setClientPassword(generateStrongPassword())}
                    className="text-[10px] font-bold text-[#1265E8] hover:underline flex items-center gap-1"
                  >
                    <i className="fa-solid fa-wand-magic-sparkles text-[9px]"></i>
                    <span>Generate Strong Password</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPasswordText ? "text" : "password"}
                    value={clientPassword}
                    onChange={(e) => setClientPassword(e.target.value)}
                    required
                    minLength={8}
                    placeholder="••••••••••••"
                    className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#1265E8] outline-none text-gray-900 font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <i className={`fa-solid ${showPasswordText ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-900 text-[11px] leading-relaxed">
                <i className="fa-solid fa-circle-info mr-1 text-[#1265E8]"></i>
                Once created, you will get a pre-formatted credentials card with a one-click <strong>Copy Credentials</strong> button to send to your client.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowCreateClientModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 font-bold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingClient}
                  className="px-5 py-2 rounded-xl bg-[#1265E8] hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-60"
                >
                  <i className={`fa-solid ${creatingClient ? "fa-spinner fa-spin" : "fa-user-check"}`}></i>
                  <span>{creatingClient ? "Creating Account..." : "Create Client Account"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* MODAL: RESET PASSWORD                                                                     */}
      {/* ========================================================================================= */}
      {userToResetPassword && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-gray-200 text-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                <i className="fa-solid fa-key text-amber-500"></i>
                Reset Client Password
              </h3>
              <button
                type="button"
                onClick={() => setUserToResetPassword(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <p className="text-gray-600">
              Set a new login password for client account{" "}
              <strong className="text-gray-900">{userToResetPassword.email}</strong>:
            </p>

            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-gray-700">New Password (min 8 chars)</label>
                  <button
                    type="button"
                    onClick={() => setNewPasswordVal(generateStrongPassword())}
                    className="text-[10px] font-bold text-[#1265E8] hover:underline"
                  >
                    Generate Strong
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showResetPasswordText ? "text" : "password"}
                    value={newPasswordVal}
                    onChange={(e) => setNewPasswordVal(e.target.value)}
                    required
                    minLength={8}
                    className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-gray-300 rounded-xl focus:bg-white focus:border-[#1265E8] outline-none text-gray-900 font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowResetPasswordText(!showResetPasswordText)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <i className={`fa-solid ${showResetPasswordText ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUserToResetPassword(null)}
                  className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 font-bold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resettingPassword}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <i className={`fa-solid ${resettingPassword ? "fa-spinner fa-spin" : "fa-check"}`}></i>
                  <span>{resettingPassword ? "Updating..." : "Update Password"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* MODAL: CREDENTIALS SUMMARY & COPY CARD                                                    */}
      {/* ========================================================================================= */}
      {credentialsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 border border-gray-200 text-xs animate-scaleUp">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mx-auto shadow-md">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3 className="text-lg font-black text-gray-900">
                {credentialsModal.isNew ? "Client Account & Credentials Created!" : "Password Updated Successfully!"}
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Share these credentials with the client so they can sign in to the Client Deliverables Portal.
              </p>
            </div>

            {/* Credential Card Display */}
            <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl space-y-3 font-mono border border-slate-800 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider font-sans">
                  Client Portal Credentials
                </span>
                <span className="text-[10px] text-slate-400">Secure Client Access</span>
              </div>

              <div className="space-y-2.5 pt-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-sans">Client:</span>
                  <span className="font-bold text-white font-sans">{credentialsModal.clientName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-sans">Login Email:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-300 font-semibold">{credentialsModal.email}</span>
                    <button
                      type="button"
                      onClick={() => copyTextToClipboard(credentialsModal.email, "Email copied!")}
                      className="text-slate-400 hover:text-white p-1 rounded transition-colors text-[10px]"
                      title="Copy Email"
                    >
                      <i className="fa-regular fa-copy"></i>
                    </button>
                  </div>
                </div>
                {credentialsModal.password && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-sans">Secure Password:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-300 font-bold bg-slate-800 px-2.5 py-1 rounded select-all border border-slate-700">
                        {credentialsModal.password}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyTextToClipboard(credentialsModal.password || "", "Password copied!")}
                        className="text-amber-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded transition-colors text-[10px] flex items-center gap-1 font-sans border border-slate-700"
                        title="Copy Password Only"
                      >
                        <i className="fa-regular fa-copy"></i>
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-sans">Sign-In URL:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-300 underline text-[11px]">
                      {typeof window !== "undefined" ? `${window.location.origin}/login` : "/login"}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyTextToClipboard(typeof window !== "undefined" ? `${window.location.origin}/login` : "/login", "URL copied!")}
                      className="text-slate-400 hover:text-white p-1 rounded transition-colors text-[10px]"
                      title="Copy Login URL"
                    >
                      <i className="fa-regular fa-copy"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() =>
                  handleCopyCredentialsText(
                    credentialsModal.clientName,
                    credentialsModal.email,
                    credentialsModal.password
                  )
                }
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#1265E8] to-[#00C8F8] hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <i className="fa-regular fa-copy"></i>
                <span>Copy Ready-to-Send Credentials to Clipboard</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const email = credentialsModal.email;
                    setCredentialsModal(null);
                    setActiveTab("shared");
                    handleCreateNew(email);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <i className="fa-solid fa-images text-[#1265E8]"></i>
                  <span>Deliver Photos to this Client Now</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCredentialsModal(null)}
                  className="py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* MODAL: CREATE / EDIT DELIVERABLE BATCH                                                    */}
      {/* ========================================================================================= */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 border border-gray-200 text-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1265E8] flex items-center justify-center text-lg">
                  <i className="fa-solid fa-layer-group"></i>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">
                    {sharedDeliverables.some((d) => d.id === editingItem.id)
                      ? "Edit Deliverable Batch (Set of Photos)"
                      : "Create New Deliverable Batch"}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Add multiple photos to this order so the client can browse, inspect, and download the entire set in their portal.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-6">
              {/* Batch Metadata */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <i className="fa-solid fa-info-circle text-[#1265E8]"></i>
                  1. Project &amp; Client Assignment
                </h4>

                <div>
                  <label className="block font-bold text-gray-800 mb-1">
                    Project / Order Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white text-gray-900 font-bold border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                    placeholder="e.g. Palm Villa - Twilight & Sky Replacement Suite"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Select Registered Client Dropdown */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-gray-800">
                        Assigned Client <span className="text-red-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setClientFirstName("");
                          setClientLastName("");
                          setClientEmail("");
                          setClientPassword(generateStrongPassword());
                          setShowCreateClientModal(true);
                        }}
                        className="text-[10px] font-bold text-[#1265E8] hover:underline"
                      >
                        + New Client
                      </button>
                    </div>

                    <select
                      value={editingItem.clientEmail}
                      onChange={(e) => setEditingItem({ ...editingItem, clientEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm text-xs"
                      required
                    >
                      <option value="">-- Choose Registered Client --</option>
                      {registeredClients.map((u) => (
                        <option key={u.id} value={u.email}>
                          {u.first_name} {u.last_name} ({u.email})
                        </option>
                      ))}
                      {/* Allow any email if not in list */}
                      {editingItem.clientEmail &&
                        !registeredClients.some((u) => u.email === editingItem.clientEmail) && (
                          <option value={editingItem.clientEmail}>
                            Custom: {editingItem.clientEmail}
                          </option>
                        )}
                    </select>

                    <input
                      type="email"
                      value={editingItem.clientEmail}
                      onChange={(e) => setEditingItem({ ...editingItem, clientEmail: e.target.value })}
                      placeholder="Or enter client email manually"
                      className="w-full mt-1.5 px-2.5 py-1 text-[11px] bg-white border border-gray-200 rounded-lg text-gray-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-800 mb-1">Category</label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-3 py-2 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                    >
                      <option value="Real Estate">Real Estate</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="Portrait">Portrait</option>
                      <option value="Clipping">Clipping &amp; Vector</option>
                      <option value="General">General Deliverable</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-800 mb-1">Status</label>
                    <select
                      value={editingItem.status}
                      onChange={(e: any) => setEditingItem({ ...editingItem, status: e.target.value })}
                      className="w-full px-3 py-2 bg-white text-gray-900 font-bold border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                    >
                      <option value="Ready for Download">Ready for Download</option>
                      <option value="Approved">Approved</option>
                      <option value="In Review">In Review</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-800 mb-1">Delivery Notes / Brief</label>
                  <textarea
                    rows={2}
                    value={editingItem.notes || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, notes: e.target.value })}
                    className="w-full px-3 py-2 bg-white text-gray-900 font-medium border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm leading-relaxed"
                    placeholder="Notes for client regarding retouches, color grading, high-res download links..."
                  />
                </div>
              </div>

              {/* Set of Files / Multiple Photos */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                      <i className="fa-solid fa-photo-film text-[#1265E8]"></i>
                      2. Set of Photos in this Deliverable ({editingItem.files?.length || 0})
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      Each photo in this set can be inspected, compared, and downloaded individually or together.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddFileToBatch}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all shrink-0"
                  >
                    <i className="fa-solid fa-plus text-[10px]"></i>
                    <span>Add Photo to Set</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(editingItem.files || []).map((file, idx) => (
                    <div
                      key={file.id || idx}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row items-start gap-4"
                    >
                      {/* Photo Thumbnail */}
                      <div className="w-20 h-20 rounded-xl bg-slate-900 overflow-hidden relative shrink-0 border border-slate-300 self-center md:self-start">
                        <img
                          src={file.imageUrl}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-[9px] text-white font-mono rounded">
                          #{idx + 1}
                        </span>
                      </div>

                      {/* File details */}
                      <div className="flex-1 w-full space-y-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                          <input
                            type="text"
                            value={file.name}
                            onChange={(e) => handleUpdateFileInBatch(idx, { name: e.target.value })}
                            className="w-full sm:w-2/3 px-3 py-1.5 bg-white text-gray-900 font-bold border border-gray-300 rounded-lg text-xs focus:border-[#1265E8] outline-none"
                            placeholder={`Photo ${idx + 1} Title`}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveFileFromBatch(idx)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded text-xs transition-colors self-end sm:self-auto flex items-center gap-1 shrink-0"
                            title="Remove photo from set"
                          >
                            <i className="fa-solid fa-trash-can text-[10px]"></i>
                            <span>Remove</span>
                          </button>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[11px] font-bold text-gray-700">
                              Image URL / Dropbox Download Link
                            </label>
                            <ImageUploadButton
                              folder="deliverables"
                              label="Upload File"
                              currentValue={file.imageUrl}
                              onUploadSuccess={(url) => {
                                handleUpdateFileInBatch(idx, { imageUrl: url, downloadUrl: url });
                                showToast(`Photo #${idx + 1} uploaded!`);
                              }}
                            />
                          </div>
                          <input
                            type="text"
                            value={file.imageUrl}
                            onChange={(e) =>
                              handleUpdateFileInBatch(idx, { imageUrl: e.target.value, downloadUrl: e.target.value })
                            }
                            className="w-full px-3 py-1.5 bg-white text-gray-900 font-mono text-[11px] border border-gray-300 rounded-lg focus:border-[#1265E8] outline-none"
                            placeholder="Image URL or Dropbox download link"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-bold text-gray-600 block mb-0.5">File Size</label>
                            <input
                              type="text"
                              value={file.fileSize || ""}
                              onChange={(e) => handleUpdateFileInBatch(idx, { fileSize: e.target.value })}
                              className="w-full px-2.5 py-1 bg-white text-gray-900 text-xs border border-gray-300 rounded-lg outline-none"
                              placeholder="e.g. 10.4 MB"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-600 block mb-0.5">Resolution</label>
                            <input
                              type="text"
                              value={file.resolution || ""}
                              onChange={(e) => handleUpdateFileInBatch(idx, { resolution: e.target.value })}
                              className="w-full px-2.5 py-1 bg-white text-gray-900 text-xs border border-gray-300 rounded-lg outline-none"
                              placeholder="e.g. 6000 x 4000 px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 font-bold text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#1265E8] to-[#00C8F8] hover:from-blue-700 hover:to-cyan-600 text-white font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                >
                  <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-check"}`}></i>
                  <span>{saving ? "Saving Batch..." : "Save Deliverable Set"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
