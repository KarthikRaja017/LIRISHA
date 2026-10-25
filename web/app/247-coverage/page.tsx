import React from "react";
import type { Metadata } from "next";
import { FeaturePageContent } from "@/components/smartphoto/FeaturePageContent";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "247-coverage",
    "24/7 Global Time-Zone Coverage | LIRISHA",
    "Round-the-clock global editing operations enabling overnight deliveries across North America and Europe."
  );
}

export default function CoveragePage() {
  return <FeaturePageContent pageType="247-coverage" />;
}
