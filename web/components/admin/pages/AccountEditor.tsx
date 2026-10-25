"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

interface AccountEditorProps {
  user: any;
  onUpdateUser: (data: any) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

interface DBUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export const AccountEditor: React.FC<AccountEditorProps> = ({
  user,
  onUpdateUser,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<"admin-profile" | "users-list">("admin-profile");

  // Admin Profile & Password States
  const [adminEmail, setAdminEmail] = useState("");
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");
  const [adminNewPassword, setAdminNewPassword] = useState("");
  const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
  const [adminUpdating, setAdminUpdating] = useState(false);

  // PostgreSQL Users List & Create States
  const [usersList, setUsersList] = useState<DBUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newRole, setNewRole] = useState("user");
  const [creatingUser, setCreatingUser] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showNewPasswordText, setShowNewPasswordText] = useState(false);
  const [credentialsModal, setCredentialsModal] = useState<{
    clientName: string;
    email: string;
    password?: string;
  } | null>(null);

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

  const handleCopyCredentialsText = (name: string, email: string, password?: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const loginUrl = `${origin}/login`;

    const text = [
      `Hello ${name},`,
      ``,
      `Your account credentials for LIRISHA are ready:`,
      ``,
      `• Sign-In URL: ${loginUrl}`,
      `• Email Address: ${email}`,
      password ? `• Secure Password: ${password}` : `• Password: (Use your assigned password)`,
      ``,
      `Sign in with your email and password to access your deliverables or account dashboard.`,
    ].join("\n");

    copyTextToClipboard(text, `Credentials for ${email} copied to clipboard!`);
  };

