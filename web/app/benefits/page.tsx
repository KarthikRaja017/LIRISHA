import React from "react";
import type { Metadata } from "next";
import { FeaturePageContent } from "@/components/smartphoto/FeaturePageContent";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "benefits",
    "Benefits of Outsourcing Photo Editing | LIRISHA",
    "Discover why top commercial studios, realtors, and brands outsource photo retouching to LIRISHA."
  );
}

export default function BenefitsPage() {
  return <FeaturePageContent pageType="benefits" />;
}
