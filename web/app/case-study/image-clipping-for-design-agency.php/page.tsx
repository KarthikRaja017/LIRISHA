import React from "react";
import { CaseStudyDetailContent } from "@/components/smartphoto/CaseStudyDetailContent";

export const metadata = {
  title: "Case Study: Image Clipping for Atlanta Design Agency | SmartPHOTOeditors",
  description: "Time-critical image clipping and hair masking for an Atlanta advertising agency with overnight delivery.",
};

export default function AgencyCaseStudyPage() {
  return <CaseStudyDetailContent studySlug="image-clipping-for-design-agency" />;
}
