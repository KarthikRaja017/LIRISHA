import type { Metadata } from "next";
import { SiteNavbar } from "@/components/smartphoto/SiteNavbar";
import { SiteFooter } from "@/components/smartphoto/SiteFooter";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";
import { CustomCursor } from "@/components/smartphoto/CustomCursor";

export const metadata: Metadata = {
  title: "Real Estate Perspective Correction Services | SmartPHOTOeditors",
  description:
    "Fix lens barrel distortion, keystone vertical tilting, and wide-angle convergence in architectural and real estate photography.",
};

export default function PerspectiveCorrectionPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <CustomCursor />
      <SiteNavbar />
      <main className="main-section">
        <SubServiceDetailContent
          categorySlug="real-estate"
          subServiceSlug="perspective-correction"
          title="Perspective Corrections"
          tagline="True Vertical Alignment & Wide-Angle Lens Distortion Correction"
          description="Straighten converging vertical lines caused by wide-angle lenses and camera tilting. We ensure walls, door frames, and high-rise facades stand perpendicular while correcting barrel and pincushion optical distortion."
          features={[
            "2-point and 3-point perspective alignment",
            "Wide-angle edge stretch correction",
            "Doorway and column vertical straightening",
            "Horizon leveling for exterior and oceanfront listings",
            "Natural aspect ratio preservation",
            "12-hour turnaround"
          ]}
        />
        <SiteFooter />
      </main>
    </div>
  );
}
