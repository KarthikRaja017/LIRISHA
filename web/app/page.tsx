import React from "react";
import type { Metadata } from "next";
import { HeroSlider } from "@/components/smartphoto/HeroSlider";
import { CounterSection } from "@/components/smartphoto/CounterSection";
import { AboutSection } from "@/components/smartphoto/AboutSection";
import { VideoSection } from "@/components/smartphoto/VideoSection";
import { GetStartedCTA } from "@/components/smartphoto/GetStartedCTA";
import { ServicesScroll } from "@/components/smartphoto/ServicesScroll";
import { TestimonialsSection } from "@/components/smartphoto/TestimonialsSection";
import { CaseStudySection } from "@/components/smartphoto/CaseStudySection";
import { FAQSection } from "@/components/smartphoto/FAQSection";
import { EnquiryForm } from "@/components/smartphoto/EnquiryForm";
import { FadeInObserver } from "@/components/smartphoto/FadeInObserver";
import { getPageContent } from "@/lib/api/content";
import { getDynamicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicPageMetadata(
    "home",
    "Outsource Photo Editing Services Company | LIRISHA",
    "LIRISHA is a premier ISO-certified photo editing outsourcing company providing clipping path, portrait retouching, real estate photo editing, and 360 panorama services with 12-24 hr turnaround."
  );
}

export default async function HomePage() {
  const pageData = await getPageContent("home");

  // Extract dynamic sections
  const heroSlides = (pageData?.hero as any)?.slides;
  const countersSection = pageData?.sections?.find((s: any) => s.type === "counters");
  const aboutSection = pageData?.sections?.find((s: any) => s.type === "about_intro");
  const videoSection = pageData?.sections?.find((s: any) => s.type === "video_showcase");
  const ctaSection = pageData?.sections?.find((s: any) => s.type === "get_started_cta");
  const servicesScrollSection = pageData?.sections?.find((s: any) => s.type === "services_showcase");
  const homeTestimonialsSection = pageData?.sections?.find((s: any) => s.type === "home_testimonials");
  const caseStudiesSection = pageData?.sections?.find((s: any) => s.type === "case_studies" || s.type === "success_stories");
  const faqSection = pageData?.sections?.find((s: any) => s.type === "faqs");
  const enquirySection = pageData?.sections?.find((s: any) => s.type === "enquiry_form");

  return (
    <>
      {/* Global Scroll Fade-in Trigger */}
      <FadeInObserver />

      {/* Hero Swiper Slider with Ken Burns Effect */}
      <HeroSlider initialSlides={heroSlides} />

      {/* Counter Stats Section */}
      <CounterSection initialStats={countersSection?.items} />

      {/* About SmartPHOTOeditors Intro */}
      <AboutSection initialData={aboutSection as any} />

      {/* Video Showcase Section */}
      <VideoSection initialData={videoSection as any} />

      {/* Get Started Quick Action Bar */}
      <GetStartedCTA initialData={ctaSection as any} />

      {/* GSAP ScrollTrigger Pinned Overlapping Services Cards */}
      <ServicesScroll initialData={servicesScrollSection as any} />

      {/* Testimonials Section */}
      <TestimonialsSection initialData={homeTestimonialsSection as any} />

      {/* Case Studies / Success Stories Section */}
      <CaseStudySection initialData={caseStudiesSection as any} />

      {/* FAQ Accordion Section */}
      <FAQSection initialFaqs={faqSection?.items} heading={faqSection?.heading} />

      {/* Animated Clouds Enquiry Form Section */}
      <EnquiryForm initialData={enquirySection as any} />
    </>
  );
}
