"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceCategory } from "@/types/content";
import { getServices } from "@/lib/api/content";
import { ImageComparisonSlider } from "./ImageComparisonSlider";
import { BrandLoader } from "@/components/ui/BrandLoader";

interface ServicesContentProps {
  initialServices?: ServiceCategory[];
}

export const ServicesContent: React.FC<ServicesContentProps> = ({ initialServices }) => {
  const [services, setServices] = useState<ServiceCategory[]>(initialServices || []);
  const [loading, setLoading] = useState(!initialServices || initialServices.length === 0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!initialServices || initialServices.length === 0) {
      setLoading(true);
      getServices()
        .then((data) => {
          if (data && data.length > 0) setServices(data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [initialServices]);

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((s) => s.id === selectedCategory);


  const categories = [
    { id: "all", label: "All Services" },
    { id: "real-estate", label: "Real Estate" },
    { id: "portrait", label: "Portrait & Beauty" },
    { id: "image-clipping", label: "Clipping & Masking" },
    { id: "fashion", label: "Fashion & Apparel" },
    { id: "ecommerce", label: "E-Commerce" },
    { id: "jewelry", label: "Jewelry" },
    { id: "photoshop-services", label: "Photoshop Creative" },
    { id: "lightroom-services", label: "Lightroom Batch" },
    { id: "photo-restoration", label: "Restoration" },
  ];

  const serviceFaqs = [
    {
      q: "What is your typical turnaround time for bulk image editing projects?",
      a: "Our standard turnaround time is 12 to 24 hours for most real estate, clipping path, and portrait batches. For high-volume projects or complex jewelry macro retouching, turnaround is 24 to 48 hours. We also offer express 6-12 hour rush delivery options upon request.",
    },
    {
      q: "Do you offer a free sample or trial before committing to a contract?",
      a: "Yes! We provide a 100% free pilot/trial test for up to 3-5 images with zero obligations. This allows you to evaluate our quality, accuracy, and adherence to your custom styling specifications before scaling up.",
    },
    {
      q: "How do we securely upload and transfer large RAW or PSD files?",
      a: "We support high-speed secure FTP / SFTP transfers, Dropbox, Google Drive, OneDrive, WeTransfer, and custom API integration with your existing digital asset management (DAM) systems. All transfers are protected by 256-bit SSL encryption.",
    },
    {
      q: "What file formats do you accept and deliver?",
      a: "We accept all major RAW formats (CR2, CR3, NEF, ARW, DNG), TIFF, PSD, PSB, PNG, and JPEG. Deliverables can be exported to your exact requirements: layered PSDs with clipping paths intact, transparent PNGs, MLS-ready web JPEGs, or high-res CMYK print TIFFs.",
    },
    {
      q: "How do you maintain consistent quality across thousands of images?",
      a: "We employ a strict multi-tier Quality Assurance (QA) workflow. Every edited file is independently inspected by a senior quality controller against your project brief and brand guidelines before final export and client dispatch.",
    },
  ];

  if (loading && services.length === 0) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-[#07152F]">
        <BrandLoader
          size="lg"
          message="Loading Services Catalog..."
          subMessage="Fetching editing solutions from database"
        />
      </div>
    );
  }

  return (
    <div className="services-page-inner">
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
                <span className="inline-block bg-blue-50 text-[#1265E8] font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-blue-200 mb-3">
                  Outsource Image Editing Services
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">
                  Image Editing Services
                </h1>
                <p className="text-base md:text-lg text-gray-600 mt-2 max-w-2xl leading-relaxed">
                  Enterprise-grade photo editing, retouching, clipping, and restoration solutions delivered by Adobe-certified specialists with human-in-the-loop precision.
                </p>
              </div>
              <ul className="flex items-center gap-2 text-sm text-gray-600 mt-3 list-none p-0 flex-wrap">
                <li>
                  <Link href="/" className="text-[#fd5d0a] hover:underline font-medium">
                    Home
                  </Link>
                </li>
                <li className="text-gray-400">&gt;</li>
                <li className="text-gray-800 font-semibold">Services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <div className="section stastic-section py-6 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="row">
            <div className="col-md-12 stastic-counter-row pt-2 flex flex-wrap justify-between items-center text-center">
              <div className="stastic-counter mb-2 flex-1 min-w-[140px]">
                <div className="stastic-head text-3xl font-bold text-[#1265E8]">13+</div>
                <div className="stastic-desc text-xs uppercase tracking-wider font-semibold text-gray-600">Years Experience</div>
              </div>
              <div className="line-seperator hidden md:block">
                <div className="line"></div>
              </div>
              <div className="stastic-counter mb-2 flex-1 min-w-[140px]">
                <div className="stastic-head text-3xl font-bold text-[#07152F]">5M+</div>
                <div className="stastic-desc text-xs uppercase tracking-wider font-semibold text-gray-600">Images Edited</div>
              </div>
              <div className="line-seperator hidden md:block">
                <div className="line"></div>
              </div>
              <div className="stastic-counter mb-2 flex-1 min-w-[140px]">
                <div className="stastic-head text-3xl font-bold text-[#1265E8]">12-24h</div>
                <div className="stastic-desc text-xs uppercase tracking-wider font-semibold text-gray-600">Average Turnaround</div>
              </div>
              <div className="line-seperator hidden md:block">
                <div className="line"></div>
              </div>
              <div className="stastic-counter mb-2 flex-1 min-w-[140px]">
                <div className="stastic-head text-3xl font-bold text-[#07152F]">99.4%</div>
                <div className="stastic-desc text-xs uppercase tracking-wider font-semibold text-gray-600">Quality Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CATEGORY FILTER TABS */}
      <section className="py-8 bg-[#f8f9fa] border-b border-gray-200 sticky top-[76px] z-20 backdrop-blur-md bg-white/90">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center flex-wrap gap-2 md:gap-3">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none ${
                    isActive
                      ? "bg-[#1265E8] text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MAIN SERVICES GRID */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#07152F] mb-4">
              Comprehensive Post-Production Capabilities
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Whether you require high-speed clipping paths for 5,000 product SKUs, delicate high-end portrait retouching, or multi-exposure real estate HDR enhancements, our dedicated production teams are structured to scale with your demand.
            </p>
          </div>

          <div className="space-y-16">
            {filteredServices.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="bg-[#fafafa] rounded-3xl p-6 md:p-10 border border-gray-200 shadow-sm transition-all hover:shadow-md"
                >
                  <div className={`row items-center ${isEven ? "" : "flex-row-reverse"}`}>
                    {/* Left/Right Text Column */}
                    <div className="col-lg-6 mb-8 lg:mb-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-10 h-10 rounded-xl bg-blue-100 text-[#1265E8] flex items-center justify-center text-lg">
                          <i className={service.iconClass}></i>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#1265E8]">
                          {service.turnaroundTime} Delivery
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-[#07152F] mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm font-semibold text-gray-500 mb-4">
                        {service.tagline}
                      </p>
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                        {service.fullDesc}
                      </p>

                      {/* Key Features List */}
                      <div className="mb-6">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                          Key Capabilities & Deliverables:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.keyBenefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <i className="fa-solid fa-circle-check text-[#8dce3c] mt-1 text-xs shrink-0"></i>
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sub-Services Tags */}
                      <div className="mb-6">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Included Sub-Services:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {service.subServices.map((sub) => (
                            <Link
                              key={sub.id}
                              href={sub.link}
                              className="inline-block bg-white text-gray-700 hover:text-[#1265E8] border border-gray-200 text-xs px-2.5 py-1 rounded-md transition-colors"
                            >
                              {sub.name} &rarr;
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Action CTA */}
                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          href={`/${service.slug}`}
                          className="btn btn-primary bg-[#1265E8] hover:bg-[#00C8F8] text-white font-medium px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2 border-0 transition-colors"
                        >
                          Explore {service.name}
                          <i className="fa-solid fa-arrow-right text-xs"></i>
                        </Link>
                        <Link
                          href="/contact-us.php"
                          className="btn bg-white hover:bg-gray-50 text-[#07152F] border border-gray-300 font-medium px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2 transition-colors"
                        >
                          Request Free Quote
                        </Link>
                      </div>
                    </div>

                    {/* Left/Right Interactive Before/After Column */}
                    <div className="col-lg-6">
                      <div className="bg-white p-3 md:p-4 rounded-2xl border border-gray-200 shadow-inner flex flex-col items-center">
                        <div className="w-full max-w-[500px]">
                          <ImageComparisonSlider
                            beforeSrc={service.beforeSrc}
                            afterSrc={service.afterSrc}
                            beforeAlt={service.beforeAlt}
                            afterAlt={service.afterAlt}
                            title={service.name}
                          />
                        </div>
                        <div className="flex justify-between w-full mt-3 text-xs text-gray-500 px-2 font-medium">
                          <span>&#9664; Slide Left: BEFORE</span>
                          <span>Slide Right: AFTER &#9654;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. 4-STEP WORKFLOW PROCESS */}
      <section className="py-16 bg-[#07152F] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#1265E8] text-sm font-bold uppercase tracking-widest">
              Simple & Transparent
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">
              How We Work with Our Clients
            </h2>
            <p className="text-gray-300 text-sm md:text-base mt-2">
              From free trial pilots to ongoing dedicated team setups, our workflow is designed for frictionless communication and reliable delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative">
              <div className="text-4xl font-extrabold text-[#1265E8]/30 mb-2">01</div>
              <h3 className="text-lg font-bold text-white mb-2">1. Send Files & Brief</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Upload your raw images and guidelines via our secure FTP, Dropbox, Drive, or API with your desired specifications.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative">
              <div className="text-4xl font-extrabold text-[#1265E8]/30 mb-2">02</div>
              <h3 className="text-lg font-bold text-white mb-2">2. Free Trial / Pilot</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                We edit a sample batch to calibrate against your lighting, color palette, and styling preferences for approval.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative">
              <div className="text-4xl font-extrabold text-[#1265E8]/30 mb-2">03</div>
              <h3 className="text-lg font-bold text-white mb-2">3. Scaled Production</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Our Adobe specialists process your bulk orders in structured shifts, supported by automated workflow routing.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative">
              <div className="text-4xl font-extrabold text-[#1265E8]/30 mb-2">04</div>
              <h3 className="text-lg font-bold text-white mb-2">4. QA & Fast Delivery</h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Senior QA controllers review all deliverables before dispatching web-ready and print-ready files within 12-24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY OUTSOURCE TO SPE (4 PILLARS) */}
      <section className="sec-quality-process py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#07152F] mb-2">
              The SmartPHOTOeditors Advantage
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Enterprise standards engineered to protect your intellectual property, guarantee SLA adherence, and deliver exceptional aesthetic value.
            </p>
          </div>

          <div className="row">
            <div className="col-12">
              <ul className="quality-process-list mb-4">
                <li>
                  <Link href="/security.php" className="q-process-box">
                    <div className="counter">01</div>
                    <i className="fa-solid fa-shield-halved text-4xl text-[#1265E8] mb-2"></i>
                    <span>ISO Security & NDA Protection</span>
                  </Link>
                </li>
                <li>
                  <Link href="/quality.php" className="q-process-box">
                    <div className="counter">02</div>
                    <i className="fa-solid fa-circle-check text-4xl text-[#1265E8] mb-2"></i>
                    <span>2-Tier Quality Control</span>
                  </Link>
                </li>
                <li>
                  <Link href="/pricing.php" className="q-process-box">
                    <div className="counter">03</div>
                    <i className="fa-solid fa-tags text-4xl text-[#1265E8] mb-2"></i>
                    <span>Transparent Volume Pricing</span>
                  </Link>
                </li>
                <li>
                  <Link href="/benefits.php" className="q-process-box">
                    <div className="counter">04</div>
                    <i className="fa-solid fa-bolt text-4xl text-[#1265E8] mb-2"></i>
                    <span>24/7 Global Time-Zone Coverage</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-16 bg-[#f8f9fa] border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#07152F] mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Everything you need to know about partnering with our photo editing studio.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {serviceFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 font-semibold text-gray-900 flex justify-between items-center focus:outline-none hover:text-[#1265E8]"
                  >
                    <span>{faq.q}</span>
                    <i
                      className={`fa-solid fa-chevron-down text-sm transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#1265E8]" : "text-gray-400"
                      }`}
                    ></i>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. HIGH CONVERSION CTA */}
      <div className="section cta-section py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="cta-section-container max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Accelerate Your Image Editing Workflow?
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Send us your sample images today for a free test edit and custom volume price quote within one business day.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/contact-us.php"
                className="btn round-button cta-btn inline-block bg-[#1265E8] hover:bg-[#00C8F8] text-white px-8 py-3.5 rounded-full font-semibold"
              >
                Get a Free Quote & Trial
              </Link>
              <Link
                href="/sample-images.php"
                className="btn bg-white hover:bg-gray-100 text-[#07152F] border border-gray-300 px-8 py-3.5 rounded-full font-semibold"
              >
                View Sample Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
