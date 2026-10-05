import type { Metadata } from "next";
import { PortfolioGallery } from "@/components/smartphoto/PortfolioGallery";

export const metadata: Metadata = {
  title: "Sample Images | SmartPHOTOeditors",
  description:
    "Sample images for image clipping, image manipulation, Panorama 360, photo restoration, portrait and real estate imaging services from SmartPHOTOeditors.",
};

export default function SampleImagesRoutePage() {
  return <PortfolioGallery />;
}
