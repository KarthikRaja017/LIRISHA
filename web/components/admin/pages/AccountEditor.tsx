"use client";

import React, { useState, useEffect } from "react";

interface AccountEditorProps {
  user: any;
  onUpdateUser: (data: any) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const AccountEditor: React.FC<AccountEditorProps> = ({
  user,
  onUpdateUser,
  showToast,
}) => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");
  const [adminNewPassword, setAdminNewPassword] = useState("");
  const [adminConfirmPassword, setAdminConfirmPassword] = useState("");
  const [adminUpdating, setAdminUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setAdminEmail(user.email || "");
      setAdminFirstName(user.first_name || "");
      setAdminLastName(user.last_name || "");
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-black text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
          <i className="fa-solid fa-user-shield"></i>
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">Administrator Security & Credentials</h2>
          <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
            Manage your sign-in email, personal name, and change admin password in PostgreSQL.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl">
        <form onSubmit={handleSave} className="space-y-6 text-xs">
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
                placeholder="admin@example.com"
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
    </div>
  );
};
