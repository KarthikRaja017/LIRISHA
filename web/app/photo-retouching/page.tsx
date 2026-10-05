import type { Metadata } from "next";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { servicesData } from "@/lib/servicesData";

export const metadata: Metadata = {
  title: "Professional Photo Retouching Services | SmartPHOTOeditors",
  description:
    "High-end photo retouching for portrait photographers, commercial studios, e-commerce brands, and fashion houses.",
};

export default function PhotoRetouchingServicePage() {
  const service = servicesData.find((s) => s.id === "portrait")!;
  return <ServiceDetailContent service={service} />;
}
