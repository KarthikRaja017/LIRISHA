import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Vector Graphics Editing Services | SmartPHOTOeditors",
  description: "High-precision vector graphic creation, emblem design, technical vector illustrations, and print-ready conversions.",
};

export default function VectorGraphicsEditingPage() {
  return (
    <SubServiceDetailContent
      categorySlug="photoshop-services"
      subServiceSlug="vector-graphics"
      title="Vector Graphics & Illustration Services"
      tagline="Create Crisp, Infinitely Scalable Vector Icons, Badges, Technical Diagrams and Illustrations"
      description="Our Adobe Illustrator and Photoshop artists create vector graphics that remain crisp at any display size or billboard print resolution. We clean up CAD exports, convert sketches into vector infographics, and generate custom branded vector assets."
      features={[
        "Custom vector icon set & badge creation",
        "Technical blueprint and diagram vectorization",
        "Infinite scalability without pixel degradation",
        "Pantone, RGB, and CMYK color space delivery",
        "Layered vector files (AI, EPS, SVG, PDF)",
        "Fast turnaround with unlimited revisions"
      ]}
    />
  );
}
