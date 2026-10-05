import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Image Clipping for Design Agencies | SmartPHOTOeditors",
  description: "Dedicated high-volume clipping path and masking partnership for advertising, branding, and creative agencies.",
};

export default function ClippingForAgenciesPage() {
  return (
    <SubServiceDetailContent
      categorySlug="image-clipping"
      subServiceSlug="agency-clipping"
      title="Image Clipping for Creative Agencies"
      tagline="Overnight Post-Production Bandwidth for High-Paced Design Agencies & Marketing Firms"
      description="Design agencies love working with SmartPHOTOeditors because we eliminate tedious production cutouts from their art directors' workload. Send us raw campaign assets at the end of your workday and receive layered, masked PSDs before your morning review."
      features={[
        "Overnight 12-hour agency turnaround SLA",
        "Multi-path vector separation for independent recoloring",
        "Dedicated agency account manager & QA lead",
        "Layered PSD files with organized color-coded groups",
        "Flexible volume billing & retainer options",
        "100% strict bilateral NDA confidentiality"
      ]}
    />
  );
}
