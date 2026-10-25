import type { Metadata } from "next";
import { AboutUsContent } from "@/components/smartphoto/AboutUsContent";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "about-us",
    "About Us | SmartPHOTOeditors",
    "SmartPHOTOeditors provides value-focused, quality services from a team of skilled Adobe experts who sets the benchmark for image editing solutions"
  );
}

export default function AboutUsPage() {
  return <AboutUsContent />;
}
