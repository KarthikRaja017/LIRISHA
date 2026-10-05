import type { Metadata } from "next";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { servicesData } from "@/lib/servicesData";

export const metadata: Metadata = {
  title: "Image Clipping & Masking Services | SmartPHOTOeditors",
  description:
    "Handcrafted Photoshop Pen Tool clipping path, alpha channel hair masking, transparent background cutouts, and multi-path layer isolation.",
};

export default function ImageClippingServicePage() {
  const service = servicesData.find((s) => s.id === "image-clipping")!;
  return <ServiceDetailContent service={service} />;
}
