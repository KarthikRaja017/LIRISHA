import type { Metadata } from "next";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const category = await getServiceBySlug("real-estate");
  const matched = category?.subServices?.find((s) => s.id === "floor-plans");

  return {
    title: "Floor Plans | Real Estate Architectural Drafting | LIRISHA",
    description:
      matched?.description ||
      "Professional 2D floor plans, 3D photorealistic floor plans, and site plans for real estate listings.",
  };
}

export default async function RealEstateFloorPlansPage() {
  const category = await getServiceBySlug("real-estate");
  const matched = category?.subServices?.find((s) => s.id === "floor-plans");

  return (
    <SubServiceDetailContent
      categorySlug="real-estate"
      subServiceSlug="floor-plans"
      title={matched?.name || "Floor Plans"}
      description={
        matched?.description ||
        "Convert blueprints, Matterport scans, or rough sketches into clean 2D floor plans, 3D textured isometric cutaways, and comprehensive site plans."
      }
      parentCategory={category || undefined}
    />
  );
}
