import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";
import { getDynamicServiceMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicServiceMetadata(
    "fashion",
    "Fashion & Apparel Photo Editing Services | LIRISHA",
    "Apparel ghost mannequin, wrinkle removal, symmetry alignment, and e-commerce model color matching."
  );
}

export default async function FashionServicePage() {
  const service = await getServiceBySlug("fashion");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}
