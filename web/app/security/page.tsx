import React from "react";
import type { Metadata } from "next";
import { FeaturePageContent } from "@/components/smartphoto/FeaturePageContent";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "security",
    "Data Security & NDAs | SmartPHOTOeditors",
    "Enterprise-grade security, bilateral non-disclosure agreements, and 256-bit encrypted file transfers for client media."
  );
}

export default function SecurityPage() {
  return <FeaturePageContent pageType="security" />;
}
