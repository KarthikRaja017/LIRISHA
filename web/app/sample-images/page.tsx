import type { Metadata } from "next";
import { SiteNavbar } from "@/components/smartphoto/SiteNavbar";
import { SiteFooter } from "@/components/smartphoto/SiteFooter";
import { PortfolioGallery } from "@/components/smartphoto/PortfolioGallery";
import { CustomCursor } from "@/components/smartphoto/CustomCursor";

export const metadata: Metadata = {
  title: "Sample Images | SmartPHOTOeditors",
  description:
    "Sample images for image clipping, image manipulation, Panorama 360, photo restoration, portrait and real estate imaging services from SmartPHOTOeditors.",
};

export default function SampleImagesRoutePage() {
  return (
    <div className="relative min-h-screen bg-white">
      <CustomCursor />
      <SiteNavbar />
      <main className="main-section">
        <PortfolioGallery />
        <SiteFooter />
      </main>
    </div>
  );
}
