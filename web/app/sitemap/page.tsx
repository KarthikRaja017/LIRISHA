import React from "react";
import type { Metadata } from "next";
import { FeaturePageContent } from "@/components/smartphoto/FeaturePageContent";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "sitemap",
    "Site Directory & Sitemap | LIRISHA",
    "Quick navigation index across all services, subservices, case studies, resources, and company pages."
  );
}

export default function SitemapPage() {
  return <FeaturePageContent pageType="sitemap" />;
}
