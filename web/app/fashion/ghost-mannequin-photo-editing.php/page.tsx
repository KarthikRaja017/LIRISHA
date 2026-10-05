import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Ghost Mannequin Photo Editing Services | SmartPHOTOeditors",
  description: "3D invisible ghost mannequin effect, neck joint assembly, wrinkle removal, and symmetry alignment for fashion brands.",
};

export default function GhostMannequinEditingPage() {
  return (
    <SubServiceDetailContent
      categorySlug="fashion"
      subServiceSlug="ghost-mannequin"
      title="Ghost Mannequin & Neck Joint Editing"
      tagline="Create 3D Hollow-Man Apparel Presentations by Combining Garment & Collar Shots"
      description="Showcase fit, style, and inner fabric details without paying expensive live model fees. Our fashion editors seamlessly composite front garment shots with inner neckline and bottom hem photos for a natural 3D floating look."
      features={[
        "Collar & inner tag neckline joint stitching",
        "Sleeve hem & cuff bottom hollow 3D assembly",
        "Fabric crease & transport wrinkle smoothing",
        "Symmetrical silhouette and drape alignment",
        "Pure white background & realistic drop shadow",
        "Multi-channel colorway variation creation"
      ]}
    />
  );
}
