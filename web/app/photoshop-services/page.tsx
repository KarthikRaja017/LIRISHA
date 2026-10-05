import type { Metadata } from "next";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { servicesData } from "@/lib/servicesData";

export const metadata: Metadata = {
  title: "Photoshop Creative & Manipulation Services | SmartPHOTOeditors",
  description:
    "Advanced Photoshop manipulation, vector conversions, pop art graphics, HDR tonemapping, image cloning, creative composites, and focus stacking.",
};

export default function PhotoshopServicesPage() {
  const service = servicesData.find((s) => s.id === "photoshop-services")!;
  return <ServiceDetailContent service={service} />;
}
