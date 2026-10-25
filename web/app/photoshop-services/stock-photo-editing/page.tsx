import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Stock Photo Editing & Customization | SmartPHOTOeditors",
  description: "Customize royalty-free stock photos to match your brand palette, replace logos, swap screens, and tailor assets.",
};

export default function StockPhotoEditingPage() {
  return (
    <SubServiceDetailContent
      categorySlug="photoshop-services"
      subServiceSlug="stock-photo-editing"
      title="Stock Photo Editing & Customization"
      tagline="Adapt Generic Stock Imagery into Proprietary, Brand-Aligned Visual Marketing Assets"
      description="Don't use generic stock photos that look identical to your competitors. We customize stock images by inserting your brand logo onto apparel, changing background color schemes, swapping computer/phone UI screens, and adjusting demographics."
      features={[
        "Brand color palette re-grading & harmonization",
        "Screen replacement & user interface mockup insertion",
        "Proprietary logo and trademark placement",
        "Background object insertion and modification",
        "Apparel recoloring and styling changes",
        "Seamless photorealistic composite blending"
      ]}
    />
  );
}
