import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Photo Montage & Creative Compositing | SmartPHOTOeditors",
  description: "Seamless photo montage creation, multi-subject compositing, and artistic background blending for memorable portraits.",
};

export default function PhotoMontagePage() {
  return (
    <SubServiceDetailContent
      categorySlug="portrait"
      subServiceSlug="photo-montage"
      title="Photo Montage & Composites"
      tagline="Seamlessly Blend Multiple Portraits, Timelines & Creative Backdrops into Captivating Visual Masterpieces"
      description="Whether designing anniversary collages, memorial tributes, corporate group assemblies, or fantasy composites, our master artists match lighting direction, shadows, and perspective for flawless realism."
      features={[
        "Multi-subject composite blending",
        "Perspective & focal length matching",
        "Harmonized lighting & color temperature",
        "Artistic edge feathering & alpha blending",
        "Layered PSD deliverable with editable masks",
        "Print-ready 300 DPI high resolution"
      ]}
    />
  );
}
