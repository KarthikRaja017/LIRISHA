import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "Jewelry Photo Retouching Services | SmartPHOTOeditors",
  description:
    "Extreme macro retouching for diamonds, gemstones, precious metals, watches, rings, and necklaces.",
};

export default async function JewelryServicePage() {
  const service = await getServiceBySlug("jewelry");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}

