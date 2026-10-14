"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SiteNavbar } from "@/components/smartphoto/SiteNavbar";
import { SiteFooter } from "@/components/smartphoto/SiteFooter";
import { CustomCursor } from "@/components/smartphoto/CustomCursor";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <div key="admin-shell" className="min-h-screen w-full bg-[#0f172a] text-slate-100">{children}</div>;
  }

  return (
    <div key="public-shell" className="relative min-h-screen flex flex-col bg-white">
      <CustomCursor />
      <SiteNavbar />
      <main className="main-section flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
