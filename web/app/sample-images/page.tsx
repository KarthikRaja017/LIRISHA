import type { Metadata } from "next";
import { PortfolioGallery } from "@/components/smartphoto/PortfolioGallery";
import { getGalleryTabs } from "@/lib/api/content";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "sample-images",
    "Sample Images & Portfolio Gallery | LIRISHA",
    "Sample images for image clipping, image manipulation, Panorama 360, photo restoration, portrait and real estate imaging services from LIRISHA."
  );
}

export default async function SampleImagesRoutePage() {
  const tabs = await getGalleryTabs();
  return <PortfolioGallery initialTabs={tabs} />;
}
