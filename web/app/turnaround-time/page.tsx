import React from "react";
import type { Metadata } from "next";
import { FeaturePageContent } from "@/components/smartphoto/FeaturePageContent";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "turnaround-time",
    "Turnaround Time Guarantee | SmartPHOTOeditors",
    "Fast 12-24 hour turnaround times for bulk photo editing projects with dedicated shift teams around the clock."
  );
}

export default function TurnaroundTimePage() {
  return <FeaturePageContent pageType="turnaround-time" />;
}
