import type { Metadata } from "next";
import { ResourcesContent } from "@/components/smartphoto/ResourcesContent";

export const metadata: Metadata = {
  title: "Resources & Photo Editing Knowledge Hub | SmartPHOTOeditors",
  description:
    "Guides, tutorials, case studies, and insights on real estate photography, high-end portrait retouching, e-commerce clipping, and ghost mannequin workflows.",
};

export default function ResourcesPage() {
  return <ResourcesContent />;
}
