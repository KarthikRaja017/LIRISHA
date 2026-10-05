import type { Metadata } from "next";
import { ContactUsContent } from "@/components/smartphoto/ContactUsContent";

export const metadata: Metadata = {
  title: "Contact Us | SmartPHOTOeditors",
  description:
    "Get in touch with SmartPHOTOeditors for image editing requests, free sample trials, and custom quote inquiries.",
};

export default function ContactUsPage() {
  return <ContactUsContent />;
}
