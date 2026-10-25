import type { Metadata } from "next";
import { ArticlesContent } from "@/components/smartphoto/ArticlesContent";
import { getResources } from "@/lib/api/content";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "articles",
    "Photography & Photo Editing Articles | LIRISHA",
    "We are passionate about photography and photo editing. Explore tutorials on HDR blending, clipping path, frequency separation, and e-commerce photo editing."
  );
}

export default async function ArticlesPage() {
  const articles = await getResources("Articles");
  return <ArticlesContent initialArticles={articles} />;
}
