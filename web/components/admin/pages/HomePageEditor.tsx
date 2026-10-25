"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageContent } from "@/types/content";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";
import { BrandLoader } from "@/components/ui/BrandLoader";

interface HomePageEditorProps {
  page?: PageContent;
  onSave: (updatedPage: PageContent) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const HomePageEditor: React.FC<HomePageEditorProps> = ({
  page,
  onSave,
  showToast,
}) => {
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "seo" | "hero" | "counters" | "about" | "video" | "cta" | "services_showcase" | "home_testimonials" | "case_studies" | "faqs" | "enquiry_form"
  >("hero");

  // Local state initialized with fallback defaults matching the live site
  const [pageTitle, setPageTitle] = useState(
    page?.title || "Outsource Photo Editing Services Company | LIRISHA"
  );
  const [metaDescription, setMetaDescription] = useState(
    page?.metaDescription ||
      "LIRISHA is a premier ISO-certified photo editing outsourcing company providing clipping path, portrait retouching, real estate photo editing, and 360 panorama services with 12-24 hr turnaround."
  );

  // Hero Slides
  const defaultSlides = [
    {
      id: 1,
      image: "/images/homepage/banner-1.webp",
      category: "Image Editing",
      title: "Professional Image Editing Services",
      description:
        "LIRISHA is a trusted outsource image editing service with over 200 professional editors, serving clients globally since 2010. Its 12-hour delivery and 100% quality output make it a top choice for professional photographers.",
      link: "/photoshop-services/",
      alt: "Image Editing",
    },
    {
      id: 2,
      image: "/images/homepage/banner-2.webp",
      category: "Photo Editing",
      title: "Portrait Photo Editing Services",
      description:
        "Scalable and professional portrait photo editing services that ensure brand consistency across executive and employee profiles.",
      link: "/portrait/",
      alt: "Photo Editing",
    },
    {
      id: 3,
      image: "/images/homepage/banner-3.webp",
      category: "Ecommerce Photo Editing",
      title: "Ecommerce Photo Editing Services",
      description:
        "LIRISHA provides fast, cost-effective E-Commerce Photo Editing Services, specializing in product photo retouching for key markets including the UK, US, and Australia.",
      link: "/image-manipulation/ecommerce-image-editing",
      alt: "Ecommerce Photo Editing",
    },
    {
      id: 4,
      image: "/images/homepage/banner-4.webp",
      category: "Real Estate",
      title: "Sky Replacement Editing Services",
      description:
        "Elevate your visual storytelling by transforming your images into captivating masterpieces.",
      link: "/real-estate/sky-replacement",
      alt: "Real Estate",
    },
    {
      id: 5,
      image: "/images/homepage/banner-5.webp",
      category: "Wedding Editing",
      title: "Wedding Photo Editing Services",
      description: "Impress your clients by quick turnaround time and creativity.",
      link: "/portrait/wedding-photo-editing",
      alt: "Wedding Editing",
    },
  ];

  const [slides, setSlides] = useState<any[]>(
    (page?.hero as any)?.slides || defaultSlides
  );

  // Counters
  const defaultCounters = [
    {
      count: "05+",
      label: "Awards Rewarded",
      icon: "/images/homepage/icon-award.webp",
      alt: "Awards Rewarded Quote",
      iconClass: "award1",
    },
    {
      count: "13+",
      label: "Years of Experience",
      icon: "/images/homepage/icon-experience.webp",
      alt: "Years of Experience Quote",
      iconClass: "",
    },
    {
      count: "1000+",
      label: "Completed Projects",
      icon: "/images/homepage/icon-projects.webp",
      alt: "Completed Projects Quote",
      iconClass: "",
    },
    {
      count: "1300+",
      label: "Happy Clients",
      icon: "/images/homepage/icon-clients.webp",
      alt: "Happy Clients Quote",
      iconClass: "",
    },
  ];

  const countersSection = page?.sections?.find((s: any) => s.type === "counters");
  const [counters, setCounters] = useState<any[]>(
    countersSection?.items || defaultCounters
  );

  // About Section
  const aboutSection = page?.sections?.find((s: any) => s.type === "about_intro");
  const [aboutHeading, setAboutHeading] = useState(
    aboutSection?.heading || "About LIRISHA Image Editing Specialists"
  );
  const [aboutPara1, setAboutPara1] = useState(
    aboutSection?.para1 ||
      "LIRISHA is a team of skilled photo editing specialists with a commitment to providing quality, excellence, and satisfaction. Comprised of experienced artists, LIRISHA dedicates collective knowledge and capabilities towards transforming photos and images while exceeding client expectations."
  );
  const [aboutPara2, setAboutPara2] = useState(
    aboutSection?.para2 ||
      "We observed busy professional photographers and creative studios juggling between projects, and we started offering a dedicated hand to take care of their image post-processing activities."
  );

  // Video Section
  const videoSection = page?.sections?.find((s: any) => s.type === "video_showcase");
  const [videoTitle, setVideoTitle] = useState(
    videoSection?.title || "Watch LIRISHA Showreel"
  );
  const [videoPoster, setVideoPoster] = useState(
    videoSection?.poster || "/images/homepage/image-video-editing.webp"
  );
  const [videoSrc, setVideoSrc] = useState(
    videoSection?.videoSrc || "/images/spe_Showreel_2024.mp4"
  );

  // CTA Section
  const ctaSection = page?.sections?.find((s: any) => s.type === "get_started_cta");
  const [ctaTitle, setCtaTitle] = useState(ctaSection?.title || "Get Start Now!");
  const [ctaEmail, setCtaEmail] = useState(
    ctaSection?.email || "info@lirisha.com"
  );
  const [ctaPhone, setCtaPhone] = useState(ctaSection?.phone || "18557291549");
  const [ctaLink, setCtaLink] = useState(
    ctaSection?.contactLink || "/contact-us"
  );

  // FAQ Section
  const faqSection = page?.sections?.find((s: any) => s.type === "faqs");
  const defaultFaqs = [
    {
      question: "Which image editing providers offer free trials or sample edits?",
      answer:
        "Reputable providers offer free sample edits to demonstrate quality, consistency, and turnaround before onboarding high-volume or long-term image editing projects.",
    },
    {
      question: "Do you offer bulk photo editing discounts for high-volume orders?",
      answer:
        "Yes. Bulk pricing is available based on volume, complexity, and turnaround, helping ecommerce teams reduce per-image costs at scale.",
    },
    {
      question:
        "Can you edit product photos to meet Amazon, Shopify, eBay, Etsy, Walmart & Marketplace requirements for sellers?",
      answer:
        "Yes. We align images with platform guidelines, including background, size, resolution, and formatting, to ensure compliance across major ecommerce marketplaces.",
    },
    {
      question:
        "Can your image editing service handle 500+ product photos per week for a U.S.-based ecommerce store?",
      answer:
        "Yes. Our teams handle high-volume workflows with consistent quality, meeting weekly delivery targets through scalable production and dedicated resource allocation.",
    },
    {
      question:
        "What file formats do you accept and return — can you work with RAW, TIFF, PSD, and JPEG files?",
      answer:
        "We accept RAW, TIFF, PSD, and JPEG formats and deliver outputs in required formats, optimized for web, print, or marketplace-specific needs.",
    },
  ];

  const [faqHeading, setFaqHeading] = useState(
    faqSection?.heading || "Frequently Asked Questions"
  );
  const [faqs, setFaqs] = useState<any[]>(faqSection?.items || defaultFaqs);

  // Services Showcase Cards
  const defaultServicesCards = [
    {
      id: 1,
      title: "Furniture Photo Editing",
      link: "/virtual-staging/furniture-photo-editing",
      image: "/images/homepage/furniture-photo-editing.webp",
      alt: "Furniture Photo Editing Services",
    },
    {
      id: 2,
      title: "2D & 3D Floor Plan",
      link: "/real-estate/floor-plan-conversions",
      image: "/images/homepage/2d-3d-floor-plan.webp",
      alt: "2D & 3D Floor Plan Services",
    },
    {
      id: 3,
      title: "Ecommerce Image Editing",
      link: "/image-manipulation/ecommerce-image-editing",
      image: "/images/homepage/ecommerce-image-editing.webp",
      alt: "Ecommerce Image Editing Services",
    },
    {
      id: 4,
      title: "Image Cliping",
      link: "/image-clipping/",
      image: "/images/homepage/image-cliping.webp",
      alt: "Image Cliping Services",
    },
    {
      id: 5,
      title: "Jewelry Image Retouching",
      link: "/jewelry/",
      image: "/images/homepage/jewellery-retouching.webp",
      alt: "Jewelry Image Retouching Services",
    },
    {
      id: 6,
      title: "Real Estate",
      link: "/real-estate/",
      image: "/images/homepage/real-estate.webp",
      alt: "Real Estate Services",
    },
  ];

  const servicesSection = page?.sections?.find((s: any) => s.type === "services_showcase");
  const [servicesHeadingLine1, setServicesHeadingLine1] = useState(
    servicesSection?.headingLine1 || "Our Professional"
  );
  const [servicesHeadingLine2, setServicesHeadingLine2] = useState(
    servicesSection?.headingLine2 || "Image Editing Services"
  );
  const [servicesCards, setServicesCards] = useState<any[]>(
    servicesSection?.items || defaultServicesCards
  );

  // Home Testimonials
  const defaultHomeReviews = [
    {
      id: 1,
      quote:
        "Their edits are always sharp and on point. They really get our style, and their quick responses make the whole process so much easier.",
      authorRole: "Brand Manager",
      authorCompany: "Jewelry Company, UK",
      avatar: "/images/homepage/testi-user1.webp",
      boxStyle: "dark",
    },
    {
      id: 2,
      quote:
        "They always nail the edits, and the results look fantastic. Super easy to work with, and their support feels genuinely helpful — not just professional, but like our extended team.",
      authorRole: "Photography Lead",
      authorCompany: "Interior Design Studio, Australia",
      avatar: "/images/homepage/testi-user2.webp",
      boxStyle: "white",
    },
    {
      id: 3,
      quote:
        "Our visuals turned out way better than we imagined. They're quick with tweaks, really know their stuff, and we genuinely trust them to get it right every time.",
      authorRole: "Digital Marketing Manager",
      authorCompany: "Travel & Hospitality, Singapore",
      avatar: "/images/homepage/testi-user3.webp",
      boxStyle: "dark",
    },
  ];

  const testimonialsSection = page?.sections?.find((s: any) => s.type === "home_testimonials");
  const [testimonialsHeadingLine1, setTestimonialsHeadingLine1] = useState(
    testimonialsSection?.headingLine1 || "Listen to What Our"
  );
  const [testimonialsHeadingLine2, setTestimonialsHeadingLine2] = useState(
    testimonialsSection?.headingLine2 || "Clients Have to Say About Us"
  );
  const [testimonialsCtaText, setTestimonialsCtaText] = useState(
    testimonialsSection?.ctaText || "See More Reviews"
  );
  const [testimonialsCtaLink, setTestimonialsCtaLink] = useState(
    testimonialsSection?.ctaLink || "/testimonials"
  );
  const [homeReviews, setHomeReviews] = useState<any[]>(
    testimonialsSection?.items || defaultHomeReviews
  );

  // Success Stories / Case Studies
  const defaultCaseStudies = [
    {
      id: 1,
      img: "/images/homepage/case-study-1.webp",
      alt: "15K Edited Images Delivered to French Studio as Part of Continuous Engagement Project",
      title:
        "15K Edited Images Delivered to French Studio as Part of Continuous Engagement Project",
      desc: "Established in 2016 and based in Paris, France, the client is a visual content provider for over 500 different brands and businesses boasting more than 500,000 completed photoshoots.",
      link: "/case-study-image-enhancement",
    },
    {
      id: 2,
      img: "/images/homepage/case-study-2.webp",
      alt: "Aerial Videography Company in the UK Outsources Drone Imaging Stitching to SmartPHOTOeditor",
      title:
        "Aerial Videography Company in the UK Outsources Drone Imaging Stitching to SmartPHOTOeditor",
      desc: "The client is a London, UK based specialist in aerial and ground filming and photography. The company has been in the business for over two decades and",
      link: "/panorama360/drone-image",
    },
    {
      id: 3,
      img: "/images/homepage/case-study-3.webp",
      alt: "Image Clipping for a Leading US-Based Tech Firm To Enhance Their Product Catalog",
      title:
        "Image Clipping for a Leading US-Based Tech Firm To Enhance Their Product Catalog",
      desc: "The client is a US-based ITAR-registered technology company that is focused on developing high-performance components used in both commercial and military-grade systems.",
      link: "/image-clipping/case-study-image-clipping-tech-firm",
    },
  ];

  const caseStudiesSection = page?.sections?.find((s: any) => s.type === "case_studies" || s.type === "success_stories");
  const [caseStudiesHeading, setCaseStudiesHeading] = useState(
    caseStudiesSection?.heading || "Photo Editing Success Story"
  );
  const [caseStudies, setCaseStudies] = useState<any[]>(
    caseStudiesSection?.items || defaultCaseStudies
  );

  // Enquiry Form Section
  const enquirySection = page?.sections?.find((s: any) => s.type === "enquiry_form");
  const [enquiryHeading, setEnquiryHeading] = useState(enquirySection?.heading || "Enquiry Now");
  const [enquirySubtitle, setEnquirySubtitle] = useState(
    enquirySection?.subtitle || "Tell us about your image editing requirements."
  );
  const [enquiryButtonText, setEnquiryButtonText] = useState(enquirySection?.buttonText || "Submit");
  const [enquirySuccessHeading, setEnquirySuccessHeading] = useState(
    enquirySection?.successHeading || "Thank You!"
  );
  const [enquirySuccessMessage, setEnquirySuccessMessage] = useState(
    enquirySection?.successMessage ||
      "Your enquiry has been received. Our photo editing specialists will get back to you within 12 hours."
  );

  // Sync state when page prop changes
  useEffect(() => {
    if (page) {
      if (page.title) setPageTitle(page.title);
      if (page.metaDescription) setMetaDescription(page.metaDescription);
      if ((page.hero as any)?.slides) setSlides((page.hero as any).slides);
      const cnt = page.sections?.find((s: any) => s.type === "counters");
      if (cnt?.items) setCounters(cnt.items);
      const abt = page.sections?.find((s: any) => s.type === "about_intro");
      if (abt) {
        if (abt.heading) setAboutHeading(abt.heading);
        if (abt.para1) setAboutPara1(abt.para1);
        if (abt.para2) setAboutPara2(abt.para2);
      }
      const vid = page.sections?.find((s: any) => s.type === "video_showcase");
      if (vid) {
        if (vid.title) setVideoTitle(vid.title);
        if (vid.poster) setVideoPoster(vid.poster);
        if (vid.videoSrc) setVideoSrc(vid.videoSrc);
      }
      const cta = page.sections?.find((s: any) => s.type === "get_started_cta");
      if (cta) {
        if (cta.title) setCtaTitle(cta.title);
        if (cta.email) setCtaEmail(cta.email);
        if (cta.phone) setCtaPhone(cta.phone);
        if (cta.contactLink) setCtaLink(cta.contactLink);
      }
      const f = page.sections?.find((s: any) => s.type === "faqs");
      if (f) {
        if (f.heading) setFaqHeading(f.heading);
        if (f.items) setFaqs(f.items);
      }
      const srv = page.sections?.find((s: any) => s.type === "services_showcase");
      if (srv) {
        if (srv.headingLine1) setServicesHeadingLine1(srv.headingLine1);
        if (srv.headingLine2) setServicesHeadingLine2(srv.headingLine2);
        if (srv.items) setServicesCards(srv.items);
      }
      const tst = page.sections?.find((s: any) => s.type === "home_testimonials");
      if (tst) {
        if (tst.headingLine1) setTestimonialsHeadingLine1(tst.headingLine1);
        if (tst.headingLine2) setTestimonialsHeadingLine2(tst.headingLine2);
        if (tst.ctaText) setTestimonialsCtaText(tst.ctaText);
        if (tst.ctaLink) setTestimonialsCtaLink(tst.ctaLink);
        if (tst.items) setHomeReviews(tst.items);
      }
      const cs = page.sections?.find((s: any) => s.type === "case_studies" || s.type === "success_stories");
      if (cs) {
        if (cs.heading) setCaseStudiesHeading(cs.heading);
        if (cs.items) setCaseStudies(cs.items);
      }

      const enq = page.sections?.find((s: any) => s.type === "enquiry_form");
      if (enq) {
        if (enq.heading) setEnquiryHeading(enq.heading);
        if (enq.subtitle) setEnquirySubtitle(enq.subtitle);
        if (enq.buttonText) setEnquiryButtonText(enq.buttonText);
        if (enq.successHeading) setEnquirySuccessHeading(enq.successHeading);
        if (enq.successMessage) setEnquirySuccessMessage(enq.successMessage);
      }
    }
  }, [page]);

  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload: PageContent = {
        slug: "home",
        title: pageTitle,
        metaDescription: metaDescription,
        hero: {
          title: pageTitle,
          slides: slides,
        } as any,
        sections: [
          {
            type: "counters",
            title: "Counters & Stats",
            items: counters,
          },
          {
            type: "about_intro",
            heading: aboutHeading,
            para1: aboutPara1,
            para2: aboutPara2,
          },
          {
            type: "video_showcase",
            title: videoTitle,
            poster: videoPoster,
            videoSrc: videoSrc,
          },
          {
            type: "get_started_cta",
            title: ctaTitle,
            contactLink: ctaLink,
            email: ctaEmail,
            phone: ctaPhone,
          },
          {
            type: "services_showcase",
            headingLine1: servicesHeadingLine1,
            headingLine2: servicesHeadingLine2,
            items: servicesCards,
          },
          {
            type: "home_testimonials",
            headingLine1: testimonialsHeadingLine1,
            headingLine2: testimonialsHeadingLine2,
            ctaText: testimonialsCtaText,
            ctaLink: testimonialsCtaLink,
            items: homeReviews,
          },
          {
            type: "case_studies",
            heading: caseStudiesHeading,
            items: caseStudies,
          },
          {
            type: "faqs",
            heading: faqHeading,
            items: faqs,
          },
          {
            type: "enquiry_form",
            heading: enquiryHeading,
            subtitle: enquirySubtitle,
            buttonText: enquiryButtonText,
            successHeading: enquirySuccessHeading,
            successMessage: enquirySuccessMessage,
          },
        ],
      };

      await onSave(payload);
      showToast("Home Page published & saved to PostgreSQL successfully!");
    } catch (err: any) {
      showToast(err.message || "Failed to save Home Page", "error");
    } finally {
      setSaving(false);
    }
  };

  if (!page) {
    return (
      <div className="py-24 flex items-center justify-center">
        <BrandLoader
          size="lg"
          message="Loading Home Page Configuration..."
          subMessage="Fetching dynamic sections from database"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Page Header & Action Controls */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ff5b0a] to-orange-400 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-house"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">Home Page Studio</h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-orange-100 text-[#ff5b0a] font-bold whitespace-nowrap shrink-0">
                Route: /
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Full control of Home page slides, statistics, about story, video showcase, CTA bar, and FAQs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[#ff5b0a]"></i>
            <span>View Live Home Page</span>
          </Link>
          <button
            type="button"
            onClick={() => handleSaveAll()}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
          >
            <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
            <span>{saving ? "Saving Changes..." : "Save Home Page"}</span>
          </button>
        </div>
      </div>

      {/* Section Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {[
          { id: "hero", label: `Hero Slider (${slides.length})`, icon: "fa-images" },
          { id: "counters", label: `Stats Counters (${counters.length})`, icon: "fa-calculator" },
          { id: "about", label: "About SPE Intro", icon: "fa-book-open" },
          { id: "video", label: "Video Showcase", icon: "fa-film" },
          { id: "cta", label: "Get Started Bar", icon: "fa-bolt" },
          { id: "services_showcase", label: `Services Cards (${servicesCards.length})`, icon: "fa-wand-magic-sparkles" },
          { id: "home_testimonials", label: `Reviews (${homeReviews.length})`, icon: "fa-comments" },
          { id: "case_studies", label: `Success Stories (${caseStudies.length})`, icon: "fa-trophy" },
          { id: "faqs", label: `FAQs (${faqs.length})`, icon: "fa-circle-question" },
          { id: "enquiry_form", label: "Enquiry Form", icon: "fa-envelope-open-text" },
          { id: "seo", label: "SEO & Meta Tags", icon: "fa-magnifying-glass" },
        ].map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? "bg-[#1c2a5a] text-white shadow-md shadow-blue-950/20"
                  : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm"
              }`}
            >
              <i className={`fa-solid ${tab.icon} ${isActive ? "text-[#ff5b0a]" : "text-slate-400"}`}></i>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. HERO SLIDER TAB */}
      {activeSection === "hero" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-images"></i>
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Hero Carousel Slides
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {slides.length} slides active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Manage all slides featured on the primary Home Page slider with high-res images, headlines, and call-to-actions.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newSlide = {
                  id: Date.now(),
                  image: "/images/homepage/banner-1.webp",
                  category: "New Service",
                  title: "New Headline Title",
                  description: "Describe the benefits and turnaround times of this service.",
                  link: "/services",
                  alt: "Image Editing",
                };
                setSlides([...slides, newSlide]);
                showToast("New slide added! Remember to save changes.");
              }}
              className="px-4 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add New Slide</span>
            </button>
          </div>

          <div className="space-y-6">
            {slides.map((slide, idx) => (
              <div
                key={slide.id || idx}
                className="p-5 sm:p-6 border border-slate-200 rounded-2xl bg-slate-50/70 hover:border-orange-300 hover:bg-slate-50 transition-all space-y-5 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5 flex-wrap min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-[#ff5b0a] text-white flex items-center justify-center text-xs font-black shadow-sm shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-extrabold text-sm text-slate-900 truncate">
                      {slide.title || `Slide #${idx + 1}`}
                    </span>
                    <span className="text-[11px] bg-white border border-slate-200 px-2.5 py-0.5 rounded-full text-slate-700 font-bold shadow-xs whitespace-nowrap shrink-0">
                      {slide.category || "Uncategorized"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...slides];
                          const temp = updated[idx];
                          updated[idx] = updated[idx - 1];
                          updated[idx - 1] = temp;
                          setSlides(updated);
                        }}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center text-xs shadow-xs transition-all shrink-0"
                        title="Move Up"
                      >
                        <i className="fa-solid fa-arrow-up"></i>
                      </button>
                    )}
                    {idx < slides.length - 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...slides];
                          const temp = updated[idx];
                          updated[idx] = updated[idx + 1];
                          updated[idx + 1] = temp;
                          setSlides(updated);
                        }}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center text-xs shadow-xs transition-all shrink-0"
                        title="Move Down"
                      >
                        <i className="fa-solid fa-arrow-down"></i>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (slides.length <= 1) {
                          showToast("At least one slide is required", "error");
                          return;
                        }
                        setSlides(slides.filter((_, i) => i !== idx));
                      }}
                      className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 flex items-center justify-center text-xs ml-1 shadow-xs transition-all shrink-0"
                      title="Remove Slide"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  {/* Left Column: Image Preview & Upload */}
                  <div className="md:col-span-5 xl:col-span-4 space-y-3.5">
                    <div className="w-full aspect-video min-h-[140px] max-h-56 rounded-2xl bg-slate-900 border border-slate-300 overflow-hidden relative group flex items-center justify-center shadow-inner">
                      {slide.image ? (
                        <img
                          src={slide.image}
                          alt={slide.alt || "Hero slide"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">No Image Set</span>
                      )}
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] text-white font-mono">
                        Slide Graphic
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <i className="fa-regular fa-image text-[#ff5b0a]"></i>
                          Slide Image URL
                        </label>
                        <ImageUploadButton
                          folder="homepage"
                          label="Upload Image"
                          currentValue={slide.image}
                          onUploadSuccess={(url) => {
                            const updated = [...slides];
                            updated[idx].image = url;
                            setSlides(updated);
                            showToast("Slide image uploaded!");
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        value={slide.image}
                        onChange={(e) => {
                          const updated = [...slides];
                          updated[idx].image = e.target.value;
                          setSlides(updated);
                        }}
                        className="w-full px-3.5 py-2.5 text-xs bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                        placeholder="/images/homepage/banner-1.webp"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                        <i className="fa-solid fa-font text-blue-500"></i>
                        Alt Text
                      </label>
                      <input
                        type="text"
                        value={slide.alt || ""}
                        onChange={(e) => {
                          const updated = [...slides];
                          updated[idx].alt = e.target.value;
                          setSlides(updated);
                        }}
                        className="w-full px-3.5 py-2 text-xs bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                        placeholder="Image description"
                      />
                    </div>
                  </div>

                  {/* Right Column: Slide Text Details */}
                  <div className="md:col-span-7 xl:col-span-8 space-y-3.5 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-bold text-slate-800 mb-1.5">
                          <i className="fa-solid fa-tag text-purple-500 mr-1.5"></i>
                          Category Badge / Subtitle
                        </label>
                        <input
                          type="text"
                          value={slide.category}
                          onChange={(e) => {
                            const updated = [...slides];
                            updated[idx].category = e.target.value;
                            setSlides(updated);
                          }}
                          className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                          placeholder="e.g. Portrait Photo Editing"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-800 mb-1.5">
                          <i className="fa-solid fa-link text-emerald-500 mr-1.5"></i>
                          CTA Button Target Link
                        </label>
                        <input
                          type="text"
                          value={slide.link}
                          onChange={(e) => {
                            const updated = [...slides];
                            updated[idx].link = e.target.value;
                            setSlides(updated);
                          }}
                          className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                          placeholder="e.g. /portrait/"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-800 mb-1.5">
                        <i className="fa-solid fa-heading text-[#ff5b0a] mr-1.5"></i>
                        Main Headline / Title
                      </label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => {
                          const updated = [...slides];
                          updated[idx].title = e.target.value;
                          setSlides(updated);
                        }}
                        className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                        placeholder="e.g. Professional Image Editing Services"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-800 mb-1.5">
                        <i className="fa-regular fa-comment-dots text-indigo-500 mr-1.5"></i>
                        Slide Description / Marketing Copy
                      </label>
                      <textarea
                        rows={3}
                        value={slide.description}
                        onChange={(e) => {
                          const updated = [...slides];
                          updated[idx].description = e.target.value;
                          setSlides(updated);
                        }}
                        className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
                        placeholder="Detailed value proposition..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. STATS & COUNTERS TAB */}
      {activeSection === "counters" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-calculator"></i>
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                Homepage Statistics Counter Bar
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Edit the 4 primary milestone counters displayed directly beneath the hero slider.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {counters.map((c, idx) => (
              <div
                key={idx}
                className="p-5 border border-slate-200 rounded-2xl bg-slate-50/70 hover:border-orange-300 hover:bg-slate-50 transition-all space-y-3.5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-700 uppercase tracking-wide">
                    Counter #{idx + 1}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-orange-100/80 border border-orange-200 flex items-center justify-center p-2 overflow-hidden shadow-xs">
                    {c.icon ? (
                      <img src={c.icon} alt={c.alt || "icon"} className="max-h-full max-w-full object-contain" />
                    ) : (
                      <i className="fa-solid fa-star text-[#ff5b0a]"></i>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Metric Number</label>
                  <input
                    type="text"
                    value={c.count}
                    onChange={(e) => {
                      const updated = [...counters];
                      updated[idx].count = e.target.value;
                      setCounters(updated);
                    }}
                    className="w-full px-3 py-2 text-base font-black bg-white text-slate-900 border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                    placeholder="e.g. 15+"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Label / Title</label>
                  <input
                    type="text"
                    value={c.label}
                    onChange={(e) => {
                      const updated = [...counters];
                      updated[idx].label = e.target.value;
                      setCounters(updated);
                    }}
                    className="w-full px-3 py-2 text-xs font-semibold bg-white text-slate-900 border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                    placeholder="e.g. Years of Experience"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold text-slate-800">Icon URL</label>
                    <ImageUploadButton
                      folder="homepage"
                      label="Upload"
                      currentValue={c.icon}
                      onUploadSuccess={(url) => {
                        const updated = [...counters];
                        updated[idx].icon = url;
                        setCounters(updated);
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    value={c.icon}
                    onChange={(e) => {
                      const updated = [...counters];
                      updated[idx].icon = e.target.value;
                      setCounters(updated);
                    }}
                    className="w-full px-3 py-2 text-xs font-semibold bg-white text-slate-900 border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                    placeholder="/images/homepage/icon.webp"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. ABOUT SPE INTRO TAB */}
      {activeSection === "about" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-book-open"></i>
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                About SmartPHOTOeditors Intro Section
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Edit the introduction section with 2-column company narrative on the Home Page.
            </p>
          </div>

          <div className="space-y-5 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Section Main Heading (H1)</label>
              <input
                type="text"
                value={aboutHeading}
                onChange={(e) => setAboutHeading(e.target.value)}
                className="w-full px-3.5 py-3 bg-white text-slate-900 font-bold text-sm border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                placeholder="About SmartPHOTOeditors Image Editing specialists"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Left Column Paragraph</label>
                <textarea
                  rows={6}
                  value={aboutPara1}
                  onChange={(e) => setAboutPara1(e.target.value)}
                  className="w-full px-3.5 py-3 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
                  placeholder="First paragraph..."
                />
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Right Column Paragraph</label>
                <textarea
                  rows={6}
                  value={aboutPara2}
                  onChange={(e) => setAboutPara2(e.target.value)}
                  className="w-full px-3.5 py-3 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
                  placeholder="Second paragraph..."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. VIDEO SHOWCASE TAB */}
      {activeSection === "video" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-film"></i>
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                Video Showcase Section
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Manage the embedded SPE Showreel video player and poster graphic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Video Title / Alt</label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  placeholder="Watch SPE Showreel"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-800">Poster Thumbnail Image</label>
                  <ImageUploadButton
                    folder="homepage"
                    label="Upload Poster"
                    currentValue={videoPoster}
                    onUploadSuccess={(url) => {
                      setVideoPoster(url);
                      showToast("Poster thumbnail uploaded!");
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={videoPoster}
                  onChange={(e) => setVideoPoster(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  placeholder="/images/homepage/image-video-editing.webp"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">MP4 Video Source URL</label>
                <input
                  type="text"
                  value={videoSrc}
                  onChange={(e) => setVideoSrc(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                  placeholder="/images/spe_Showreel_2024.mp4"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-2">Live Video Preview</label>
              <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-black">
                <video
                  width="100%"
                  poster={videoPoster}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-auto max-h-60 object-cover"
                >
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. GET STARTED BAR TAB */}
      {activeSection === "cta" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-bolt"></i>
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                Get Started Quick Action Bar
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Control the immediate action bar offering Chat, Email, and Call channels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Bar Headline</label>
              <input
                type="text"
                value={ctaTitle}
                onChange={(e) => setCtaTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                placeholder="Get Start Now!"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Contact Us Page Link</label>
              <input
                type="text"
                value={ctaLink}
                onChange={(e) => setCtaLink(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                placeholder="/contact-us"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Support / Inquiries Email</label>
              <input
                type="email"
                value={ctaEmail}
                onChange={(e) => setCtaEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                placeholder="info@smartphotoeditors.com"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Phone Number (Toll-Free)</label>
              <input
                type="text"
                value={ctaPhone}
                onChange={(e) => setCtaPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                placeholder="18557291549"
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. FAQS TAB */}
      {activeSection === "faqs" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-circle-question"></i>
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Frequently Asked Questions (FAQ) Accordion
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Manage the FAQ list displayed near the bottom of the Home Page.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setFaqs([
                  ...faqs,
                  {
                    question: "New Frequently Asked Question?",
                    answer: "Provide a comprehensive, reassuring answer here.",
                  },
                ]);
                showToast("New FAQ added!");
              }}
              className="px-4 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all self-start"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add FAQ Item</span>
            </button>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-800 mb-1.5">FAQ Section Heading</label>
            <input
              type="text"
              value={faqHeading}
              onChange={(e) => setFaqHeading(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
              placeholder="Frequently Asked Questions"
            />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 border border-slate-200 rounded-2xl bg-slate-50/70 hover:border-orange-300 hover:bg-slate-50 transition-all space-y-3.5 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                  <span className="font-extrabold text-xs text-slate-800">FAQ #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                    className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <i className="fa-solid fa-trash-can"></i> Remove
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[idx].question = e.target.value;
                      setFaqs(updated);
                    }}
                    className="w-full px-3.5 py-2.5 text-xs bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                    placeholder="Enter customer question"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Answer</label>
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[idx].answer = e.target.value;
                      setFaqs(updated);
                    }}
                    className="w-full px-3.5 py-2.5 text-xs bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
                    placeholder="Enter answer explanation"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SERVICES SHOWCASE TAB */}
      {activeSection === "services_showcase" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Services Showcase Cards
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {servicesCards.length} cards active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Configure the overlapping pinned scroll cards on the homepage under &quot;Our Professional Image Editing Services&quot;.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newCard = {
                  id: Date.now(),
                  title: "New Editing Service",
                  link: "/services",
                  image: "/images/homepage/furniture-photo-editing.webp",
                  alt: "Editing Service",
                };
                setServicesCards([...servicesCards, newCard]);
                showToast("New service card added!");
              }}
              className="px-4 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add Service Card</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Heading Line 1</label>
              <input
                type="text"
                value={servicesHeadingLine1}
                onChange={(e) => setServicesHeadingLine1(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                placeholder="Our Professional"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Heading Line 2</label>
              <input
                type="text"
                value={servicesHeadingLine2}
                onChange={(e) => setServicesHeadingLine2(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                placeholder="Image Editing Services"
              />
            </div>
          </div>

          <div className="space-y-6">
            {servicesCards.map((card, idx) => (
              <div
                key={card.id || idx}
                className="p-5 sm:p-6 border border-slate-200 rounded-2xl bg-slate-50/70 hover:border-orange-300 hover:bg-slate-50 transition-all space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#ff5b0a] text-white flex items-center justify-center text-xs font-black shadow-sm shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-extrabold text-sm text-slate-900 truncate">
                      {card.title || `Card #${idx + 1}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...servicesCards];
                          const temp = updated[idx];
                          updated[idx] = updated[idx - 1];
                          updated[idx - 1] = temp;
                          setServicesCards(updated);
                        }}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center text-xs shadow-xs transition-all shrink-0"
                        title="Move Up"
                      >
                        <i className="fa-solid fa-arrow-up"></i>
                      </button>
                    )}
                    {idx < servicesCards.length - 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...servicesCards];
                          const temp = updated[idx];
                          updated[idx] = updated[idx + 1];
                          updated[idx + 1] = temp;
                          setServicesCards(updated);
                        }}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center text-xs shadow-xs transition-all shrink-0"
                        title="Move Down"
                      >
                        <i className="fa-solid fa-arrow-down"></i>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (servicesCards.length <= 1) {
                          showToast("At least one card is required", "error");
                          return;
                        }
                        setServicesCards(servicesCards.filter((_, i) => i !== idx));
                      }}
                      className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 flex items-center justify-center text-xs ml-1 shadow-xs transition-all shrink-0"
                      title="Remove Card"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  <div className="md:col-span-4 space-y-3">
                    <div className="w-full aspect-video rounded-xl bg-slate-900 border border-slate-300 overflow-hidden relative flex items-center justify-center shadow-inner">
                      {card.image ? (
                        <img src={card.image} alt={card.alt || card.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">No Image</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-800">Card Image URL</label>
                        <ImageUploadButton
                          folder="homepage"
                          label="Upload Image"
                          currentValue={card.image}
                          onUploadSuccess={(url: string) => {
                            const updated = [...servicesCards];
                            updated[idx].image = url;
                            setServicesCards(updated);
                            showToast("Service card image uploaded!");
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        value={card.image}
                        onChange={(e) => {
                          const updated = [...servicesCards];
                          updated[idx].image = e.target.value;
                          setServicesCards(updated);
                        }}
                        className="w-full px-3 py-2 text-xs bg-white text-slate-800 font-mono border border-slate-300 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-8 space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Service Card Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const updated = [...servicesCards];
                          updated[idx].title = e.target.value;
                          setServicesCards(updated);
                        }}
                        className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl outline-none"
                        placeholder="e.g. Furniture Photo Editing"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Target Page Link</label>
                      <input
                        type="text"
                        value={card.link}
                        onChange={(e) => {
                          const updated = [...servicesCards];
                          updated[idx].link = e.target.value;
                          setServicesCards(updated);
                        }}
                        className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl outline-none"
                        placeholder="e.g. /virtual-staging/furniture-photo-editing"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Image Alt Text</label>
                      <input
                        type="text"
                        value={card.alt || ""}
                        onChange={(e) => {
                          const updated = [...servicesCards];
                          updated[idx].alt = e.target.value;
                          setServicesCards(updated);
                        }}
                        className="w-full px-3.5 py-2.5 bg-white text-slate-800 font-medium border border-slate-300 rounded-xl outline-none"
                        placeholder="e.g. Furniture Photo Editing Services"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HOME TESTIMONIALS TAB */}
      {activeSection === "home_testimonials" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-comments"></i>
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Client Testimonials (Homepage)
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {homeReviews.length} reviews active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Configure the client review quotes in the &quot;Listen to What Our Clients Have to Say About Us&quot; section on the homepage.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newRev = {
                  id: Date.now(),
                  quote: "Their team delivers high precision and unmatched consistency.",
                  authorRole: "Studio Producer",
                  authorCompany: "Creative Agency, USA",
                  avatar: "/images/homepage/testi-user1.webp",
                  boxStyle: "dark",
                };
                setHomeReviews([...homeReviews, newRev]);
                showToast("New testimonial added!");
              }}
              className="px-4 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Heading Line 1</label>
              <input
                type="text"
                value={testimonialsHeadingLine1}
                onChange={(e) => setTestimonialsHeadingLine1(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] outline-none"
                placeholder="Listen to What Our"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Heading Line 2</label>
              <input
                type="text"
                value={testimonialsHeadingLine2}
                onChange={(e) => setTestimonialsHeadingLine2(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] outline-none"
                placeholder="Clients Have to Say About Us"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">CTA Button Text</label>
              <input
                type="text"
                value={testimonialsCtaText}
                onChange={(e) => setTestimonialsCtaText(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] outline-none"
                placeholder="See More Reviews"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">CTA Button Link</label>
              <input
                type="text"
                value={testimonialsCtaLink}
                onChange={(e) => setTestimonialsCtaLink(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl focus:border-[#ff5b0a] outline-none"
                placeholder="/testimonials"
              />
            </div>
          </div>

          <div className="space-y-6">
            {homeReviews.map((rev, idx) => (
              <div
                key={rev.id || idx}
                className="p-5 sm:p-6 border border-slate-200 rounded-2xl bg-slate-50/70 hover:border-orange-300 hover:bg-slate-50 transition-all space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#ff5b0a] text-white flex items-center justify-center text-xs font-black shadow-sm shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-extrabold text-sm text-slate-900 truncate">
                      {rev.authorRole} • {rev.authorCompany}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        if (homeReviews.length <= 1) {
                          showToast("At least one review is required", "error");
                          return;
                        }
                        setHomeReviews(homeReviews.filter((_, i) => i !== idx));
                      }}
                      className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 flex items-center justify-center text-xs ml-1 shadow-xs transition-all shrink-0"
                      title="Remove Review"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  <div className="md:col-span-3 space-y-3">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-200 border border-slate-300 mx-auto flex items-center justify-center shadow-inner">
                      {rev.avatar ? (
                        <img src={rev.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <i className="fa-regular fa-user text-2xl text-slate-400"></i>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-800">Avatar Image</label>
                        <ImageUploadButton
                          folder="homepage"
                          label="Upload Avatar"
                          currentValue={rev.avatar}
                          onUploadSuccess={(url: string) => {
                            const updated = [...homeReviews];
                            updated[idx].avatar = url;
                            setHomeReviews(updated);
                            showToast("Avatar uploaded!");
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        value={rev.avatar}
                        onChange={(e) => {
                          const updated = [...homeReviews];
                          updated[idx].avatar = e.target.value;
                          setHomeReviews(updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs bg-white text-slate-800 font-mono border border-slate-300 rounded-lg outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Card Box Style</label>
                      <select
                        value={rev.boxStyle || "dark"}
                        onChange={(e) => {
                          const updated = [...homeReviews];
                          updated[idx].boxStyle = e.target.value;
                          setHomeReviews(updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs bg-white text-slate-900 font-semibold border border-slate-300 rounded-lg outline-none cursor-pointer"
                      >
                        <option value="dark">Dark Theme Box (Navy)</option>
                        <option value="white">White Theme Box</option>
                      </select>
                    </div>
                  </div>

                  <div className="md:col-span-9 space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Client Quote</label>
                      <textarea
                        rows={3}
                        value={rev.quote}
                        onChange={(e) => {
                          const updated = [...homeReviews];
                          updated[idx].quote = e.target.value;
                          setHomeReviews(updated);
                        }}
                        className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl outline-none leading-relaxed"
                        placeholder="Client testimonial quote..."
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-800 mb-1">Author Role / Title</label>
                        <input
                          type="text"
                          value={rev.authorRole}
                          onChange={(e) => {
                            const updated = [...homeReviews];
                            updated[idx].authorRole = e.target.value;
                            setHomeReviews(updated);
                          }}
                          className="w-full px-3.5 py-2 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl outline-none"
                          placeholder="e.g. Brand Manager"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-800 mb-1">Company & Location</label>
                        <input
                          type="text"
                          value={rev.authorCompany}
                          onChange={(e) => {
                            const updated = [...homeReviews];
                            updated[idx].authorCompany = e.target.value;
                            setHomeReviews(updated);
                          }}
                          className="w-full px-3.5 py-2 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl outline-none"
                          placeholder="e.g. Jewelry Company, UK"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUCCESS STORIES TAB */}
      {activeSection === "case_studies" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-trophy"></i>
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Photo Editing Success Stories
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {caseStudies.length} stories active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Configure real-world customer case studies featured in the &quot;Photo Editing Success Story&quot; section on the homepage.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newStory = {
                  id: Date.now(),
                  img: "/images/homepage/case-study-1.webp",
                  alt: "Success Story",
                  title: "New Client Success Story Headline",
                  desc: "Describe the client, the post-production challenge, and the positive outcome.",
                  link: "/case-study",
                };
                setCaseStudies([...caseStudies, newStory]);
                showToast("New success story added!");
              }}
              className="px-4 py-2.5 rounded-xl bg-[#ff5b0a] hover:bg-[#e04f05] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add Success Story</span>
            </button>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-800 mb-1.5">Section Heading</label>
            <input
              type="text"
              value={caseStudiesHeading}
              onChange={(e) => setCaseStudiesHeading(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl focus:border-[#ff5b0a] outline-none"
              placeholder="Photo Editing Success Story"
            />
          </div>

          <div className="space-y-6">
            {caseStudies.map((study, idx) => (
              <div
                key={study.id || idx}
                className="p-5 sm:p-6 border border-slate-200 rounded-2xl bg-slate-50/70 hover:border-orange-300 hover:bg-slate-50 transition-all space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#ff5b0a] text-white flex items-center justify-center text-xs font-black shadow-sm shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-extrabold text-sm text-slate-900 truncate">
                      {study.title || `Story #${idx + 1}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        if (caseStudies.length <= 1) {
                          showToast("At least one story is required", "error");
                          return;
                        }
                        setCaseStudies(caseStudies.filter((_, i) => i !== idx));
                      }}
                      className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 flex items-center justify-center text-xs ml-1 shadow-xs transition-all shrink-0"
                      title="Remove Story"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  <div className="md:col-span-4 space-y-3">
                    <div className="w-full aspect-video rounded-xl bg-slate-900 border border-slate-300 overflow-hidden relative flex items-center justify-center shadow-inner">
                      {study.img ? (
                        <img src={study.img} alt={study.alt || study.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">No Image</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-800">Thumbnail Image URL</label>
                        <ImageUploadButton
                          folder="homepage"
                          label="Upload Thumbnail"
                          currentValue={study.img}
                          onUploadSuccess={(url: string) => {
                            const updated = [...caseStudies];
                            updated[idx].img = url;
                            setCaseStudies(updated);
                            showToast("Success story image uploaded!");
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        value={study.img}
                        onChange={(e) => {
                          const updated = [...caseStudies];
                          updated[idx].img = e.target.value;
                          setCaseStudies(updated);
                        }}
                        className="w-full px-3 py-2 text-xs bg-white text-slate-800 font-mono border border-slate-300 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-8 space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Headline / Title</label>
                      <input
                        type="text"
                        value={study.title}
                        onChange={(e) => {
                          const updated = [...caseStudies];
                          updated[idx].title = e.target.value;
                          setCaseStudies(updated);
                        }}
                        className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl outline-none"
                        placeholder="Headline of the case study..."
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Story Summary / Excerpt</label>
                      <textarea
                        rows={3}
                        value={study.desc}
                        onChange={(e) => {
                          const updated = [...caseStudies];
                          updated[idx].desc = e.target.value;
                          setCaseStudies(updated);
                        }}
                        className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl outline-none leading-relaxed"
                        placeholder="Detailed background and results..."
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-800 mb-1">Target Page Link</label>
                        <input
                          type="text"
                          value={study.link}
                          onChange={(e) => {
                            const updated = [...caseStudies];
                            updated[idx].link = e.target.value;
                            setCaseStudies(updated);
                          }}
                          className="w-full px-3.5 py-2 bg-white text-slate-900 font-semibold border border-slate-300 rounded-xl outline-none"
                          placeholder="/case-study-image-enhancement"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-800 mb-1">Image Alt Text</label>
                        <input
                          type="text"
                          value={study.alt || ""}
                          onChange={(e) => {
                            const updated = [...caseStudies];
                            updated[idx].alt = e.target.value;
                            setCaseStudies(updated);
                          }}
                          className="w-full px-3.5 py-2 bg-white text-slate-800 font-medium border border-slate-300 rounded-xl outline-none"
                          placeholder="Image descriptive alt text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. SEO TAB */}
      {activeSection === "seo" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#ff5b0a] flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                Home Page SEO & Browser Meta Tags
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Optimized for Google search engines, social shares, and browser title display.
            </p>
          </div>

          <div className="space-y-5 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Page Title Tag</label>
              <input
                type="text"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                className="w-full px-3.5 py-3 bg-white text-slate-900 font-bold border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none transition-all"
                placeholder="Outsource Photo Editing Services Company | SmartPHOTOeditors"
              />
              <span className="text-[11px] text-slate-500 mt-1.5 block font-medium">
                Recommended length: 50-60 characters ({pageTitle.length} chars)
              </span>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">SEO Meta Description</label>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full px-3.5 py-3 bg-white text-slate-900 font-medium border border-slate-300 rounded-xl focus:border-[#ff5b0a] focus:ring-4 focus:ring-orange-500/15 shadow-sm outline-none leading-relaxed transition-all"
                placeholder="Summary displayed under Google search results..."
              />
              <span className="text-[11px] text-slate-500 mt-1.5 block font-medium">
                Recommended length: 140-160 characters ({metaDescription.length} chars)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Action Bar */}
      <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <i className="fa-solid fa-circle-info text-[#ff5b0a]"></i>
          <span>Make sure to click <strong>Save Home Page</strong> to persist all updates to PostgreSQL.</span>
        </div>
        <button
          type="button"
          onClick={() => handleSaveAll()}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5b0a] to-orange-500 hover:from-[#e04f05] hover:to-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
          <span>{saving ? "Saving Changes..." : "Save Home Page"}</span>
        </button>
      </div>
    </div>
  );
};
