import React from "react";
import { SiteNavbar } from "@/components/smartphoto/SiteNavbar";
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
import { SiteFooter } from "@/components/smartphoto/SiteFooter";
import { CustomCursor } from "@/components/smartphoto/CustomCursor";
import { FadeInObserver } from "@/components/smartphoto/FadeInObserver";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Magic Cursor */}
      <CustomCursor />

      {/* Global Scroll Fade-in Trigger */}
      <FadeInObserver />

      {/* Navbar Header */}
      <SiteNavbar />

      {/* Main Content Sections */}
      <main className="main-section">
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

        {/* Comprehensive 4-Column Footer */}
        <SiteFooter />
      </main>
    </div>
  );
}
