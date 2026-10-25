import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";
import { getDynamicServiceMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicServiceMetadata(
    "ecommerce",
    "E-Commerce Product Image Editing Services | LIRISHA",
    "Professional bulk e-commerce photo editing: pure white background, shadow creation, clipping path, ghost mannequin, and marketplace compliance."
  );
}

export default async function EcommerceServicePage() {
  const service = await getServiceBySlug("ecommerce");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}
