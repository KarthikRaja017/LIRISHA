import type { Metadata } from "next";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata: Metadata = {
  title: "2D & 3D Floor Plan Conversion Services | LIRISHA",
  description:
    "Convert architectural sketches, blueprints, and matterport scans into textured 2D and 3D floor plans with room measurements and furniture layouts.",
};

export default function FloorPlanConversionsPage() {
  return (
    <SubServiceDetailContent
      categorySlug="real-estate"
      subServiceSlug="floor-plan-conversions"
      title="2D & 3D Floor Plan Conversions"
      tagline="Professional Architectural Blueprints & Textured 3D Layouts"
      description="Help buyers visualize space with crisp, full-color 2D and 3D floor plans. We convert rough sketches, CAD drawings, and contractor blueprints into marketing-ready architectural layouts complete with room labels, square footage, wall dimensions, and modern furniture placement."
      features={[
        "2D Schematic black & white and full-color textured plans",
        "3D Isometric floor plans with realistic textures (wood, tile, carpet)",
        "Room measurement annotations (Imperial / Metric)",
        "Custom branding with realtor and agency logos",
        "High-resolution vector PDF & web JPEG formats",
        "24-hour turnaround"
      ]}
    />
  );
}
