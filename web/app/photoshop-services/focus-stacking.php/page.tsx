import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Focus Stacking & Macro Alignment | SmartPHOTOeditors",
  description: "Macro focus stacking services for jewelry, watches, packaging, and commercial product photography.",
};

export default function FocusStackingPage() {
  return (
    <SubServiceDetailContent
      categorySlug="photoshop-services"
      subServiceSlug="focus-stacking"
      title="Focus Stacking & Macro Depth Merging"
      tagline="Merge Multiple Focal Planes into a Single Tack-Sharp Photograph with Infinite Depth of Field"
      description="In macro photography (watches, jewelry, electronics, and food packaging), optical physics makes full-depth sharpness impossible in a single shot. Our retouchers align and blend dozens of bracketed focal planes, eliminating optical aberration and halos."
      features={[
        "Sub-pixel bracketed frame auto-alignment",
        "Depth-map focal plane blending",
        "Edge halo & ghosting elimination",
        "Extreme macro sharpness from foreground to background",
        "Retouching of sensor dust and lens imperfections",
        "Print-ready 300 DPI ultra-high definition"
      ]}
    />
  );
}
