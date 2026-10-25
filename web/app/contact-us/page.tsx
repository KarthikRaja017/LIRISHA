import type { Metadata } from "next";
import { ContactUsContent } from "@/components/smartphoto/ContactUsContent";
import { getPageContent } from "@/lib/api/content";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "contact-us",
    "Contact Us | SmartPHOTOeditors",
    "Get in touch with SmartPHOTOeditors for professional image editing requests, free sample trials, and custom quote inquiries."
  );
}

export default async function ContactUsPage() {
  const initialPage = await getPageContent("contact-us");
  return <ContactUsContent initialPage={initialPage} />;
}
