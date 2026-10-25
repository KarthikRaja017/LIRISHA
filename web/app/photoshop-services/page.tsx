import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";
import { getDynamicServiceMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicServiceMetadata(
    "photoshop-services",
    "Custom Photoshop Retouching Services | LIRISHA",
    "Advanced Photoshop editing: focus stacking, pop art effects, stock photo manipulation, and raster-to-vector graphics."
  );
}

export default async function PhotoshopServicesServicePage() {
  const service = await getServiceBySlug("photoshop-services");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}
