import type { Metadata } from "next";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { servicesData } from "@/lib/servicesData";

export const metadata: Metadata = {
  title: "Antique & Damaged Photo Restoration Services | SmartPHOTOeditors",
  description:
    "Digital restoration for damaged, torn, faded vintage photographs and authentic period-accurate black and white colorization.",
};

export default function PhotoRestorationServicePage() {
  const service = servicesData.find((s) => s.id === "photo-restoration")!;
  return <ServiceDetailContent service={service} />;
}
