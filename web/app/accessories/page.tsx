import React from "react";
import { FeaturePageContent } from "@/components/smartphoto/FeaturePageContent";

export const metadata = {
  title: "Photography Accessories & Equipment Recommendations | SmartPHOTOeditors",
  description: "Recommended photography accessories, color calibration cards, and studio gear to streamline post-production.",
};

export default function AccessoriesPage() {
  return <FeaturePageContent pageType="accessories" />;
}
