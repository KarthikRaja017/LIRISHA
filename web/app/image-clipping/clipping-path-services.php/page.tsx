import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Clipping Path Services | SmartPHOTOeditors",
  description: "Handcrafted Photoshop Pen Tool clipping path services for e-commerce products, apparel, and commercial catalogs.",
};

export default function ClippingPathServicesPage() {
  return (
    <SubServiceDetailContent
      categorySlug="image-clipping"
      subServiceSlug="clipping-path"
      title="Handcrafted Clipping Path Services"
      tagline="100% Hand-Drawn Vector Paths Zoomed in Up to 300% for Razor-Sharp Edge Extraction"
      description="Say goodbye to ragged edges and halos created by automated algorithms. SmartPHOTOeditors creates handcrafted vector clipping paths using the Photoshop Pen Tool for smooth, razor-sharp object isolation ready for print or digital marketplaces."
      features={[
        "Single & multi-path vector isolation",
        "Handcrafted Pen Tool anchor placement",
        "Inner cutout (holes & handles) extraction",
        "Embedded Photoshop vector clipping path in PSD/TIFF",
        "Pure white (#FFFFFF) background placement",
        "Overnight turnaround for 1,000+ image batches"
      ]}
    />
  );
}
