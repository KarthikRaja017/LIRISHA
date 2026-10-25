import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "High-End Beauty & Commercial Retouching | SmartPHOTOeditors",
  description: "Magazine-grade high-end retouching for commercial advertising, editorial magazine covers, and celebrity headshots.",
};

export default function HighEndRetouchingPage() {
  return (
    <SubServiceDetailContent
      categorySlug="portrait"
      subServiceSlug="high-end-retouching"
      title="High-End Beauty & Commercial Retouching"
      tagline="Magazine-Cover Precision with Micro Dodge & Burn, Detailed Anatomy Sculpting and Luxury Polish"
      description="For high-stakes commercial ad campaigns, beauty editorial covers, and luxury brand lookbooks, our master retouchers spend dedicated hours executing pixel-level Dodge & Burn, strand-by-strand hair cleanup, and precision makeup reconstruction."
      features={[
        "Pixel-level micro Dodge & Burn shading",
        "Strand-by-strand flyaway hair grooming",
        "Digital makeup cleanup and color enhancement",
        "Jewelry & apparel texture refinement",
        "True-to-life pore and skin grain structure",
        "Dedicated senior master retoucher assignment"
      ]}
    />
  );
}
