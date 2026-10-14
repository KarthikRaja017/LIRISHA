import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "Professional Photo Retouching Services | SmartPHOTOeditors",
  description:
    "High-end photo retouching for portrait photographers, commercial studios, e-commerce brands, and fashion houses.",
};

export default async function PhotoRetouchingServicePage() {
  const service = await getServiceBySlug("portrait");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}

