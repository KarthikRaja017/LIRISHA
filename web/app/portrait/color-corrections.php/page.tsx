import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Portrait Color Correction Services | SmartPHOTOeditors",
  description: "Precise portrait skin tone balancing, white balance synchronization, and creative color grading for studio sessions.",
};

export default function PortraitColorCorrectionsPage() {
  return (
    <SubServiceDetailContent
      categorySlug="portrait"
      subServiceSlug="color-corrections"
      title="Portrait Color Correction & Tone Balancing"
      tagline="Harmonize Skin Tones, Eliminate Unwanted Color Casts, and Apply Cohesive Tonal Palettes"
      description="Fluorescent lighting, mixed color temperatures, and bounce reflections can cause uneven, jaundiced, or magenta skin tones. Our colorists calibrate skin tones using standard HSL values to achieve natural, glowing, healthy complexions."
      features={[
        "Cyan, magenta & yellow cast neutralization",
        "Targeted skin tone HSL balancing",
        "Cohesive multi-shot color synchronization",
        "Eye color & lip tint enrichment",
        "Apparel color accuracy preservation",
        "Dual-illuminant camera profile calibration"
      ]}
    />
  );
}
