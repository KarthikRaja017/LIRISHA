import type { Metadata } from "next";
import { SiteNavbar } from "@/components/smartphoto/SiteNavbar";
import { SiteFooter } from "@/components/smartphoto/SiteFooter";
import { ContactUsContent } from "@/components/smartphoto/ContactUsContent";
import { CustomCursor } from "@/components/smartphoto/CustomCursor";

export const metadata: Metadata = {
  title: "Contact Us | SmartPHOTOeditors",
  description:
    "We look forward to hearing from you on any aspect of our services. Please contact us at any time if you have questions about our company or our services.",
  keywords:
    "image, photo, contact, enhancement, retouching, restoration, real estate, corrections, real, estate, photo editing, image enhancement, services, image clipping, details, color, portrait, manipulation, clipping, enquiry details photo",
};

export default function ContactUsPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <CustomCursor />
      <SiteNavbar />
      <main className="main-section">
        <ContactUsContent />
        <SiteFooter />
      </main>
    </div>
  );
}
