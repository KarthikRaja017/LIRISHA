import React from "react";
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

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const pageData = await getPageContent("home");

  // Extract dynamic sections
  const heroSlides = (pageData?.hero as any)?.slides;
  const countersSection = pageData?.sections?.find((s: any) => s.type === "counters");
  const aboutSection = pageData?.sections?.find((s: any) => s.type === "about_intro");
  const videoSection = pageData?.sections?.find((s: any) => s.type === "video_showcase");
  const ctaSection = pageData?.sections?.find((s: any) => s.type === "get_started_cta");
  const faqSection = pageData?.sections?.find((s: any) => s.type === "faqs");

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
      <ServicesScroll />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Case Studies / Success Stories Section */}
      <CaseStudySection />

      {/* FAQ Accordion Section */}
      <FAQSection initialFaqs={faqSection?.items} heading={faqSection?.heading} />

      {/* Animated Clouds Enquiry Form Section */}
      <EnquiryForm />
    </>
  );
}
