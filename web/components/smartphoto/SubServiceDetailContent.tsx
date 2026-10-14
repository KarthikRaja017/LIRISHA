"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ServiceCategory, SubServiceItem } from "@/types/content";
import { getServiceBySlug } from "@/lib/api/content";
import { ImageComparisonSlider } from "./ImageComparisonSlider";

interface SubServiceDetailProps {
  categorySlug: string;
  subServiceSlug: string;
  title: string;
  tagline?: string;
  description: string;
  beforeSrc?: string;
  afterSrc?: string;
  features?: string[];
  parentCategory?: ServiceCategory;
}

export const SubServiceDetailContent: React.FC<SubServiceDetailProps> = ({
  categorySlug,
  title,
  tagline,
  description,
  beforeSrc,
  afterSrc,
  features,
  parentCategory: initialParentCategory,
}) => {
  const [parentCategory, setParentCategory] = useState<ServiceCategory | null>(
    initialParentCategory || null
  );

  useEffect(() => {
    if (!parentCategory && categorySlug) {
      getServiceBySlug(categorySlug).then((data) => {
        if (data) setParentCategory(data);
      });
    }
  }, [categorySlug, parentCategory]);

  const defaultBefore = beforeSrc || parentCategory?.beforeSrc || "";
  const defaultAfter = afterSrc || parentCategory?.afterSrc || "";
  const defaultTagline =
    tagline || `Professional ${title} with 12-24h turnaround and 100% satisfaction guarantee.`;

  const parentName = parentCategory?.name || "Services";
  const parentSlug = parentCategory?.slug || categorySlug;
  const parentIcon = parentCategory?.iconClass || "fa-solid fa-layer-group";
  const siblingSubServices = parentCategory?.subServices || [];

  return (
    <div className="subservice-page-inner">
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
                <div className="inline-flex items-center gap-2 bg-orange-50 text-[#ff5b0a] font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-orange-200 mb-3">
                  <i className={parentIcon}></i>
                  <span>{parentName}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">
                  {title}
                </h1>
                <p className="text-base md:text-lg text-gray-600 mt-2 max-w-2xl leading-relaxed">
                  {defaultTagline}
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
                <li>
                  <Link href={`/${parentSlug}`} className="text-[#fd5d0a] hover:underline font-medium">
                    {parentName}
                  </Link>
                </li>
                <li className="text-gray-400">&gt;</li>
                <li className="text-gray-800 font-semibold">{title}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* 2. MAIN CONTENT & BEFORE/AFTER */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="row items-center">
            <div className="col-lg-6 mb-8 lg:mb-0">
              <span className="text-[#ff5b0a] text-xs font-bold uppercase tracking-widest">
                Service Overview
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#1c2a5a] mt-1 mb-4 leading-tight">
                High-Quality, Consistent {title} Solutions
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                {description}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Our specialized editing team delivers handcrafted quality adhering strictly to your color standards, file format specifications, and turnaround timelines.
              </p>

              {/* Key Features */}
              {features && features.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    Key Deliverables & Capabilities:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-800">
                        <i className="fa-solid fa-circle-check text-[#8dce3c] text-xs shrink-0"></i>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  href="/contact-us.php"
                  className="btn bg-[#ff5b0a] hover:bg-[#e04f05] text-white px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 shadow-md transition-colors"
                >
                  Order Free Sample Edit
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </Link>
                <Link
                  href="/sample-images.php"
                  className="btn bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-6 py-3 rounded-full font-semibold text-sm"
                >
                  View Sample Gallery
                </Link>
              </div>
            </div>

            {/* Comparison Slider */}
            <div className="col-lg-6">
              <div className="bg-[#f8f9fa] p-4 rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center">
                <div className="w-full max-w-[500px]">
                  <ImageComparisonSlider
                    beforeSrc={defaultBefore}
                    afterSrc={defaultAfter}
                    beforeAlt={`${title} Before`}
                    afterAlt={`${title} After`}
                    title={title}
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

      {/* 3. RELATED SIBLING SUB-SERVICES */}
      <section className="py-14 bg-[#f8f9fa] border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1c2a5a]">
                More in {parentName}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                Explore complementary post-production services from our dedicated studio team.
              </p>
            </div>
            <Link
              href={`/${parentSlug}`}
              className="text-xs font-bold uppercase tracking-wider text-[#ff5b0a] hover:underline"
            >
              View All {parentName} Services &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {siblingSubServices.slice(0, 3).map((sub) => (
              <div
                key={sub.id}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-bold text-gray-900 text-base mb-2">{sub.name}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{sub.description}</p>
                </div>
                <Link
                  href={sub.link}
                  className="text-xs font-bold text-[#ff5b0a] hover:underline inline-flex items-center gap-1"
                >
                  Learn More &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HIGH CONVERSION CTA */}
      <div className="section cta-section py-14 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Ready to Get Started with {title}?
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Send your raw files today for an instant free trial and personalized volume rate estimate.
            </p>
            <Link
              href="/contact-us.php"
              className="btn bg-[#ff5b0a] hover:bg-[#e04f05] text-white px-8 py-3 rounded-full font-semibold text-sm inline-block shadow-md"
            >
              Get Free Quote & Sample
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
