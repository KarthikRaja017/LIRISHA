"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ResourceArticle } from "@/types/content";
import { getResources } from "@/lib/api/content";
import { BrandLoader } from "@/components/ui/BrandLoader";

interface CaseStudyContentProps {
  initialCaseStudies?: ResourceArticle[];
}

export const CaseStudyContent: React.FC<CaseStudyContentProps> = ({ initialCaseStudies }) => {
  const [studies, setStudies] = useState<ResourceArticle[]>(initialCaseStudies || []);
  const [loading, setLoading] = useState(!initialCaseStudies || initialCaseStudies.length === 0);

  useEffect(() => {
    if (!initialCaseStudies || initialCaseStudies.length === 0) {
      setLoading(true);
      getResources("Case Studies")
        .then((data) => {
          if (data && data.length > 0) setStudies(data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [initialCaseStudies]);

  if (loading && studies.length === 0) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-[#07152F]">
        <BrandLoader
          size="lg"
          message="Loading Case Studies..."
          subMessage="Fetching client success stories from database"
        />
      </div>
    );
  }

  return (
    <div className="case-studies-page-inner">
      {/* HERO BANNER */}
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
                  Proven Client Results
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">
                  Client Case Studies
                </h1>
                <p className="text-base md:text-lg text-gray-600 mt-2 max-w-2xl leading-relaxed">
                  Real-world stories demonstrating how businesses across e-commerce, real estate, and advertising scale production and cut operational costs with SmartPHOTOeditors.
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
                  <Link href="/resources" className="text-[#fd5d0a] hover:underline font-medium">
                    Resources
                  </Link>
                </li>
                <li className="text-gray-400">&gt;</li>
                <li className="text-gray-800 font-semibold">Case Studies</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES LIST */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {studies.map((study, idx) => (
              <div
                key={study.id}
                className="bg-[#fafafa] rounded-3xl p-6 md:p-10 border border-gray-200 shadow-sm transition-all hover:shadow-md"
              >
                <div className="row items-center">
                  <div className="col-lg-7 mb-6 lg:mb-0">
                    <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                      {study.date} &bull; {study.readTime}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#07152F] mb-3 leading-snug">
                      {study.title}
                    </h2>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                      {study.excerpt}
                    </p>

                    {/* Metrics Grid */}
                    {study.metrics && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                        {study.metrics.map((m, mi) => (
                          <div
                            key={mi}
                            className="bg-white p-3 rounded-xl border border-gray-200 text-center"
                          >
                            <div className="text-lg font-bold text-[#1265E8]">{m.value}</div>
                            <div className="text-xs text-gray-500 font-medium">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Challenge & Solution details */}
                    {study.clientDetails && (
                      <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 text-xs text-gray-700 space-y-2">
                        <div>
                          <strong className="text-gray-900">Industry:</strong> {study.clientDetails.industry} ({study.clientDetails.location})
                        </div>
                        <div>
                          <strong className="text-gray-900">Challenge:</strong> {study.clientDetails.challenge}
                        </div>
                        <div>
                          <strong className="text-gray-900">Solution:</strong> {study.clientDetails.solution}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <Link
                        href={study.link}
                        className="btn bg-[#1265E8] hover:bg-[#00C8F8] text-white px-6 py-2.5 rounded-full font-semibold text-xs inline-flex items-center gap-2 transition-colors"
                      >
                        Read Full Story
                        <i className="fa-solid fa-arrow-right text-[10px]"></i>
                      </Link>
                      <Link
                        href="/contact-us.php"
                        className="btn bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-5 py-2.5 rounded-full font-semibold text-xs transition-colors"
                      >
                        Get Similar Results
                      </Link>
                    </div>
                  </div>

                  <div className="col-lg-5 text-center">
                    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 inline-block max-w-full">
                      <Image
                        src={study.image}
                        alt={study.title}
                        width={480}
                        height={320}
                        className="img-fluid object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="section cta-section py-14 bg-[#07152F] text-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to Achieve Similar Results for Your Business?
            </h2>
            <p className="text-gray-300 text-sm mb-6">
              Our enterprise photo editing services are structured to handle high volumes with fast turnaround and dedicated SLAs.
            </p>
            <Link
              href="/contact-us.php"
              className="btn bg-[#1265E8] hover:bg-[#00C8F8] text-white px-8 py-3 rounded-full font-semibold text-sm inline-block shadow-md"
            >
              Request a Pilot Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
