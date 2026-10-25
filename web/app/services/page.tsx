import type { Metadata } from "next";
import { ServicesContent } from "@/components/smartphoto/ServicesContent";
import { getServices } from "@/lib/api/content";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "services",
    "Professional Image Editing Services | SmartPHOTOeditors",
    "Explore full-spectrum image editing solutions: Real Estate HDR, Portrait Retouching, Handcrafted Clipping Paths, Fashion Ghost Mannequin, Jewelry Polish, and Photo Restoration."
  );
}

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesContent initialServices={services} />;
}
