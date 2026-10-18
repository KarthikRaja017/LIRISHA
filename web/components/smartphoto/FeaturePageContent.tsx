"use client";

import React from "react";
import Link from "next/link";

export interface FeaturePageProps {
  pageType:
    | "security"
    | "quality"
    | "247-coverage"
    | "pricing"
    | "benefits"
    | "turnaround-time"
    | "compliant-software"
    | "adobe-specialized-artists"
    | "sitemap"
    | "glossary"
    | "privacy-policy"
    | "accessories";
}

export const FeaturePageContent: React.FC<FeaturePageProps> = ({ pageType }) => {
  const contentConfig = {
    security: {
      badge: "Security & Data Protection",
      title: "Enterprise Data Security & Confidentiality",
      description:
        "At SmartPHOTOeditors, we uphold strict information security management standards to safeguard our clients' intellectual property and digital visual assets.",
      icon: "fa-solid fa-shield-halved",
      sections: [
        {
          title: "Comprehensive Non-Disclosure Agreements (NDAs)",
          content:
            "Every engagement is backed by legally binding bilateral NDAs. All editing personnel undergo rigorous background checks and are bound by confidentiality obligations covering all client photographs, product blueprints, and unreleased assets.",
        },
        {
          title: "256-Bit SSL Encrypted File Transfers",
          content:
            "File transmissions are protected by enterprise-grade 256-bit SSL / TLS encryption across secure SFTP channels, private cloud containers, and dedicated client FTP endpoints.",
        },
        {
          title: "Restricted Access & Air-Gapped Workstations",
          content:
            "Our production facility operates with biometrically restricted access, disabled USB/removable storage on editor terminals, strict firewall rules, and zero unauthorized external data egress.",
        },
        {
          title: "Automated Data Archival & Purge Policies",
          content:
            "Completed project files are retained for 30 days for revision support, after which they are permanently and securely purged from our servers in compliance with GDPR and international data protection laws.",
        },
      ],
    },
    quality: {
      badge: "Quality Assurance",
      title: "Our Commitment to Flawless Quality & Precision",
      description:
        "Consistent, high-caliber image editing backed by senior Adobe-certified quality controllers and a structured two-tier review process.",
      icon: "fa-solid fa-circle-check",
      sections: [
        {
          title: "Multi-Tier QA Inspection Process",
          content:
            "Every single image undergoes a primary check by the senior retouching lead followed by an independent inspection by our dedicated Quality Assurance team before client dispatch.",
        },
        {
          title: "Calibrated IPS Color Management",
          content:
            "All editing suites are equipped with hardware-calibrated color-accurate IPS displays to ensure true-to-life Pantone and sRGB/AdobeRGB fidelity.",
        },
        {
          title: "Zero-Cost Rework Guarantee",
          content:
            "If any deliverable does not match your creative brief or technical guidelines, we provide unlimited prompt revisions with zero additional fees.",
        },
      ],
    },
    "247-coverage": {
      badge: "Global Operations",
      title: "24/7 Global Time-Zone Coverage",
      description:
        "Operating around the clock across North America, Europe, and Asia to deliver overnight turnarounds for busy photography studios.",
      icon: "fa-solid fa-clock",
      sections: [
        {
          title: "Follow-the-Sun Workflow",
          content:
            "Shoot today, upload in the evening, and receive your fully edited, polished gallery before your morning client meetings.",
        },
        {
          title: "Dedicated Account Managers",
          content:
            "Always have a direct point of contact for urgent requests, volume spikes, and customized production instructions.",
        },
      ],
    },
    pricing: {
      badge: "Transparent Rates",
      title: "Cost-Effective, Scalable Volume Pricing",
      description:
        "High-end editing without agency overhead. Save up to 50% compared to in-house editing costs with predictable per-image or dedicated editor models.",
      icon: "fa-solid fa-tags",
      sections: [
        {
          title: "Per-Image Tiered Volume Rates",
          content:
            "Pay only for what you edit. Real estate HDR from $0.80/image, handcrafted clipping paths from $0.45/image, portrait retouching from $1.50/image.",
        },
        {
          title: "Dedicated Full-Time Editor (FTE) Retainer",
          content:
            "Hire dedicated Adobe experts working exclusively for your studio on a monthly subscription with guaranteed output quotas.",
        },
      ],
    },
    benefits: {
      badge: "Partner Value",
      title: "Why Outsource Image Editing to SmartPHOTOeditors",
      description:
        "Unlock agility, increase studio shooting capacity, and dramatically lower fixed operating costs.",
      icon: "fa-solid fa-gem",
      sections: [
        {
          title: "Focus on High-Value Client Shooting",
          content:
            "Photographers spend 60% of their time behind screens editing. Free up your schedule to shoot more weddings, homes, and campaigns.",
        },
        {
          title: "Scale Instantly During Peak Seasons",
          content:
            "Easily absorb seasonal volume spikes in spring real estate or fall wedding peaks without hiring permanent overhead staff.",
        },
      ],
    },
    "turnaround-time": {
      badge: "Speed & Reliability",
      title: "Rapid Delivery & Strict SLA Turnaround Times",
      description:
        "Standard 12 to 24-hour turnaround with express rush delivery available for urgent publishing deadlines.",
      icon: "fa-solid fa-bolt",
      sections: [
        {
          title: "Overnight Delivery Guarantee",
          content:
            "98.7% of all real estate and product clipping batches are delivered within 12 hours of raw file receipt.",
        },
        {
          title: "Express 6-Hour Rush Capability",
          content:
            "Urgent press releases or breaking MLS listings can be fast-tracked through our priority queue.",
        },
      ],
    },
    "compliant-software": {
      badge: "Software Integrity",
      title: "100% Genuine Licensed Adobe Software Compliance",
      description:
        "Operating exclusively with certified Adobe Creative Cloud enterprise licenses, guaranteeing software legality and state-of-the-art tooling.",
      icon: "fa-solid fa-certificate",
      sections: [
        {
          title: "Zero Piracy Guarantee",
          content:
            "We maintain strict enterprise software compliance, protecting your brand from third-party copyright and licensing liabilities.",
        },
        {
          title: "Latest Photoshop & Lightroom AI Features",
          content:
            "We harness the newest neural filters, generative fill expansions, and advanced camera RAW profiles.",
        },
      ],
    },
    "adobe-specialized-artists": {
      badge: "Expert Talent",
      title: "Certified Adobe Specialized Artists",
      description:
        "Our team consists of full-time retouching professionals with degrees in fine arts and extensive post-production training.",
      icon: "fa-solid fa-user-graduate",
      sections: [
        {
          title: "Continuous Professional Training",
          content:
            "All retouchers undergo continuous training in high-end frequency separation, composite lighting harmonization, and color theory.",
        },
        {
          title: "Domain-Specific Teams",
          content:
            "Specialized real estate editors focus strictly on architectural imaging, while portrait artists focus solely on skin and beauty aesthetics.",
        },
      ],
    },
    sitemap: {
      badge: "Navigation",
      title: "SmartPHOTOeditors Sitemap",
      description: "Quick navigation index across all services, resources, and company pages.",
      icon: "fa-solid fa-sitemap",
      sections: [],
    },
    glossary: {
      badge: "Reference",
      title: "Photo Editing & Retouching Glossary",
      description:
        "Comprehensive definitions of industry terms including HDR, Frequency Separation, Clipping Path, Alpha Masking, and Focus Stacking.",
      icon: "fa-solid fa-book",
      sections: [
        {
          title: "Clipping Path",
          content:
            "A closed vector path created using Photoshop's Pen Tool to isolate a subject from its original background with sharp, clean edges.",
        },
        {
          title: "Frequency Separation",
          content:
            "A high-end retouching technique that separates high-frequency texture (pores, hairs) from low-frequency color and tone, allowing independent editing.",
        },
        {
          title: "HDR (High Dynamic Range) Blending",
          content:
            "The process of combining multiple bracketed exposures into a single image to capture the full spectrum of highlights and shadows in high-contrast scenes.",
        },
      ],
    },
    "privacy-policy": {
      badge: "Legal & Privacy",
      title: "Privacy & Data Protection Policy",
      description:
        "How SmartPHOTOeditors collects, stores, and protects personal information and visual digital assets.",
      icon: "fa-solid fa-lock",
      sections: [
        {
          title: "Information We Collect",
          content:
            "We collect contact information (name, email, phone number) and visual assets solely for the purpose of fulfilling your image editing requests.",
        },
        {
          title: "No Third-Party Sharing",
          content:
            "We never sell, rent, or distribute your contact details or uploaded photographs to any third-party advertisers or external organizations.",
        },
      ],
    },
    accessories: {
      badge: "Equipment & Tips",
      title: "Recommended Photography Accessories & Studio Gear",
      description:
        "Curated recommendations on color calibration cards, lighting modifiers, tripod heads, and tethering cables to optimize shooting for post-production.",
      icon: "fa-solid fa-camera",
      sections: [
        {
          title: "Color Calibration Cards (X-Rite / Datacolor)",
          content:
            "Including a ColorChecker in your first shoot frame enables our Lightroom technicians to apply automated, mathematically precise white balance corrections.",
        },
        {
          title: "Polarizing Filters for Jewelry & Automotive",
          content:
            "Circular polarizers eliminate specular flare on car windshields and jewelry glass, preserving rich underlying textures.",
        },
      ],
    },
  };

  const current = contentConfig[pageType] || contentConfig.security;

  return (
    <div className="feature-page-inner">
      {/* 1. HERO BANNER */}
      <section
        className="spe-inner-banner py-12 md:py-16 bg-[#f1f5f4] border-b border-gray-200"
        style={{
          backgroundImage: "url('/images/banner-bg.webp')",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="row">
            <div className="col-lg-8">
              <div className="mb-3">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1265E8] font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-blue-200 mb-3">
                  <i className={current.icon}></i>
                  <span>{current.badge}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">
                  {current.title}
                </h1>
                <p className="text-base md:text-lg text-gray-600 mt-2 max-w-2xl leading-relaxed">
                  {current.description}
                </p>
              </div>
              <ul className="flex items-center gap-2 text-sm text-gray-600 mt-3 list-none p-0 flex-wrap">
                <li>
                  <Link href="/" className="text-[#fd5d0a] hover:underline font-medium">
                    Home
                  </Link>
                </li>
                <li className="text-gray-400">&gt;</li>
                <li className="text-gray-800 font-semibold">{current.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT BODY */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          {pageType === "sitemap" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Services */}
              <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-200">
                <h3 className="text-lg font-bold text-[#07152F] border-b pb-3 mb-4">
                  Services
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><Link href="/services" className="hover:text-[#1265E8]">All Services Hub</Link></li>
                  <li><Link href="/real-estate" className="hover:text-[#1265E8]">Real Estate Photo Editing</Link></li>
                  <li><Link href="/portrait" className="hover:text-[#1265E8]">Portrait & Beauty Retouching</Link></li>
                  <li><Link href="/image-clipping" className="hover:text-[#1265E8]">Image Clipping & Masking</Link></li>
                  <li><Link href="/fashion" className="hover:text-[#1265E8]">Fashion & Ghost Mannequin</Link></li>
                  <li><Link href="/jewelry" className="hover:text-[#1265E8]">Jewelry Photo Retouching</Link></li>
                  <li><Link href="/photoshop-services" className="hover:text-[#1265E8]">Photoshop Creative Services</Link></li>
                  <li><Link href="/lightroom-services" className="hover:text-[#1265E8]">Lightroom Batch Processing</Link></li>
                  <li><Link href="/photo-restoration" className="hover:text-[#1265E8]">Photo Restoration & Repair</Link></li>
                  <li><Link href="/image-manipulation/ecommerce-image-editing.php" className="hover:text-[#1265E8]">E-Commerce Image Editing</Link></li>
                </ul>
              </div>

              {/* Resources & Portfolio */}
              <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-200">
                <h3 className="text-lg font-bold text-[#07152F] border-b pb-3 mb-4">
                  Resources & Portfolio
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><Link href="/resources" className="hover:text-[#1265E8]">Resources Hub</Link></li>
                  <li><Link href="/sample-images.php" className="hover:text-[#1265E8]">Sample Images Gallery</Link></li>
                  <li><Link href="/articles" className="hover:text-[#1265E8]">Articles & Guides</Link></li>
                  <li><Link href="/case-study" className="hover:text-[#1265E8]">Client Case Studies</Link></li>
                  <li><Link href="/blog" className="hover:text-[#1265E8]">SmartPHOTOeditors Blog</Link></li>
                  <li><Link href="/testimonials.php" className="hover:text-[#1265E8]">Customer Testimonials</Link></li>
                </ul>
              </div>

              {/* Company & Legal */}
              <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-200">
                <h3 className="text-lg font-bold text-[#07152F] border-b pb-3 mb-4">
                  Company & Security
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><Link href="/about-us.php" className="hover:text-[#1265E8]">About SmartPHOTOeditors</Link></li>
                  <li><Link href="/contact-us.php" className="hover:text-[#1265E8]">Contact Us</Link></li>
                  <li><Link href="/security.php" className="hover:text-[#1265E8]">Security & NDA Policy</Link></li>
                  <li><Link href="/quality.php" className="hover:text-[#1265E8]">Quality Assurance</Link></li>
                  <li><Link href="/pricing.php" className="hover:text-[#1265E8]">Pricing Overview</Link></li>
                  <li><Link href="/benefits.php" className="hover:text-[#1265E8]">Outsourcing Benefits</Link></li>
                  <li><Link href="/privacy-policy.php" className="hover:text-[#1265E8]">Privacy Policy</Link></li>
                  <li><Link href="/glossary.php" className="hover:text-[#1265E8]">Editing Glossary</Link></li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-10">
              {current.sections.map((sec, idx) => (
                <div key={idx} className="bg-[#f8f9fa] p-8 rounded-3xl border border-gray-200">
                  <h3 className="text-xl md:text-2xl font-bold text-[#07152F] mb-3">
                    {sec.title}
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. CTA */}
      <div className="section cta-section py-14 bg-[#07152F] text-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Experience the SmartPHOTOeditors Standard
            </h2>
            <p className="text-gray-300 text-sm mb-6">
              Send us your trial test images today for an obligation-free pilot.
            </p>
            <Link
              href="/contact-us.php"
              className="btn bg-[#1265E8] hover:bg-[#00C8F8] text-white px-8 py-3 rounded-full font-semibold text-sm inline-block shadow-md"
            >
              Get Started with Free Sample
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
