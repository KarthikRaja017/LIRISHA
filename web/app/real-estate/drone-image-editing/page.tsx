import type { Metadata } from "next";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata: Metadata = {
  title: "Aerial Drone Image Editing Services | LIRISHA",
  description:
    "Enhance aerial drone photography: property boundary line drawing, haze removal, lawn enhancement, sky replacement, and color vibrance.",
};

export default function DroneImageEditingPage() {
  return (
    <SubServiceDetailContent
      categorySlug="real-estate"
      subServiceSlug="drone-image-editing"
      title="Drone Aerial Image Editing"
      tagline="Aerial Property Enhancements & Boundary Line Overlays"
      description="Highlight property size, acreage, and neighborhood amenities with polished aerial photography. We remove atmospheric haze, level the horizon, enrich landscape colors, and overlay precise property boundary lines and landmark callouts."
      features={[
        "Atmospheric haze reduction and dynamic range expansion",
        "Custom property boundary line graphic overlays",
        "Neighboring roof and construction debris cleanup",
        "Horizon line leveling and wide-angle lens de-warping",
        "Neighborhood landmark & point-of-interest tagging",
        "12-hour turnaround"
      ]}
    />
  );
}
