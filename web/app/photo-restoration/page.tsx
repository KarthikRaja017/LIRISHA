import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";
import { getDynamicServiceMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicServiceMetadata(
    "photo-restoration",
    "Old Photo Restoration & Colorization | LIRISHA",
    "Restoration of damaged, torn, faded vintage photographs with scratch repair, tear blending, and realistic digital colorization."
  );
}

export default async function PhotoRestorationServicePage() {
  const service = await getServiceBySlug("photo-restoration");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}
