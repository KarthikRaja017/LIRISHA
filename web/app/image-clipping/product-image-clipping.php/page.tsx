import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Product Image Clipping Services | SmartPHOTOeditors",
  description: "High-volume product image clipping, cutout paths, and shadow creation for e-commerce stores and print catalogs.",
};

export default function ProductImageClippingPage() {
  return (
    <SubServiceDetailContent
      categorySlug="image-clipping"
      subServiceSlug="product-image-clipping"
      title="Product Image Clipping & Background Cutouts"
      tagline="Isolate E-Commerce Products with Sub-Pixel Pen Tool Precision and Realistic Drop Shadows"
      description="Whether editing electronics, footwear, jewelry, cosmetics, or furniture, our clipping path team delivers clean, crisp isolations that make your products pop on Amazon, eBay, Shopify, and printed wholesale catalogs."
      features={[
        "Multi-angle product cutout paths",
        "Pure white background placement (#FFFFFF)",
        "Natural drop and cast shadow generation",
        "Consistent framing, margin, and scale alignment",
        "Layered PSD files with editable vector masks",
        "High volume capacity: 5,000+ images per day"
      ]}
    />
  );
}
