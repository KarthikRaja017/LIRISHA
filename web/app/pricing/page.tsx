import React from "react";
import type { Metadata } from "next";
import { FeaturePageContent } from "@/components/smartphoto/FeaturePageContent";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "pricing",
    "Pricing & Volume Rates | SmartPHOTOeditors",
    "Transparent, cost-effective photo editing pricing and volume discount tiers for studios and e-commerce brands."
  );
}

export default function PricingPage() {
  return <FeaturePageContent pageType="pricing" />;
}
