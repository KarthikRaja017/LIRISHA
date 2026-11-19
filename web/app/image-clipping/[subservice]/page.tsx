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
  const category = await getServiceBySlug("image-clipping");
  const matched = category?.subServices?.find(
    (s) =>
      s.id === cleanSlug ||
      (s.link && s.link.replace(/\.php$/, "").endsWith(cleanSlug))
  );

  const title = matched?.name || cleanSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${title} | Image Clipping Services | LIRISHA`,
    description: matched?.description || `Professional ${title} with 12-24h turnaround.`,
  };
}

export default async function ImageClippingSubServicePage({ params }: PageProps) {
  const { subservice } = await params;
  const cleanSlug = subservice.replace(/\.php$/, "");
  const category = await getServiceBySlug("image-clipping");

  const matched = category?.subServices?.find(
    (s) =>
      s.id === cleanSlug ||
      (s.link && s.link.replace(/\.php$/, "").endsWith(cleanSlug))
  );

  const fallbackTitle = cleanSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <SubServiceDetailContent
      categorySlug="image-clipping"
      subServiceSlug={cleanSlug}
      title={matched?.name || fallbackTitle}
      description={
        matched?.description ||
        `Pixel-perfect ${fallbackTitle} services for e-commerce, catalogs, and commercial photography.`
      }
      parentCategory={category || undefined}
    />
  );
}
