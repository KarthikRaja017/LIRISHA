import React from "react";
import { FeaturePageContent } from "@/components/smartphoto/FeaturePageContent";

export const metadata = {
  title: "Data Security & Confidentiality Policy | SmartPHOTOeditors",
  description: "Enterprise data security, NDA confidentiality, and secure 256-bit SSL encrypted file transfers at SmartPHOTOeditors.",
};

export default function SecurityPage() {
  return <FeaturePageContent pageType="security" />;
}
