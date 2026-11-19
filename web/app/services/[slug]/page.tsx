import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";
import { getDynamicServiceMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = slug.replace(/\.php$/, "");
  const service = await getServiceBySlug(cleanSlug);
  if (!service) {
    return { title: "Service Not Found | LIRISHA" };
  }
  return await getDynamicServiceMetadata(
    cleanSlug,
    `${service.name} | LIRISHA`,
    service.tagline || service.shortDesc || "Professional image editing solutions."
  );
}

export default async function ServicesDynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const cleanSlug = slug.replace(/\.php$/, "");
  const service = await getServiceBySlug(cleanSlug);
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}
