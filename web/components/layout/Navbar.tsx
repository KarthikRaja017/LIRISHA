"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-slate-900 text-white shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold tracking-tight text-blue-400">
              ProjectTemplate
            </Link>
            <div className="hidden md:flex gap-4 text-sm font-medium">
              <Link href="/" className="hover:text-blue-300 transition-colors">
                Users Example
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-300">
                  {user.first_name} {user.last_name}
                </span>
                <Button variant="outline" size="sm" onClick={logout} className="text-white border-slate-700 hover:bg-slate-800">
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
