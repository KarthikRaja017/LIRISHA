import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";
import { getDynamicServiceMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicServiceMetadata(
    "wedding-photo-post-processing",
    "Wedding Photo Post Processing Services | LIRISHA",
    "High-volume wedding photo editing, RAW culling, custom Lightroom preset matching, tone curve harmonization, and hero portrait retouching with guaranteed fast turnaround."
  );
}

export default async function WeddingPostProcessingPage() {
  const service =
    (await getServiceBySlug("wedding-photo-post-processing")) ||
    (await getServiceBySlug("wedding"));

  if (!service) {
    notFound();
  }

  return <ServiceDetailContent service={service} />;
}
