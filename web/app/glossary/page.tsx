import React from "react";
import type { Metadata } from "next";
import { FeaturePageContent } from "@/components/smartphoto/FeaturePageContent";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "glossary",
    "Photo Editing Glossary & Terminology | LIRISHA",
    "Comprehensive glossary of image editing terminology including clipping path, frequency separation, HDR blending, and color grading."
  );
}

export default function GlossaryPage() {
  return <FeaturePageContent pageType="glossary" />;
}
