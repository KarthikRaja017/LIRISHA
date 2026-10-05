import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "360° Panorama Photo Stitching Services | SmartPHOTOeditors",
  description: "High-resolution 360-degree spherical panorama stitching, nadir tripod removal, and HDR color balancing for real estate and hospitality.",
};

export default function Panorama360Page() {
  return (
    <SubServiceDetailContent
      categorySlug="real-estate"
      subServiceSlug="virtual-tours"
      title="360° Panorama Stitching Services"
      tagline="Seamless Spherical Panorama Stitching, Nadir Tripod Removal & Flawless 360° VR Experiences"
      description="Create immersive, interactive virtual property tours. We stitch multi-bracketed fisheye exposures into seamless equirectangular and spherical panoramas, erasing tripods, balancing exposure transitions, and optimizing for web VR players."
      features={[
        "Fisheye bracketed spherical panorama stitching",
        "Nadir cap & tripod shadow erasure",
        "Window glare and interior/exterior HDR balancing",
        "Equirectangular 2:1 ratio for Google Street View & Matterport",
        "HTML5 / WebGL interactive tour optimization",
        "Color temperature and seam blending"
      ]}
    />
  );
}
