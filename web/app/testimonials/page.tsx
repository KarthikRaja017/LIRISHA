import type { Metadata } from "next";
import { TestimonialsContent } from "@/components/smartphoto/TestimonialsContent";
import { getTestimonials } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "Client Testimonials & Reviews | SmartPHOTOeditors",
  description:
    "Read real reviews from professional photographers, real estate agencies, and e-commerce brands outsourcing their image post-production to SmartPHOTOeditors.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return <TestimonialsContent initialTestimonials={testimonials} />;
}

