import type { Metadata } from "next";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata: Metadata = {
  title: "Real Estate Photo Corrections & Decluttering | LIRISHA",
  description:
    "Erase distracting personal clutter, cars, cords, garbage cans, and furniture from real estate photos for a clean, spacious presentation.",
};

export default function RealEstatePhotoCorrectionsPage() {
  return (
    <SubServiceDetailContent
      categorySlug="real-estate"
      subServiceSlug="photo-corrections"
      title="Real Estate Photo Corrections & Decluttering"
      tagline="Digital Staging, Item Removal & Architectural Perspective Corrections"
      description="Erase unsightly items that distract potential buyers. We remove refrigerator magnets, pet beds, power cords, driveway cars, trash bins, and wall patches, reconstructing background textures cleanly."
      beforeSrc="https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Deculttering/001-before-525x.webp"
      afterSrc="https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Deculttering/001-after-525x.webp"
      features={[
        "Personal clutter & family photo removal",
        "Driveway vehicle & trash bin erasure",
        "TV screen replacement with scenic imagery",
        "Fireplace fire & flame addition",
        "Wall crack and drywall repair simulation",
        "12-hour turnaround"
      ]}
    />
  );
}
