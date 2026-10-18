"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/admin";
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Password123!");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login({ email, password });
      router.push(redirectPath);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to sign in. Please verify your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillAdmin = () => {
    setEmail("admin@example.com");
    setPassword("Password123!");
  };

  return (
    <div className="w-full max-w-md bg-white p-8 border border-gray-200 rounded-3xl shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700/60 p-2 flex items-center justify-center mx-auto shadow-md">
          <img src="/images/lirisha-camera-logo.png" alt="LIRISHA" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-gray-900 font-heading">Admin Sign In</h2>
        <p className="text-xs text-gray-500">Access and edit LIRISHA Admin Mode</p>
      </div>

      {/* Quick Fill Credentials Banner */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs text-blue-900">
        <div>
          <span className="font-bold block">Default Admin Login:</span>
          <span className="font-mono text-[11px] text-gray-600">admin@example.com</span>
        </div>
        <button
          type="button"
          onClick={handleFillAdmin}
          className="px-2.5 py-1 bg-gradient-to-r from-[#00C8F8] to-[#1265E8] hover:from-[#1265E8] hover:to-[#713CFF] text-white rounded-lg font-bold text-[11px] transition-all shadow-sm"
        >
          Auto-fill
        </button>
      </div>

      {error && (
        <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
          <i className="fa-solid fa-circle-exclamation"></i>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address / Username"
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button variant="primary" type="submit" className="w-full !rounded-xl !bg-gradient-to-r from-[#00C8F8] via-[#1265E8] to-[#713CFF] hover:opacity-95 text-white shadow-lg shadow-blue-500/25 !py-3 font-bold" isLoading={isLoading}>
          Sign In to Admin
        </Button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <Suspense fallback={<div className="text-sm text-gray-400">Loading sign in...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
