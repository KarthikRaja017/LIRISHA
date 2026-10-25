import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";
import { getDynamicServiceMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicServiceMetadata(
    "real-estate",
    "Real Estate Image Editing Services | LIRISHA",
    "Professional real estate photo editing services: HDR blending, sky replacement, lawn enhancement, decluttering, 360 virtual tours, and floor plans."
  );
}

export default async function RealEstateServicePage() {
  const service = await getServiceBySlug("real-estate");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}
