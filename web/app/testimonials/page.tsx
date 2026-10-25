import type { Metadata } from "next";
import { TestimonialsContent } from "@/components/smartphoto/TestimonialsContent";
import { getTestimonials } from "@/lib/api/content";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "testimonials",
    "Client Testimonials & Reviews | LIRISHA",
    "Read real reviews from professional photographers, real estate agencies, and e-commerce brands outsourcing their image post-production to LIRISHA."
  );
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return <TestimonialsContent initialTestimonials={testimonials} />;
}
