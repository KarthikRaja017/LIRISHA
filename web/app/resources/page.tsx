import type { Metadata } from "next";
import { ResourcesContent } from "@/components/smartphoto/ResourcesContent";
import { getResources, getTestimonials } from "@/lib/api/content";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "resources",
    "Resources & Photo Editing Knowledge Hub | LIRISHA",
    "Guides, tutorials, case studies, and insights on real estate photography, high-end portrait retouching, e-commerce clipping, and ghost mannequin workflows."
  );
}

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
