import type { Metadata } from "next";
import { SiteNavbar } from "@/components/smartphoto/SiteNavbar";
import { SiteFooter } from "@/components/smartphoto/SiteFooter";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";
import { CustomCursor } from "@/components/smartphoto/CustomCursor";

export const metadata: Metadata = {
  title: "Real Estate Image Enhancement Services | SmartPHOTOeditors",
  description:
    "Enhance interior and exterior real estate photographs: lawn replacement, window pull clarity, lighting balance, and foliage color enhancement.",
};

export default function RealEstateImageEnhancementPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <CustomCursor />
      <SiteNavbar />
      <main className="main-section">
        <SubServiceDetailContent
          categorySlug="real-estate"
          subServiceSlug="image-enhancement"
          title="Real Estate Image Enhancement"
          tagline="Lawn Greenery Enrichment, Foliage Touch-up & Interior Balancing"
          description="Make property listings stand out with lush, manicured green lawns, vibrant foliage, clear window views, and warm interior ambiance. We turn brown dry grass into green sod, erase ground debris, and harmonize overall lighting."
          beforeSrc="https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Lawn-Replacement/001-before-525x.webp"
          afterSrc="https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Lawn-Replacement/001-after-525x.webp"
          features={[
            "Lawn sod replacement & brown spot removal",
            "Foliage and tree color saturation enhancement",
            "Pool water cleaning & blue reflection enhancement",
            "Driveway and walkway oil stain removal",
            "Sky blue enhancement & cloud definition",
            "12-hour turnaround for MLS publications"
          ]}
        />
        <SiteFooter />
      </main>
    </div>
  );
}
