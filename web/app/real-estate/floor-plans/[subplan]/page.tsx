import type { Metadata } from "next";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";

interface PageProps {
  params: Promise<{
    subplan: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subplan } = await params;
  const cleanSlug = subplan.replace(/\.php$/, "");
  const category = await getServiceBySlug("real-estate");

  const matched = category?.subServices?.find(
    (s) =>
      s.id === cleanSlug ||
      (s.link && s.link.replace(/\.php$/, "").endsWith(cleanSlug))
  );

  const title = matched?.name || cleanSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${title} | Real Estate Floor Plans | LIRISHA`,
    description: matched?.description || `Professional ${title} drafting services with 12-24h turnaround.`,
  };
}

export default async function RealEstateFloorPlanSubServicePage({ params }: PageProps) {
  const { subplan } = await params;
  const cleanSlug = subplan.replace(/\.php$/, "");
  const category = await getServiceBySlug("real-estate");

  const matched = category?.subServices?.find(
    (s) =>
      s.id === cleanSlug ||
      (s.link && s.link.replace(/\.php$/, "").endsWith(cleanSlug))
  );

  const fallbackTitle = cleanSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <SubServiceDetailContent
      categorySlug="real-estate"
      subServiceSlug={cleanSlug}
      title={matched?.name || fallbackTitle}
      description={
        matched?.description ||
        `High-precision ${fallbackTitle} drafting for realtors, architects, and property developers.`
      }
      parentCategory={category || undefined}
    />
  );
}
