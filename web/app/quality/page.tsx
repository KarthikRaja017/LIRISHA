import React from "react";
import type { Metadata } from "next";
import { FeaturePageContent } from "@/components/smartphoto/FeaturePageContent";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "quality",
    "Quality Assurance Commitment | SmartPHOTOeditors",
    "Two-tier quality review process and zero-error commitment for professional photo editing and retouching."
  );
}

export default function QualityPage() {
  return <FeaturePageContent pageType="quality" />;
}
