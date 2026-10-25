import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";
import { getDynamicServiceMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicServiceMetadata(
    "panorama360",
    "360 Panorama Stitching Services | LIRISHA",
    "Seamless multi-bracket panorama stitching, nadir tripod removal, and HDR 360 degree virtual tour post-production."
  );
}

export default async function Panorama360ServicePage() {
  const service = await getServiceBySlug("panorama360");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}
