"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { caseStudiesData, ResourceArticle } from "@/lib/resourcesData";

interface CaseStudyDetailProps {
  studySlug: string;
}

export const CaseStudyDetailContent: React.FC<CaseStudyDetailProps> = ({ studySlug }) => {
  // Normalize slug to match with or without .php
  const normalizedSlug = studySlug.replace(/\.php$/, "");
  const study =
    caseStudiesData.find(
      (s) =>
        s.slug === normalizedSlug ||
        s.slug === studySlug ||
        s.id === studySlug ||
        s.link.includes(normalizedSlug)
    ) || caseStudiesData[0];

  return (
    <div className="case-study-detail-page">
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
            <div className="col-lg-10">
              <div className="mb-3">
                <div className="inline-flex items-center gap-2 bg-orange-50 text-[#ff5b0a] font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-orange-200 mb-3">
                  <i className="fa-solid fa-briefcase"></i>
                  <span>Case Study #{study.id.toUpperCase()}</span>
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  {study.title}
                </h1>
                <p className="text-base md:text-lg text-gray-600 mt-2 max-w-3xl leading-relaxed">
                  {study.excerpt}
                </p>
              </div>
              <ul className="flex items-center gap-2 text-sm text-gray-600 mt-4 list-none p-0 flex-wrap">
                <li>
                  <Link href="/" className="text-[#fd5d0a] hover:underline font-medium">
                    Home
                  </Link>
                </li>
                <li className="text-gray-400">&gt;</li>
                <li>
                  <Link href="/resources" className="text-[#fd5d0a] hover:underline font-medium">
                    Resources
                  </Link>
                </li>
                <li className="text-gray-400">&gt;</li>
                <li>
                  <Link href="/case-study" className="text-[#fd5d0a] hover:underline font-medium">
                    Case Studies
                  </Link>
                </li>
                <li className="text-gray-400">&gt;</li>
                <li className="text-gray-800 font-semibold truncate max-w-xs">{study.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. METRICS BANNER */}
      {study.metrics && (
        <section className="bg-[#1c2a5a] text-white py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {study.metrics.map((m, idx) => (
                <div key={idx} className="border-r border-white/10 last:border-none px-2">
                  <div className="text-3xl md:text-4xl font-extrabold text-[#ff5b0a] mb-1">
                    {m.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-300 uppercase tracking-wider font-semibold">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. CASE STUDY DEEP DIVE */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="row">
            {/* Main Content Column */}
            <div className="col-lg-8 mb-12 lg:mb-0">
              <div className="relative h-[320px] md:h-[420px] rounded-3xl overflow-hidden mb-10 shadow-md border border-gray-200">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover"
                />
              </div>

              {study.clientDetails && (
                <div className="space-y-10">
                  {/* The Challenge */}
                  <div className="bg-[#f8f9fa] p-8 rounded-3xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#1c2a5a]">
                        The Challenge
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {study.clientDetails.challenge}
                    </p>
                  </div>

                  {/* The Solution */}
                  <div className="bg-[#f8f9fa] p-8 rounded-3xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        <i className="fa-solid fa-lightbulb"></i>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#1c2a5a]">
                        The SmartPHOTOeditors Solution
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base mb-4">
                      {study.clientDetails.solution}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Our scalable production pods utilized standardized Adobe Creative Cloud workflows, automated FTP ingestion pipelines, and multi-tier quality assurance gates to meet exact specifications.
                    </p>
                  </div>

                  {/* The Results */}
                  <div className="bg-[#f8f9fa] p-8 rounded-3xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                        <i className="fa-solid fa-circle-check"></i>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#1c2a5a]">
                        Key Project Outcomes
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {study.clientDetails.results.map((res, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-800 text-base">
                          <i className="fa-solid fa-check text-green-600 font-bold mt-1 shrink-0"></i>
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="col-lg-4">
              <div className="sticky top-24 space-y-6">
                {/* Client Profile Box */}
                {study.clientDetails && (
                  <div className="bg-[#f8f9fa] p-6 rounded-3xl border border-gray-200 shadow-sm">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 pb-2 border-b border-gray-200">
                      Project Profile
                    </h4>
                    <div className="space-y-4 text-sm">
                      <div>
                        <div className="text-gray-500 text-xs uppercase font-semibold">Client</div>
                        <div className="font-bold text-gray-900 mt-0.5">{study.clientDetails.client}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs uppercase font-semibold">Industry</div>
                        <div className="font-bold text-gray-900 mt-0.5">{study.clientDetails.industry}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs uppercase font-semibold">Location</div>
                        <div className="font-bold text-gray-900 mt-0.5">{study.clientDetails.location}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs uppercase font-semibold">Tags</div>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {study.tags.map((t, idx) => (
                            <span
                              key={idx}
                              className="bg-white border border-gray-200 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Free Sample CTA Box */}
                <div className="bg-gradient-to-br from-[#1c2a5a] to-[#0f172a] text-white p-6 rounded-3xl shadow-lg">
                  <span className="text-[#ff5b0a] text-xs font-bold uppercase tracking-wider">
                    Need Similar Results?
                  </span>
                  <h4 className="text-xl font-bold mt-2 mb-3">
                    Scale Your Production With Dedicated Editors
                  </h4>
                  <p className="text-gray-300 text-xs leading-relaxed mb-6">
                    Request a free trial pilot with your sample images and get a customized SLA proposal within 24 hours.
                  </p>
                  <Link
                    href="/contact-us.php"
                    className="block text-center bg-[#ff5b0a] hover:bg-[#e04f05] text-white py-3 rounded-full font-bold text-sm shadow-md transition-colors"
                  >
                    Request Free Sample Pilot
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OTHER CASE STUDIES */}
      <section className="py-14 bg-[#f8f9fa] border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-[#1c2a5a]">
              More Success Stories
            </h3>
            <Link
              href="/case-study"
              className="text-xs font-bold uppercase text-[#ff5b0a] hover:underline"
            >
              All Case Studies &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudiesData
              .filter((s) => s.id !== study.id)
              .map((other) => (
                <div
                  key={other.id}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-[#ff5b0a] uppercase tracking-wider">
                      {other.category}
                    </span>
                    <h4 className="text-base md:text-lg font-bold text-gray-900 mt-1 mb-2">
                      {other.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {other.excerpt}
                    </p>
                  </div>
                  <Link
                    href={other.link}
                    className="text-xs font-bold text-[#ff5b0a] hover:underline inline-flex items-center gap-1"
                  >
                    Read Case Study &rarr;
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};
