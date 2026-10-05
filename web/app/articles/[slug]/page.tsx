import React from "react";
import { ArticleDetailContent } from "@/components/smartphoto/ArticleDetailContent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticleDynamicPage({ params }: PageProps) {
  const { slug } = await params;
  return <ArticleDetailContent slug={slug} type="article" />;
}
