import type { Metadata } from "next";
import { ServiceDetailContent } from "@/components/smartphoto/ServiceDetailContent";
import { servicesData } from "@/lib/servicesData";

export const metadata: Metadata = {
  title: "Jewelry Photo Retouching Services | SmartPHOTOeditors",
  description:
    "Extreme macro retouching for diamonds, gemstones, precious metals, watches, rings, and necklaces.",
};

export default function JewelryServicePage() {
  const service = servicesData.find((s) => s.id === "jewelry")!;
  return <ServiceDetailContent service={service} />;
}
