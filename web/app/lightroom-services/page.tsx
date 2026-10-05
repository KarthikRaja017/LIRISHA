import type { Metadata } from "next";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { servicesData } from "@/lib/servicesData";

export const metadata: Metadata = {
  title: "Lightroom Services & Batch Processing | SmartPHOTOeditors",
  description:
    "High-speed batch processing for event, wedding, and commercial shoots. Custom preset development, white balance correction, and exposure leveling.",
};

export default function LightroomServicesPage() {
  const service = servicesData.find((s) => s.id === "lightroom-services")!;
  return <ServiceDetailContent service={service} />;
}
