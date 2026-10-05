import React from "react";
import { CaseStudyDetailContent } from "@/components/smartphoto/CaseStudyDetailContent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CaseStudyDynamicPage({ params }: PageProps) {
  const { slug } = await params;
  return <CaseStudyDetailContent studySlug={slug} />;
}
