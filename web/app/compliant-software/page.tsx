import React from "react";
import type { Metadata } from "next";
import { FeaturePageContent } from "@/components/smartphoto/FeaturePageContent";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "compliant-software",
    "100% Compliant Software & Licensing | LIRISHA",
    "We operate exclusively with genuine, certified Adobe Creative Cloud enterprise software licenses."
  );
}

export default function CompliantSoftwarePage() {
  return <FeaturePageContent pageType="compliant-software" />;
}
