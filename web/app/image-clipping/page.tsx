import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "Image Clipping & Masking Services | SmartPHOTOeditors",
  description:
    "Handcrafted Photoshop Pen Tool clipping path, alpha channel hair masking, transparent background cutouts, and multi-path layer isolation.",
};

export default async function ImageClippingServicePage() {
  const service = await getServiceBySlug("image-clipping");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}

