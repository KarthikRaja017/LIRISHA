import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Creative Special Effects & Compositing | SmartPHOTOeditors",
  description: "Photoshop special effects, lighting flares, particle rendering, atmosphere additions, and surreal composites.",
};

export default function SpecialEffectsPage() {
  return (
    <SubServiceDetailContent
      categorySlug="photoshop-services"
      subServiceSlug="special-effects"
      title="Creative Special Effects & Visual Compositing"
      tagline="Cinematic Lighting Effects, Environmental Atmosphere, Particle Simulations & Creative Composites"
      description="Turn ordinary photography into breathtaking commercial advertisements. We render realistic anamorphic lens flares, atmospheric fog, rain, fire, particle sparks, and surreal creative composites with matched physics and lighting."
      features={[
        "Cinematic light leak & lens flare rendering",
        "Environmental weather FX (fog, snow, rain, haze)",
        "3D particle & luminous glow compositing",
        "Color grading for cinematic mood styling",
        "Multi-exposure blend with perspective alignment",
        "High-resolution master PSB/PSD delivery"
      ]}
    />
  );
}
