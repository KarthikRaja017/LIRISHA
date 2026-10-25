"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialItem } from "@/types/content";
import { getTestimonials } from "@/lib/api/content";
import { BrandLoader } from "@/components/ui/BrandLoader";

interface TestimonialsContentProps {
  initialTestimonials?: TestimonialItem[];
}

export const TestimonialsContent: React.FC<TestimonialsContentProps> = ({ initialTestimonials }) => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials || []);
  const [loading, setLoading] = useState(!initialTestimonials || initialTestimonials.length === 0);
  const [filterRegion, setFilterRegion] = useState<string>("All");

  useEffect(() => {
    if (!initialTestimonials || initialTestimonials.length === 0) {
      setLoading(true);
      getTestimonials()
        .then((data) => {
          if (data && data.length > 0) setTestimonials(data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [initialTestimonials]);

  const regions = ["All", "USA", "United Kingdom", "Sweden", "Germany"];

  const filteredTestimonials =
    filterRegion === "All"
      ? testimonials
      : testimonials.filter((t) => t.location && t.location.includes(filterRegion));

  if (loading && testimonials.length === 0) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-[#07152F]">
        <BrandLoader
          size="lg"
          message="Loading Client Reviews..."
          subMessage="Fetching verified testimonials from database"
        />
      </div>
    );
  }

  return (
    <div className="testimonials-page-inner">
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
              <div className="banner-title-block mb-3">
                <div className="banner-badge-attractive">
                  <span className="banner-badge-dot"></span>
                  <span>Customer Reviews &amp; Ratings</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">
                  Client Testimonials
                </h1>
                <p className="text-base md:text-lg text-gray-600 mt-2 max-w-2xl leading-relaxed">
                  Discover how professional photographers, studios, and e-commerce brands achieve consistent quality and rapid turnarounds with SmartPHOTOeditors.
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
                <li className="text-gray-800 font-semibold">Testimonials</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER REGION BAR */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-xs font-bold uppercase text-gray-400 mr-2">Filter by Region:</span>
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setFilterRegion(reg)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterRegion === reg
                    ? "bg-[#1265E8] text-white shadow-sm"
                    : "bg-[#f8f9fa] text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS GRID */}
      <section className="py-14 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                      {[...Array(t.rating)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star"></i>
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">
                      Verified Review
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm italic leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <div className="flex items-center gap-3">
                    <Image
                      src={t.avatar}
                      alt={t.author}
                      width={48}
                      height={48}
                      className="rounded-full border border-gray-200 object-cover"
                    />
                    <div>
                      <div className="text-sm font-bold text-gray-900">{t.author}</div>
                      <div className="text-xs text-gray-600 font-medium">{t.role}</div>
                      <div className="text-xs text-[#1265E8]">{t.company} &bull; {t.location}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] text-gray-500 bg-gray-50 p-2 rounded-lg">
                    <strong className="text-gray-700">Project:</strong> {t.projectType}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto cta-card-attractive p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C8F8]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1265E8]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block text-[#00C8F8] text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[rgba(0,200,248,0.1)] rounded-full border border-[rgba(0,200,248,0.2)] mb-4">
                Client Trust & Excellence
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Join Over 1,300+ Satisfied Photography Businesses
              </h2>
              <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                Experience the quality and speed that leading studios worldwide trust every single day.
              </p>
              <div className="flex justify-center items-center gap-4 flex-wrap">
                <Link
                  href="/contact-us"
                  className="btn-brand-primary px-8 py-3.5 rounded-full font-semibold text-base shadow-xl inline-flex items-center gap-2"
                >
                  Get Free Test Edits
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </Link>
                <Link
                  href="/sample-images"
                  className="btn bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3.5 rounded-full font-semibold text-base transition-all inline-flex items-center gap-2"
                >
                  View Sample Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
