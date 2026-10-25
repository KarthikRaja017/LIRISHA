import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";
import { getDynamicServiceMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicServiceMetadata(
    "photo-retouching",
    "High-End Commercial Photo Retouching | LIRISHA",
    "Editorial fashion retouching, beauty color grading, and commercial magazine-quality post-production."
  );
}

export default async function PhotoRetouchingServicePage() {
  const service = await getServiceBySlug("photo-retouching");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}
