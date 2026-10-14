import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "Fashion & Apparel Photo Editing Services | SmartPHOTOeditors",
  description:
    "Ghost mannequin 3D hollow-man effects, wrinkle removal, colorway swatches, and high-fashion editorial styling.",
};

export default async function FashionServicePage() {
  const service = await getServiceBySlug("fashion");
  if (!service) {
    notFound();
  }
  return <ServiceDetailContent service={service} />;
}

