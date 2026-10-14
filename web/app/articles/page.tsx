import type { Metadata } from "next";
import { ArticlesContent } from "@/components/smartphoto/ArticlesContent";
import { getResources } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "Photography & Photo Editing Articles | SmartPHOTOeditors",
  description:
    "We're passionate about photography and photo editing. Explore tutorials on HDR blending, clipping path, frequency separation, and e-commerce photo editing.",
};

export default async function ArticlesPage() {
  const articles = await getResources("Articles");
  return <ArticlesContent initialArticles={articles} />;
}

