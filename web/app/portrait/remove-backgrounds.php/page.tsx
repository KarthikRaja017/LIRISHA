import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Remove Portrait Backgrounds | SmartPHOTOeditors",
  description: "Clean background extraction and replacement for corporate headshots, studio portraits, and fashion catalogs.",
};

export default function RemoveBackgroundsPage() {
  return (
    <SubServiceDetailContent
      categorySlug="portrait"
      subServiceSlug="remove-backgrounds"
      title="Background Removal & Replacement"
      tagline="Clean Headshot & Model Extraction with Alpha Hair Masking and Seamless Studio Backdrops"
      description="Isolate models and subjects from busy or cluttered backgrounds with precision edge refining. We place subjects onto modern corporate studio backdrops, solid white/grey colors, or transparent PNGs."
      features={[
        "Precision flyaway hair edge preservation",
        "Color spill & edge fringing elimination",
        "Custom studio texture & gradient backdrops",
        "Seamless natural contact shadow creation",
        "Transparent PNG & layered PSD delivery",
        "Bulk batch processing for corporate teams"
      ]}
    />
  );
}
