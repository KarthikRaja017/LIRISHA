import type { Metadata } from "next";
import { SiteNavbar } from "@/components/smartphoto/SiteNavbar";
import { SiteFooter } from "@/components/smartphoto/SiteFooter";
import { AboutUsContent } from "@/components/smartphoto/AboutUsContent";
import { CustomCursor } from "@/components/smartphoto/CustomCursor";

export const metadata: Metadata = {
  title: "About Us | SmartPHOTOeditors",
  description:
    "SmartPHOTOeditors provides value-focused, quality services from a team of skilled Adobe experts who sets the benchmark for image editing solutions",
};

export default function AboutUsPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <CustomCursor />
      <SiteNavbar />
      <main className="main-section">
        <AboutUsContent />
        <SiteFooter />
      </main>
    </div>
  );
}
