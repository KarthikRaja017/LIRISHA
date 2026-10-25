import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Professional Airbrushing Services | SmartPHOTOeditors",
  description: "High-end digital airbrushing services for portraits, model portfolios, and beauty campaigns with natural skin texture retention.",
};

export default function AirbrushingServicesPage() {
  return (
    <SubServiceDetailContent
      categorySlug="portrait"
      subServiceSlug="airbrushing-services"
      title="Portrait Airbrushing Services"
      tagline="Subtle, Natural Digital Airbrushing that Enhances Beauty without Artificial Plastic Artifacts"
      description="SmartPHOTOeditors delivers refined digital airbrushing techniques that soften skin tone transitions, balance complex highlights, and remove micro-blemishes while preserving 100% authentic pore detail and skin texture."
      features={[
        "Frequency separation skin smoothing",
        "Micro-blemish & redness reduction",
        "Subtle dodge & burn contour sculpting",
        "Eye sparkle & teeth whitening",
        "Preservation of authentic pores & freckles",
        "Express 12-24h studio turnaround"
      ]}
    />
  );
}
