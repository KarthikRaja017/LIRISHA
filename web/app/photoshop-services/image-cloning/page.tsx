import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Image Cloning & Seamless Compositing | SmartPHOTOeditors",
  description: "Advanced image cloning, texture replication, crowd replication, and canvas extension services.",
};

export default function ImageCloningPage() {
  return (
    <SubServiceDetailContent
      categorySlug="photoshop-services"
      subServiceSlug="image-cloning"
      title="Image Cloning & Texture Compositing"
      tagline="Replicate Complex Textures, Seamlessly Extend Canvas Borders & Harmonize Composite Elements"
      description="Using advanced non-destructive clone stamp, patch, and frequency-aware sampling techniques, our artists seamlessly replicate complex architectural patterns, extend backdrop canvases, and fill empty spaces without repeating visual patterns."
      features={[
        "Seamless canvas ratio and aspect extension",
        "Complex organic and architectural pattern cloning",
        "Removal of intrusive background elements",
        "Perspective-accurate pattern mapping",
        "Non-destructive workflow on dedicated clone layers",
        "Flawless photo-realistic finish"
      ]}
    />
  );
}
