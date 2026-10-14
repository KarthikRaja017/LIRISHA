import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "Lightroom Services & Batch Processing | SmartPHOTOeditors",
  description:
    "High-speed batch processing for event, wedding, and commercial shoots. Custom preset development, white balance correction, and exposure leveling.",
};

export default async function LightroomServicesPage() {
  const service = await getServiceBySlug("lightroom-services");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}

