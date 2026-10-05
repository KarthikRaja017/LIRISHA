import type { Metadata } from "next";
import { TestimonialsContent } from "@/components/smartphoto/TestimonialsContent";

export const metadata: Metadata = {
  title: "Client Testimonials & Reviews | SmartPHOTOeditors",
  description:
    "Read real reviews from professional photographers, real estate agencies, and e-commerce brands outsourcing their image post-production to SmartPHOTOeditors.",
};

export default function TestimonialsPage() {
  return <TestimonialsContent />;
}
