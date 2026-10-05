import type { Metadata } from "next";
import { SiteNavbar } from "@/components/smartphoto/SiteNavbar";
import { SiteFooter } from "@/components/smartphoto/SiteFooter";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";
import { CustomCursor } from "@/components/smartphoto/CustomCursor";

export const metadata: Metadata = {
  title: "360° Virtual Tour & Panorama Stitching Services | SmartPHOTOeditors",
  description:
    "Seamless 360-degree spherical panorama stitching, tripod nadir removal, HDR color balancing for Matterport, Zillow 3D, and Kuula virtual tours.",
};

export default function VirtualToursPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <CustomCursor />
      <SiteNavbar />
      <main className="main-section">
        <SubServiceDetailContent
          categorySlug="real-estate"
          subServiceSlug="360-virtual-tours"
          title="360° Virtual Tour & Panoramas"
          tagline="High-Definition Spherical Panorama Stitching & Nadir Tripod Patching"
          description="Create engaging immersive 3D walkthroughs for potential property buyers. We stitch multiple fisheye bracketed exposures into seamless 360° equirectangular panoramas, removing the tripod shadow and nadir artifacts cleanly."
          features={[
            "360° equirectangular spherical stitching",
            "Nadir cap / tripod shadow removal and floor reconstruction",
            "Window view exposure harmonization across all angles",
            "Hotspot creation and room-to-room navigation setup",
            "Matterport, Zillow 3D, and Kuula ready exports",
            "24-hour turnaround"
          ]}
        />
        <SiteFooter />
      </main>
    </div>
  );
}
