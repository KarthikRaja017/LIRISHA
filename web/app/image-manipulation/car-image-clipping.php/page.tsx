import type { Metadata } from "next";
import { SiteNavbar } from "@/components/smartphoto/SiteNavbar";
import { SiteFooter } from "@/components/smartphoto/SiteFooter";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";
import { CustomCursor } from "@/components/smartphoto/CustomCursor";

export const metadata: Metadata = {
  title: "Automotive Car Image Clipping Services | SmartPHOTOeditors",
  description:
    "Professional car clipping paths, digital showroom background replacements, window tint adjustments, and wheel spoke cutouts for automotive dealerships.",
};

export default function CarImageClippingPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <CustomCursor />
      <SiteNavbar />
      <main className="main-section">
        <SubServiceDetailContent
          categorySlug="image-clipping"
          subServiceSlug="car-image-clipping"
          title="Automotive Car Image Clipping"
          tagline="Pixel-Perfect Vehicle Cutouts & Modern Showroom Background Replacement"
          description="Transform cluttered dealership lot photos into sleek, showroom-standard marketing assets. We cut out vehicle perimeters by hand, preserve window glass transparency, clean interior views, and add realistic floor reflections."
          features={[
            "Handcrafted Pen Tool perimeters around body and tires",
            "Complex cutouts through alloy wheel spokes",
            "Window glass transparency and reflection leveling",
            "Custom 3D dealer showroom backdrop integration",
            "Floor shadow and glossy ground reflections",
            "High-volume 48h delivery capability"
          ]}
        />
        <SiteFooter />
      </main>
    </div>
  );
}
