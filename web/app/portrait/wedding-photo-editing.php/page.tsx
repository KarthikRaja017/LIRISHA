import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Wedding Photo Editing Services | SmartPHOTOeditors",
  description: "Comprehensive wedding photo editing, batch color correction, culling, and bridal glamor retouching for wedding photographers.",
};

export default function WeddingPhotoEditingPage() {
  return (
    <SubServiceDetailContent
      categorySlug="portrait"
      subServiceSlug="wedding-photo-editing"
      title="Wedding Photo Editing & Culling"
      tagline="Transform Full Wedding Galleries with Cohesive Color Grading, Bridal Glamour & Express Turnaround"
      description="Save dozens of hours during peak wedding season. SmartPHOTOeditors handles high-volume RAW culling, exposure balancing, signature color preset synchronization, bridal gown brightening, and romantic toning across thousands of frames."
      features={[
        "High-speed event RAW culling & rating",
        "Cohesive color temperature synchronization",
        "Bridal skin, veil & makeup retouching",
        "Background guest & distraction removal",
        "Lightroom Smart Preview integration",
        "24-48h full album delivery"
      ]}
    />
  );
}
