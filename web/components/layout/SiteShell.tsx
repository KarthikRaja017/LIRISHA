'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SiteNavbar } from '@/components/smartphoto/SiteNavbar';
import { SiteFooter } from '@/components/smartphoto/SiteFooter';
import { CustomCursor } from '@/components/smartphoto/CustomCursor';
import { useSettings } from '@/context/SettingsContext';
import { BrandLoader } from '@/components/ui/BrandLoader';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const { loading: settingsLoading } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      document.documentElement.classList.add('admin-mode-active');
      document.body.classList.add('admin-mode-active');
    } else {
      document.documentElement.classList.remove('admin-mode-active');
      document.body.classList.remove('admin-mode-active');
    }
    return () => {
      document.documentElement.classList.remove('admin-mode-active');
      document.body.classList.remove('admin-mode-active');
    };
  }, [isAdmin]);

  if (isAdmin) {
    return (
      <div
        key="admin-shell"
        className="h-screen h-[100dvh] max-h-screen w-screen max-w-full overflow-hidden bg-[#0f172a] text-slate-100 flex flex-col">
        {children}
      </div>
    );
  }

  // Client Login and Client Portal: No public header or footer, full light theme shell
  const isAuthPage = pathname === '/login' || pathname.startsWith('/login');
  const isPortal = pathname.startsWith('/portal');

  if (isAuthPage || isPortal) {
    return (
      <div
        key={isAuthPage ? 'auth-shell' : 'portal-shell'}
        className="min-h-screen min-h-[100dvh] w-full bg-slate-50 text-slate-900 flex flex-col font-sans">
        {children}
      </div>
    );
  }

  // Show camera favicon loader before backend data / settings arrive
  if (!mounted || settingsLoading) {
    return (
      <BrandLoader
        fullScreen
        size="lg"
        message="Loading LIRISHA..."
        // subMessage="Connecting to database & live assets"
      />
    );
  }

  return (
    <div
      key="public-shell"
      className="relative min-h-screen flex flex-col bg-white">
      <CustomCursor />
      <SiteNavbar />
      <main className="main-section flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
