import React from "react";
import type { Metadata } from "next";
import { FeaturePageContent } from "@/components/smartphoto/FeaturePageContent";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "privacy-policy",
    "Privacy Policy | SmartPHOTOeditors",
    "Learn how SmartPHOTOeditors protects client information, copyright, and visual data assets."
  );
}

export default function PrivacyPolicyPage() {
  return <FeaturePageContent pageType="privacy-policy" />;
}
