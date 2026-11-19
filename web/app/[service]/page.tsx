import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";
import { getDynamicServiceMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{
    service: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: rawService } = await params;
  const cleanSlug = rawService.replace(/\.php$/, "");
  const service = await getServiceBySlug(cleanSlug);
  if (!service) {
    return { title: "Page Not Found | LIRISHA" };
  }
  return await getDynamicServiceMetadata(
    cleanSlug,
    `${service.name} | LIRISHA`,
    service.tagline || service.shortDesc || "Professional image editing solutions."
  );
}

export default async function CatchAllServicePage({ params }: PageProps) {
  const { service: rawService } = await params;
  const cleanSlug = rawService.replace(/\.php$/, "");
  const service = await getServiceBySlug(cleanSlug);
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}
