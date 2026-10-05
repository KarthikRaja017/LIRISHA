import type { Metadata } from "next";
import { AboutUsContent } from "@/components/smartphoto/AboutUsContent";

export const metadata: Metadata = {
  title: "About Us | SmartPHOTOeditors",
  description:
    "SmartPHOTOeditors provides value-focused, quality services from a team of skilled Adobe experts who sets the benchmark for image editing solutions",
};

export default function AboutUsPage() {
  return <AboutUsContent />;
}
