import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";
import { getDynamicServiceMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicServiceMetadata(
    "image-clipping",
    "Image Clipping Path & Masking Services | LIRISHA",
    "Handcrafted vector clipping path, multi-path isolation, alpha channel hair masking, and automated shadow creation."
  );
}

export default async function ImageClippingServicePage() {
  const service = await getServiceBySlug("image-clipping");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}
