import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Skin Retouching Services | SmartPHOTOeditors",
  description: "Advanced frequency separation skin retouching for portraits, headshots, and beauty photography.",
};

export default function SkinRetouchingPage() {
  return (
    <SubServiceDetailContent
      categorySlug="portrait"
      subServiceSlug="skin-retouching"
      title="Skin Retouching & Texture Refinement"
      tagline="Pore-Perfect Skin Smoothing without Sacrificing Natural Complexion or Detail"
      description="Utilizing high-end frequency separation and localized dodge & burn, our retouchers remove acne, scars, uneven redness, and dark circles while preserving 100% authentic skin pore detail."
      features={[
        "Two-tier frequency separation (Texture vs Color)",
        "Under-eye puffiness & dark circle softening",
        "Redness and skin blotch neutralization",
        "Neck and facial wrinkle softening",
        "Specular highlight tuning on T-zone",
        "100% natural, non-plastic aesthetic"
      ]}
    />
  );
}
