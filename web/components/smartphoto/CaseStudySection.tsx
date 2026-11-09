"use client";

import React from "react";
import Link from "next/link";

export interface CaseStudyItem {
  id?: string | number;
  img: string;
  alt: string;
  title: string;
  desc: string;
  link: string;
}

export interface CaseStudySectionData {
  heading?: string;
  items?: CaseStudyItem[];
}

interface CaseStudySectionProps {
  initialData?: CaseStudySectionData;
}

const defaultCaseStudies: CaseStudyItem[] = [
  {
    id: 1,
    img: "/images/homepage/case-study-1.webp",
    alt: "15K Edited Images Delivered to French Studio as Part of Continuous Engagement Project",
    title: "15,000+ Commercial Assets Delivered to Paris Studio",
    desc: "A French visual studio servicing 500+ luxury brands required overnight scaling without sacrificing retouching fidelity.",
    link: "/case-study/image-clipping-for-design-agency",
  },
  {
    id: 2,
    img: "/images/homepage/case-study-2.webp",
    alt: "Aerial Videography Company in the UK Outsources Drone Imaging Stitching",
    title: "Drone Imaging & 360 Panorama Stitching for UK Studio",
    desc: "Seamless 360-degree aerial panorama stitching and color grading for high-end architectural real estate marketing.",
    link: "/case-study/real-estate-studio-scaling-sweden",
  },
  {
    id: 3,
    img: "/images/homepage/case-study-3.webp",
    alt: "Image Clipping for a Leading US-Based Tech Firm To Enhance Their Product Catalog",
    title: "E-Commerce Catalog Clipping for US Tech Firm",
    desc: "Complex multi-path clipping and vector masking across 4,000 technical hardware components with 99.8% first-pass approval.",
    link: "/case-study/automobile-image-clipping",
  },
];

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({ initialData }) => {
  const heading = initialData?.heading || "Photo Editing Success Stories";
  const caseStudies =
    initialData?.items && initialData.items.length > 0 ? initialData.items : defaultCaseStudies;

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>Proven Case Studies</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {heading}
            </h2>
          </div>

          <Link
            href="/case-study"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors shrink-0"
          >
            <span>Explore All Case Studies</span>
            <i className="fa-solid fa-arrow-right text-[10px]" />
          </Link>
        </div>

        {/* 3-Column Modern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, idx) => {
            const cleanLink = study.link ? study.link.replace(/\.php$/, "") : "/case-study";
            return (
              <div
                key={study.id || idx}
                className="group flex flex-col justify-between bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-slate-100 mb-5 shadow-inner">
                    <img
                      src={study.img}
                      alt={study.alt || study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = "/images/homepage/case-study-1.webp";
                      }}
                    />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
                    {study.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                    {study.desc}
                  </p>
                </div>

                <Link
                  href={cleanLink}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 group-hover:text-blue-700 pt-3 border-t border-slate-100"
                >
                  <span>Read Case Study</span>
                  <i className="fa-solid fa-arrow-right text-[10px] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
