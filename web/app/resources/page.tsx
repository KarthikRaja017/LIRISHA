import type { Metadata } from "next";
import { ResourcesContent } from "@/components/smartphoto/ResourcesContent";
import { getResources, getTestimonials } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "Resources & Photo Editing Knowledge Hub | SmartPHOTOeditors",
  description:
    "Guides, tutorials, case studies, and insights on real estate photography, high-end portrait retouching, e-commerce clipping, and ghost mannequin workflows.",
};

export default async function ResourcesPage() {
  const [resources, testimonials] = await Promise.all([
    getResources(),
    getTestimonials(),
  ]);
  return (
    <ResourcesContent
      initialResources={resources}
      initialTestimonials={testimonials}
    />
  );
}

