import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Raster to Vector Tracing Services | SmartPHOTOeditors",
  description: "Convert low-resolution raster images, logos, and artwork into infinitely scalable vector formats (AI, EPS, SVG).",
};

export default function TracingImagePage() {
  return (
    <SubServiceDetailContent
      categorySlug="image-clipping"
      subServiceSlug="vector-tracing"
      title="Raster to Vector Tracing Services"
      tagline="Transform Pixelated Bitmaps into Crisp, Infinitely Scalable Vector Art for Screen & Print"
      description="Convert blurry logos, sketches, hand-drawn diagrams, and low-res illustrations into crystal-clear vector graphics. Our vector illustrators hand-trace every path, ensuring minimal node counts and perfect geometric symmetry."
      features={[
        "Handcrafted Adobe Illustrator vector tracing",
        "Clean node reduction for smooth cutting/printing",
        "Pantone & CMYK spot color accuracy",
        "Deliverables in AI, EPS, SVG, and PDF vector formats",
        "Font identification and recreation",
        "Same-day rush vectorization service"
      ]}
    />
  );
}
