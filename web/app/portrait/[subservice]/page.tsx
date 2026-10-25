import type { Metadata } from "next";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";

interface PageProps {
  params: Promise<{
    subservice: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subservice } = await params;
  const cleanSlug = subservice.replace(/\.php$/, "");
  const category = await getServiceBySlug("portrait");
  const matched = category?.subServices?.find(
    (s) =>
      s.id === cleanSlug ||
      (s.link && s.link.replace(/\.php$/, "").endsWith(cleanSlug))
  );

  const title = matched?.name || cleanSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${title} | Portrait Retouching Services | LIRISHA`,
    description: matched?.description || `Professional ${title} services with 12-24h turnaround.`,
  };
}

export default async function PortraitSubServiceDynamicPage({ params }: PageProps) {
  const { subservice } = await params;
  const cleanSlug = subservice.replace(/\.php$/, "");
  const category = await getServiceBySlug("portrait");

  const matched = category?.subServices?.find(
    (s) =>
      s.id === cleanSlug ||
      (s.link && s.link.replace(/\.php$/, "").endsWith(cleanSlug))
  );

  const fallbackTitle = cleanSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <SubServiceDetailContent
      categorySlug="portrait"
      subServiceSlug={cleanSlug}
      title={matched?.name || fallbackTitle}
      description={
        matched?.description ||
        `High-precision ${fallbackTitle} services for portrait, beauty, headshot, and wedding photographers.`
      }
      parentCategory={category || undefined}
    />
  );
}
