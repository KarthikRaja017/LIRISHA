import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "Antique & Damaged Photo Restoration Services | SmartPHOTOeditors",
  description:
    "Digital restoration for damaged, torn, faded vintage photographs and authentic period-accurate black and white colorization.",
};

export default async function PhotoRestorationServicePage() {
  const service = await getServiceBySlug("photo-restoration");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}

