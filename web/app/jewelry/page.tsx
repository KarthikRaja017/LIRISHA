import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";
import { getDynamicServiceMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicServiceMetadata(
    "jewelry",
    "Jewelry Photo Retouching Services | LIRISHA",
    "Macro metal polish, gemstone sparkle enhancement, diamond color correction, and shadow creation for fine jewelry sellers."
  );
}

export default async function JewelryServicePage() {
  const service = await getServiceBySlug("jewelry");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}
