import React from "react";
import type { Metadata } from "next";
import { FeaturePageContent } from "@/components/smartphoto/FeaturePageContent";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "adobe-specialized-artists",
    "Adobe Certified Specialized Artists | LIRISHA",
    "Our post-production team consists of full-time retouching professionals trained in advanced Photoshop and Lightroom workflows."
  );
}

export default function AdobeArtistsPage() {
  return <FeaturePageContent pageType="adobe-specialized-artists" />;
}
