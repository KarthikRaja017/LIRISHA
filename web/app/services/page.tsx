import type { Metadata } from "next";
import { ServicesContent } from "@/components/smartphoto/ServicesContent";

export const metadata: Metadata = {
  title: "Professional Image Editing Services | SmartPHOTOeditors",
  description:
    "Explore full-spectrum image editing solutions: Real Estate HDR, Portrait Retouching, Handcrafted Clipping Paths, Fashion Ghost Mannequin, Jewelry Polish, and Photo Restoration.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
