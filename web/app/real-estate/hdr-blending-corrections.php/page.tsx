import type { Metadata } from "next";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata: Metadata = {
  title: "Real Estate HDR Blending Corrections | LIRISHA",
  description:
    "Manual multi-exposure HDR blending for interior real estate photography. Window pull exposure masking, flambient blending, and natural lighting harmony.",
};

export default function RealEstateHdrBlendingPage() {
  return (
    <SubServiceDetailContent
      categorySlug="real-estate"
      subServiceSlug="hdr-blending-corrections"
      title="HDR Blending Corrections"
      tagline="Multi-Bracket Exposure Fusion with Window Pull Clarity"
      description="Fuse 3, 5, or 7 bracketed exposures into one naturally balanced image. We blend ambient lighting with flash shots (flambient) and mask outdoor window views perfectly, eliminating harsh flash reflections and dark ceiling shadows."
      beforeSrc="https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-before-525x.webp"
      afterSrc="https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/HDR/001-after-525x.webp"
      features={[
        "Window-pull exposure masking for crisp outdoor views",
        "Color cast neutralization from mixed tungsten & daylight bulbs",
        "Flash reflection removal on wood floors & glass tables",
        "Ceiling shadow brightening and shadow recovery",
        "Vertical line straightening and distortion fix",
        "Overnight batch turnaround"
      ]}
    />
  );
}
