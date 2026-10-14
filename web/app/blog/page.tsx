import type { Metadata } from "next";
import { BlogContent } from "@/components/smartphoto/BlogContent";
import { getResources } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "Photo Editing Blog & Insights | SmartPHOTOeditors",
  description:
    "SmartPHOTOeditors blog covers photography industry trends, AI versus human retouching insights, batch processing guides, and studio growth advice.",
};

export default async function BlogPage() {
  const posts = await getResources("Blog");
  return <BlogContent initialPosts={posts} />;
}

