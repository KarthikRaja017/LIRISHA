import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Portrait Exposure Corrections | SmartPHOTOeditors",
  description: "Dynamic range optimization, highlight recovery, and shadow leveling for portraits and outdoor photo shoots.",
};

export default function ExposureCorrectionsPage() {
  return (
    <SubServiceDetailContent
      categorySlug="portrait"
      subServiceSlug="exposure-corrections"
      title="Exposure & Dynamic Range Corrections"
      tagline="Recover Blown Highlights, Lift Harsh Shadows, and Balance Contrast Across Dynamic Lighting"
      description="Harsh midday sun or underexposed backlight settings can ruin an otherwise perfect shot. We recover clipped highlights, lift crushed shadow details without adding noise, and sculpt balanced lighting across subjects."
      features={[
        "Clipped facial highlight recovery",
        "Deep shadow recovery with AI de-noise",
        "Local contrast and clarity balancing",
        "Backlight & fill flash harmonization",
        "Gradient vignette adjustment",
        "16-bit RAW dynamic range preservation"
      ]}
    />
  );
}
