"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const explicitRedirect = searchParams.get("redirect");

  const { login } = useAuth();

  // Sign In Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const loggedInUser = await login({
        email: cleanEmail,
        password: cleanPassword,
      });

      // Intelligent auto-routing:
      // If explicit redirect was requested, route there.
      // Otherwise, route admins to /admin and clients to /portal automatically.
      if (explicitRedirect) {
        router.push(explicitRedirect);
      } else if (loggedInUser?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/portal");
      }
    } catch (err: unknown) {
      const errMsg =
        err instanceof Error
          ? err.message
          : "Invalid email or password. Please verify your credentials.";
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 sm:p-10 border border-slate-200 rounded-3xl shadow-2xl space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <Link href="/" className="inline-block group">
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 p-2.5 flex items-center justify-center mx-auto shadow-md group-hover:scale-105 transition-transform">
            <img
              src="/images/lirisha-camera-logo.png"
              alt="LIRISHA"
              className="w-full h-full object-contain filter drop-shadow-sm"
            />
          </div>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-heading">
            Sign In
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sign in to access your account, client deliverables, or dashboard.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-2.5">
          <i className="fa-solid fa-circle-exclamation mt-0.5 text-red-500 shrink-0"></i>
          <div>
            <span className="font-bold block">Sign In Failed</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <i className="fa-solid fa-envelope text-xs"></i>
            </span>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3.5 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Password
            </label>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <i className="fa-solid fa-lock text-xs"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full pl-10 pr-10 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-mono"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              title={showPassword ? "Hide password" : "Show password"}
            >
              <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} text-xs`}></i>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white shadow-md bg-[#1265E8] hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
        >
          {isLoading ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin"></i>
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </>
          )}
        </button>
      </form>

      {/* Secure Access Notice */}
      <div className="p-3 text-xs bg-slate-50 border border-slate-100 rounded-xl text-slate-500 text-center flex items-center justify-center gap-2">
        <i className="fa-solid fa-shield-halved text-slate-400"></i>
        <span>Secure sign-in for clients and administrators.</span>
      </div>

      {/* Footer Navigation */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <Link
          href="/"
          className="hover:text-blue-600 transition-colors inline-flex items-center gap-1.5"
        >
          <i className="fa-solid fa-arrow-left text-[10px]"></i>
          <span>Back to Homepage</span>
        </Link>
        <Link
          href="/sample-images"
          className="hover:text-blue-600 transition-colors inline-flex items-center gap-1.5"
        >
          <span>Sample Gallery</span>
          <i className="fa-solid fa-arrow-right text-[10px]"></i>
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 bg-slate-50 text-slate-900">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto text-white">
              <i className="fa-solid fa-circle-notch fa-spin"></i>
            </div>
            <p className="text-sm font-semibold text-slate-600">Loading sign-in...</p>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
