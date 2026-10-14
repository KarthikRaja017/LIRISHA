import type { Metadata } from "next";
import { CaseStudyContent } from "@/components/smartphoto/CaseStudyContent";
import { getResources } from "@/lib/api/content";

export const metadata: Metadata = {
  title: "Case Studies & Client Success Stories | SmartPHOTOeditors",
  description:
    "Learn how enterprise clients, creative agencies, and photographers scale image editing production and reduce costs with SmartPHOTOeditors.",
};

export default async function CaseStudyPage() {
  const studies = await getResources("Case Studies");
  return <CaseStudyContent initialCaseStudies={studies} />;
}

