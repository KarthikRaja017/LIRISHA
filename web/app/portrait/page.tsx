import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "Portrait Photo Retouching Services | SmartPHOTOeditors",
  description:
    "High-end skin retouching, airbrushing, corporate headshot grooming, and wedding photo editing with natural texture retention.",
};

export default async function PortraitServicePage() {
  const service = await getServiceBySlug("portrait");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}

