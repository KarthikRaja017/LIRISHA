import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";
import { getDynamicServiceMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicServiceMetadata(
    "lightroom-services",
    "Batch Lightroom Raw Editing Services | LIRISHA",
    "High-volume RAW processing, preset application, exposure balancing, and color grading for event and commercial photographers."
  );
}

export default async function LightroomServicesServicePage() {
  const service = await getServiceBySlug("lightroom-services");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}
