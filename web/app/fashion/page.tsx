import type { Metadata } from "next";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { servicesData } from "@/lib/servicesData";

export const metadata: Metadata = {
  title: "Fashion & Apparel Photo Editing Services | SmartPHOTOeditors",
  description:
    "Ghost mannequin 3D hollow-man effects, wrinkle removal, colorway swatches, and high-fashion editorial styling.",
};

export default function FashionServicePage() {
  const service = servicesData.find((s) => s.id === "fashion")!;
  return <ServiceDetailContent service={service} />;
}
