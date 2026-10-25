import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Advanced Hair & Fur Masking Services | SmartPHOTOeditors",
  description: "Alpha channel hair masking and refine edge services for intricate portraits, pets, and semi-transparent fabrics.",
};

export default function HairMaskingPage() {
  return (
    <SubServiceDetailContent
      categorySlug="image-clipping"
      subServiceSlug="hair-masking"
      title="Advanced Hair & Fur Masking"
      tagline="Extract Fine Strands of Hair, Animal Fur & Transparent Fabrics with Alpha Channel Precision"
      description="Standard pen tool clipping paths cannot isolate fine hairs or feathers. Our masking specialists use multi-channel color calculations, luminosity masking, and custom edge refinement brushes to capture every delicate strand."
      features={[
        "Alpha channel color separation calculation",
        "Fine flyaway hair & fur preservation",
        "Edge defringing and color bleed decontamination",
        "Semi-transparent fabric & veil isolation",
        "Seamless placement on dark and light backgrounds",
        "Layered PSD deliverable with editable mask channels"
      ]}
    />
  );
}
