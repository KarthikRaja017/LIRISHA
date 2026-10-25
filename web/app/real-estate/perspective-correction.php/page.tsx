import type { Metadata } from "next";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata: Metadata = {
  title: "Real Estate Perspective Correction Services | LIRISHA",
  description:
    "Fix lens barrel distortion, keystone vertical tilting, and wide-angle convergence in architectural and real estate photography.",
};

export default function PerspectiveCorrectionPage() {
  return (
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
  );
}
