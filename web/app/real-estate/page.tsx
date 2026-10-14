import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "Real Estate Image Editing Services | SmartPHOTOeditors",
  description:
    "Professional real estate photo editing services: HDR blending, sky replacement, lawn enhancement, decluttering, 360 virtual tours, and floor plans.",
};

export default async function RealEstateServicePage() {
  const service = await getServiceBySlug("real-estate");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}