  useEffect(() => {
    if (user) {
      setAdminEmail(user.email || "");
      setAdminFirstName(user.first_name || "");
      setAdminLastName(user.last_name || "");
    }
  }, [user]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res: any = await apiClient.get(ENDPOINTS.USERS.BASE);
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
    if (activeTab === "users-list") {
      fetchUsers();
    }
  }, [activeTab]);

  const handleSaveAdminProfile = async (e: React.FormEvent) => {
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
      await onUpdateUser({
        email: adminEmail.trim().toLowerCase(),
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

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = newEmail.trim().toLowerCase();
    const cleanPassword = newPassword.trim();

    if (!cleanEmail || !cleanPassword) {
      showToast("Email and password are required", "error");
      return;
    }

    if (cleanPassword.length < 8) {
      showToast("Password must be at least 8 characters long", "error");
      return;
    }

    setCreatingUser(true);
    try {
      await apiClient.post(ENDPOINTS.USERS.BASE, {
        email: cleanEmail,
        password: cleanPassword,
        first_name: newFirstName.trim() || "Client",
        last_name: newLastName.trim() || "User",
        role: newRole,
      });

      showToast(`User '${cleanEmail}' created successfully!`);
      setShowCreateModal(false);
      setCredentialsModal({
        clientName: `${newFirstName.trim() || "Client"} ${newLastName.trim() || "User"}`,
        email: cleanEmail,
        password: cleanPassword,
      });
      setNewEmail("");
      setNewPassword("");
      setNewFirstName("");
      setNewLastName("");
      await fetchUsers();
    } catch (err: any) {
      showToast(err.message || "Failed to create user", "error");
    } finally {
      setCreatingUser(false);
    }
  };

  const handleDeleteUser = async (userId: number, email: string) => {
    if (user && user.id === userId) {
      showToast("You cannot delete your own active administrator account", "error");
      return;
    }

    if (!confirm(`Are you sure you want to permanently delete user account '${email}'?`)) {
      return;
    }

    try {
      await apiClient.delete(ENDPOINTS.USERS.BY_ID(userId));
      showToast(`User account '${email}' deleted successfully`);
      await fetchUsers();
    } catch (err: any) {
      showToast(err.message || "Failed to delete user", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-black text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-users-gear"></i>
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">
              Security, Credentials &amp; User Accounts
            </h2>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Manage your administrator sign-in, change passwords, and create or inspect registered client accounts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "users-list" && (
            <button
              type="button"
              onClick={() => {
                setNewFirstName("");
                setNewLastName("");
                setNewEmail("");
                setNewPassword(generateStrongPassword());
                setShowCreateModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all shrink-0"
            >
              <i className="fa-solid fa-user-plus text-xs"></i>
              <span>Create New User</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab("admin-profile")}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === "admin-profile"
              ? "bg-[#07152F] text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <i className="fa-solid fa-user-shield"></i>
          <span>1. Administrator Credentials</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("users-list")}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === "users-list"
              ? "bg-[#07152F] text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <i className="fa-solid fa-address-book"></i>
          <span>2. Client &amp; User Management ({usersList.length || 2})</span>
        </button>
      </div>

      {/* Tab 1: Admin Profile */}
      {activeTab === "admin-profile" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl">
          <form onSubmit={handleSaveAdminProfile} className="space-y-6 text-xs">
            <div className="space-y-4">
              <h3 className="font-black text-slate-900 text-sm border-b border-slate-200 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xs">1</span>
                Administrator Profile
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-envelope text-[#ff5b0a]"></i> Admin Email Address (Used for Login)
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-bold text-slate-900 text-sm focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 shadow-sm transition-all"
                  placeholder="admin@lirisha.com"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-user text-[#ff5b0a]"></i> First Name
                  </label>
                  <input
                    type="text"
                    value={adminFirstName}
                    onChange={(e) => setAdminFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-bold text-slate-900 text-sm focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 shadow-sm transition-all"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-user text-[#ff5b0a]"></i> Last Name
                  </label>
                  <input
                    type="text"
                    value={adminLastName}
                    onChange={(e) => setAdminLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-bold text-slate-900 text-sm focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 shadow-sm transition-all"
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-200 pt-6">
              <h3 className="font-black text-slate-900 text-sm border-b border-slate-200 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-xs">2</span>
                Change Admin Password
              </h3>
              <p className="text-slate-500 text-xs font-medium">
                Leave blank if you do not want to alter your current password.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-key text-[#ff5b0a]"></i> New Password
                  </label>
                  <input
                    type="password"
                    value={adminNewPassword}
                    onChange={(e) => setAdminNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-bold text-slate-900 text-sm focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 shadow-sm transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-check-double text-[#ff5b0a]"></i> Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={adminConfirmPassword}
                    onChange={(e) => setAdminConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-bold text-slate-900 text-sm focus:outline-none focus:border-[#ff5b0a] focus:ring-2 focus:ring-[#ff5b0a]/20 shadow-sm transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                disabled={adminUpdating}
                className="px-6 py-3 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50 whitespace-nowrap shrink-0"
              >
                <i className={`fa-solid ${adminUpdating ? "fa-spinner fa-spin" : "fa-shield-halved"}`}></i>
                <span>{adminUpdating ? "Updating Account..." : "Save Admin Credentials"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: PostgreSQL Users Management */}
      {activeTab === "users-list" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <i className="fa-solid fa-users text-[#1265E8]"></i>
                Registered Accounts in PostgreSQL
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Clients created here can sign in at <strong>/login</strong> and access photo deliverable batches assigned to their email address.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setNewFirstName("");
                setNewLastName("");
                setNewEmail("");
                setNewPassword(generateStrongPassword());
                setShowCreateModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#1265E8] hover:bg-blue-700 text-white font-bold flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto shrink-0"
            >
              <i className="fa-solid fa-user-plus text-xs"></i>
              <span>Create User Account</span>
            </button>
          </div>

          {loadingUsers ? (
            <div className="py-12 text-center text-gray-500 space-y-2">
              <i className="fa-solid fa-spinner fa-spin text-2xl text-[#1265E8]"></i>
              <p className="font-semibold text-xs">Loading users from PostgreSQL...</p>
            </div>
          ) : usersList.length === 0 ? (
            <div className="py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <i className="fa-solid fa-user-group text-3xl text-gray-400 mb-2"></i>
              <p className="font-bold text-gray-700">No registered users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-slate-50 text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Created Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-gray-500">#{u.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900 text-xs">
                          {u.first_name} {u.last_name}
                        </div>
                        <div className="text-[11px] text-gray-500 font-mono flex items-center gap-1.5 mt-0.5">
                          <i className="fa-regular fa-envelope text-[10px] text-blue-500"></i>
                          <span>{u.email}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            u.role === "admin"
                              ? "bg-purple-100 text-purple-700 border border-purple-200"
                              : "bg-blue-100 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>Active</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-500 text-[11px] font-mono">
                        {u.created_at ? new Date(u.created_at).toLocaleDateString() : "Active"}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {u.role !== "admin" ? (
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(u.id, u.email)}
                            className="w-8 h-8 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors inline-flex items-center justify-center"
                            title="Delete user account"
                          >
                            <i className="fa-solid fa-trash-can text-xs"></i>
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium">Protected Admin</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Create New User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-lg">
                  <i className="fa-solid fa-user-plus"></i>
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">Create New Account</h3>
                  <p className="text-[11px] text-gray-500">Add a client or administrator account in PostgreSQL.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-800 mb-1">First Name</label>
                  <input
                    type="text"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    placeholder="Jane"
                    className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-xl outline-none focus:border-[#ff5b0a]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-800 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    placeholder="Smith"
                    className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-xl outline-none focus:border-[#ff5b0a]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-xl outline-none focus:border-[#ff5b0a]"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-gray-800">
                    Password <span className="text-red-500">*</span> <span className="text-gray-400 font-normal">(Min 8 chars)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setNewPassword(generateStrongPassword())}
                    className="text-[10px] font-bold text-[#1265E8] hover:underline flex items-center gap-1"
                  >
                    <i className="fa-solid fa-wand-magic-sparkles text-[9px]"></i>
                    <span>Generate Strong Password</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showNewPasswordText ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    minLength={8}
                    className="w-full pl-3 pr-10 py-2 bg-white text-gray-900 border border-gray-300 rounded-xl outline-none focus:border-[#ff5b0a] font-mono text-xs"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPasswordText(!showNewPasswordText)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <i className={`fa-solid ${showNewPasswordText ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-1">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-900 font-bold border border-gray-300 rounded-xl outline-none focus:border-[#ff5b0a]"
                >
                  <option value="user">Client (Portal Deliverables Access)</option>
                  <option value="admin">Administrator (Full CMS Access)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingUser}
                  className="px-5 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white font-bold shadow-md shadow-orange-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <i className={`fa-solid ${creatingUser ? "fa-spinner fa-spin" : "fa-check"}`}></i>
                  <span>{creatingUser ? "Creating..." : "Create Account"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Credentials Summary Modal */}
      {credentialsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 border border-gray-200 text-xs animate-scaleUp">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mx-auto shadow-md">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3 className="text-lg font-black text-gray-900">
                Account &amp; Credentials Created!
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Share these credentials with the user so they can sign in to the platform.
              </p>
            </div>

            <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl space-y-3 font-mono border border-slate-800 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider font-sans">
                  Account Credentials
                </span>
                <span className="text-[10px] text-slate-400 font-sans">Ready to Copy</span>
              </div>

              <div className="space-y-2.5 pt-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-sans">User:</span>
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

              <button
                type="button"
                onClick={() => setCredentialsModal(null)}
                className="w-full py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
