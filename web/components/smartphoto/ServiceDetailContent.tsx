"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceCategory } from "@/types/content";
import { ImageComparisonSlider } from "./ImageComparisonSlider";


interface ServiceDetailProps {
  service: ServiceCategory;
}

export const ServiceDetailContent: React.FC<ServiceDetailProps> = ({ service }) => {
  return (
    <div className="service-detail-page">
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
                  <i className={service.iconClass}></i>
                  <span>Professional Image Editing</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">
                  {service.name}
                </h1>
                <p className="text-base md:text-lg text-gray-600 mt-2 max-w-2xl leading-relaxed">
                  {service.tagline}
                </p>
              </div>
              <ul className="flex items-center gap-2 text-sm text-gray-600 mt-3 list-none p-0 flex-wrap">
                <li>
                  <Link href="/" className="text-[#fd5d0a] hover:underline font-medium">
                    Home
                  </Link>
                </li>
                <li className="text-gray-400">&gt;</li>
                <li>
                  <Link href="/services" className="text-[#fd5d0a] hover:underline font-medium">
                    Services
                  </Link>
                </li>
                <li className="text-gray-400">&gt;</li>
                <li className="text-gray-800 font-semibold">{service.name}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW & BEFORE/AFTER SHOWCASE */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="row items-center">
            <div className="col-lg-6 mb-8 lg:mb-0">
              <span className="text-[#1265E8] text-xs font-bold uppercase tracking-widest">
                Overview & Value
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#07152F] mt-1 mb-4">
                Scale Your Production Without Compromising on Quality
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                {service.fullDesc}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                SmartPHOTOeditors acts as a seamless extension of your in-house creative team. Our dedicated Adobe-certified specialists execute pixel-level adjustments while maintaining rigorous turnaround SLAs.
              </p>

              {/* Metrics Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="bg-[#f8f9fa] p-3 rounded-xl border border-gray-200 text-center">
                  <div className="text-xs text-gray-500 font-medium">Turnaround</div>
                  <div className="text-base font-bold text-[#1265E8]">{service.turnaroundTime}</div>
                </div>
                <div className="bg-[#f8f9fa] p-3 rounded-xl border border-gray-200 text-center">
                  <div className="text-xs text-gray-500 font-medium">Format</div>
                  <div className="text-base font-bold text-[#07152F]">PSD / TIFF / JPG</div>
                </div>
                <div className="bg-[#f8f9fa] p-3 rounded-xl border border-gray-200 text-center col-span-2 sm:col-span-1">
                  <div className="text-xs text-gray-500 font-medium">Quality SLA</div>
                  <div className="text-base font-bold text-green-600">99.4% Pass</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact-us.php"
                  className="btn bg-[#1265E8] hover:bg-[#00C8F8] text-white px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-colors"
                >
                  Request Free Pilot Trial
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </Link>
                <Link
                  href="/sample-images.php"
                  className="btn bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-6 py-3 rounded-full font-semibold text-sm"
                >
                  View Sample Images
                </Link>
              </div>
            </div>

            {/* Comparison Slider */}
            <div className="col-lg-6">
              <div className="bg-[#f8f9fa] p-4 rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center">
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
      </section>

      {/* 3. SUB-SERVICES BREAKDOWN */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#1265E8] text-xs font-bold uppercase tracking-widest">
              Specialized Sub-Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#07152F] mt-1 mb-3">
              Included {service.name} Solutions
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Customized post-production options designed to meet your specific commercial requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.subServices.map((sub) => (
              <div
                key={sub.id}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1265E8] flex items-center justify-center text-base mb-4">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {sub.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {sub.description}
                  </p>
                  {sub.features && sub.features.length > 0 && (
                    <ul className="space-y-1.5 mb-6 text-xs text-gray-700">
                      {sub.features.map((feat, fi) => (
                        <li key={fi} className="flex items-center gap-2">
                          <i className="fa-solid fa-circle-check text-[#8dce3c] text-[10px]"></i>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Link
                  href="/contact-us.php"
                  className="text-xs font-semibold text-[#1265E8] hover:text-[#00C8F8] inline-flex items-center gap-1.5"
                >
                  Order This Service &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TECHNICAL DELIVERABLES & SPECS */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="row items-center">
            <div className="col-lg-6 mb-8 lg:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-[#07152F] mb-4">
                Deliverables & Technical Standards
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                All files are processed using genuine Adobe Creative Cloud licenses, color-calibrated IPS displays, and strict color-space management (sRGB, Adobe RGB 1998, or CMYK).
              </p>

              <div className="space-y-3">
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <i className="fa-solid fa-file-image text-[#1265E8] text-lg"></i>
                    <span className="text-sm font-semibold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="bg-[#07152F] text-white p-8 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Need a Custom Specification?</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    We routinely build customized batch actions, specific naming conventions, and layer structures tailored to our clients&apos; automated publishing pipelines.
                  </p>
                  <Link
                    href="/contact-us.php"
                    className="btn bg-[#1265E8] hover:bg-[#00C8F8] text-white px-6 py-3 rounded-full font-semibold text-sm inline-block"
                  >
                    Discuss Custom Workflow
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA */}
      <div className="section cta-section py-14 bg-[#f8f9fa] border-t border-gray-200 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Ready to Outsource {service.name}?
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Get started with a free sample test edit and dedicated account manager support.
            </p>
            <Link
              href="/contact-us.php"
              className="btn bg-[#1265E8] hover:bg-[#00C8F8] text-white px-8 py-3 rounded-full font-semibold text-sm inline-block shadow-md"
            >
              Get Free Quote & Sample
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
