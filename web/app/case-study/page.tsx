import type { Metadata } from "next";
import { CaseStudyContent } from "@/components/smartphoto/CaseStudyContent";
import { getResources } from "@/lib/api/content";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "case-study",
    "Case Studies & Client Success Stories | LIRISHA",
    "Learn how enterprise clients, creative agencies, and photographers scale image editing production and reduce costs with LIRISHA."
  );
}

export default async function CaseStudyPage() {
  const studies = await getResources("Case Studies");
  return <CaseStudyContent initialCaseStudies={studies} />;
}
