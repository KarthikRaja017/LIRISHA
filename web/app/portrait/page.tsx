import type { Metadata } from "next";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { servicesData } from "@/lib/servicesData";

export const metadata: Metadata = {
  title: "Portrait Photo Retouching Services | SmartPHOTOeditors",
  description:
    "High-end skin retouching, airbrushing, corporate headshot grooming, and wedding photo editing with natural texture retention.",
};

export default function PortraitServicePage() {
  const service = servicesData.find((s) => s.id === "portrait")!;
  return <ServiceDetailContent service={service} />;
}
