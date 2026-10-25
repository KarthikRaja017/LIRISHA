import type { Metadata } from "next";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata: Metadata = {
  title: "Real Estate Image Enhancement Services | LIRISHA",
  description:
    "Enhance interior and exterior real estate photographs: lawn enhancement, window pull clarity, lighting balance, and foliage color enhancement.",
};

export default function RealEstateImageEnhancementPage() {
  return (
    <SubServiceDetailContent
      categorySlug="real-estate"
      subServiceSlug="image-enhancement"
      title="Real Estate Image Enhancement"
      tagline="Lawn Enrichment, Foliage Touch-up & Interior Balancing"
      description="Make property listings stand out with lush, manicured lawns, vibrant foliage, clear window views, and warm interior ambiance. We turn brown dry grass into vibrant sod, erase ground debris, and harmonize overall lighting."
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
  );
}
