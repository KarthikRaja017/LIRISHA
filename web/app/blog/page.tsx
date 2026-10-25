import type { Metadata } from "next";
import { BlogContent } from "@/components/smartphoto/BlogContent";
import { getResources } from "@/lib/api/content";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "blog",
    "Photo Editing Blog & Insights | LIRISHA",
    "LIRISHA blog covers photography industry trends, AI versus human retouching insights, batch processing guides, and studio growth advice."
  );
}

export default async function BlogPage() {
  const posts = await getResources("Blog");
  return <BlogContent initialPosts={posts} />;
}
