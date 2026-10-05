import type { Metadata } from "next";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { servicesData } from "@/lib/servicesData";

export const metadata: Metadata = {
  title: "Real Estate Image Editing Services | SmartPHOTOeditors",
  description:
    "Professional real estate photo editing services: HDR blending, sky replacement, lawn enhancement, decluttering, 360 virtual tours, and floor plans.",
};

export default function RealEstateServicePage() {
  const service = servicesData.find((s) => s.id === "real-estate")!;
  return <ServiceDetailContent service={service} />;
}
