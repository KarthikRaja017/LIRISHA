import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Natural Shadow Creation for Portraits | SmartPHOTOeditors",
  description: "Realistic drop, cast, and ambient contact shadow creation for extracted portraits and studio photography.",
};

export default function NaturalShadowPortraitPage() {
  return (
    <SubServiceDetailContent
      categorySlug="portrait"
      subServiceSlug="natural-shadow"
      title="Natural Shadow & Grounding Effects"
      tagline="Ground Cutout Subjects Naturally with Realistic Ambient Contact and Directional Cast Shadows"
      description="Extracted models and portraits often appear to float unrealistically when placed on plain white or colored backgrounds. Our artists reconstruct realistic light source geometry and soft feathered contact shadows."
      features={[
        "Geometric cast shadow rendering",
        "Soft ambient contact shadow grounding",
        "Realistic light falloff gradient calculation",
        "Floor reflection and gloss simulation",
        "Custom opacity and angle matching",
        "Layered PSD deliverable"
      ]}
    />
  );
}
