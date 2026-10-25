import React from "react";
import type { Metadata } from "next";
import { FeaturePageContent } from "@/components/smartphoto/FeaturePageContent";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "accessories",
    "Recommended Photography Studio Accessories | LIRISHA",
    "Curated studio gear recommendations for photographers looking to streamline their capture-to-edit post-production workflows."
  );
}

export default function AccessoriesPage() {
  return <FeaturePageContent pageType="accessories" />;
}
