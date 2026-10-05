import type { Metadata } from "next";
import { BlogContent } from "@/components/smartphoto/BlogContent";

export const metadata: Metadata = {
  title: "Photo Editing Blog & Insights | SmartPHOTOeditors",
  description:
    "SmartPHOTOeditors blog covers photography industry trends, AI versus human retouching insights, batch processing guides, and studio growth advice.",
};

export default function BlogPage() {
  return <BlogContent />;
}
