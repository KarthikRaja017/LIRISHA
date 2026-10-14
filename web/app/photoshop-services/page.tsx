import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "Photoshop Creative & Manipulation Services | SmartPHOTOeditors",
  description:
    "Advanced Photoshop manipulation, vector conversions, pop art graphics, HDR tonemapping, image cloning, creative composites, and focus stacking.",
};

export default async function PhotoshopServicesPage() {
  const service = await getServiceBySlug("photoshop-services");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}

