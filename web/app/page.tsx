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

export default function HomePage() {
  return (
    <>
      {/* Global Scroll Fade-in Trigger */}
      <FadeInObserver />

      {/* Hero Swiper Slider with Ken Burns Effect */}
      <HeroSlider />

      {/* Counter Stats Section */}
      <CounterSection />

      {/* About SmartPHOTOeditors Intro */}
      <AboutSection />

      {/* Video Showcase Section */}
      <VideoSection />

      {/* Get Started Quick Action Bar */}
      <GetStartedCTA />

      {/* GSAP ScrollTrigger Pinned Overlapping Services Cards */}
      <ServicesScroll />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Case Studies / Success Stories Section */}
      <CaseStudySection />

      {/* FAQ Accordion Section */}
      <FAQSection />

      {/* Animated Clouds Enquiry Form Section */}
      <EnquiryForm />
    </>
  );
}
