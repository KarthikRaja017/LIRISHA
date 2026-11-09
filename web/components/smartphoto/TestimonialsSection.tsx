"use client";

import React from "react";
import Link from "next/link";

export interface HomeReviewItem {
  id?: string | number;
  quote: string;
  authorRole: string;
  authorCompany: string;
  avatar: string;
  boxStyle?: "dark" | "white";
}

export interface HomeTestimonialsData {
  headingLine1?: string;
  headingLine2?: string;
  ctaText?: string;
  ctaLink?: string;
  items?: HomeReviewItem[];
}

interface TestimonialsSectionProps {
  initialData?: HomeTestimonialsData;
}

const defaultReviews: HomeReviewItem[] = [
  {
    id: 1,
    quote:
      "Their retouches are always sharp, authentic, and delivered right on schedule. They quickly grasped our luxury jewelry guidelines and made our production line completely frictionless.",
    authorRole: "Senior Brand Director",
    authorCompany: "Jewelry & Luxury Goods, UK",
    avatar: "/images/homepage/testi-user1.webp",
  },
  {
    id: 2,
    quote:
      "LIRISHA always nails our architectural and real estate edits. Color accuracy, window pull masks, and sky blending look flawless. They feel like a natural extension of our local studio.",
    authorRole: "Lead Photography Director",
    authorCompany: "Commercial Studio, Australia",
    avatar: "/images/homepage/testi-user2.webp",
  },
  {
    id: 3,
    quote:
      "Our seasonal catalog turned out exponentially better than previous outsourcing vendors. Fast turnaround, proactive communication, and zero quality variance across 5,000+ SKUs.",
    authorRole: "Head of Digital Marketing",
    authorCompany: "Apparel & Retail, Singapore",
    avatar: "/images/homepage/testi-user3.webp",
  },
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ initialData }) => {
  const heading1 = initialData?.headingLine1 || "Trusted by Professional";
  const heading2 = initialData?.headingLine2 || "Photographers & Studios Worldwide";
  const ctaText = initialData?.ctaText || "Read All Reviews";
  const ctaLink = initialData?.ctaLink || "/testimonials";
  const reviews =
    initialData?.items && initialData.items.length > 0 ? initialData.items : defaultReviews;

  return (
    <section className="py-24 bg-[#080C14] text-white relative overflow-hidden">
      {/* Ambient Radial Spotlight */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-400/30 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Client Endorsements</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {heading1}{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {heading2}
              </span>
            </h2>
          </div>

          <Link
            href={ctaLink}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shrink-0"
          >
            <span>{ctaText}</span>
            <i className="fa-solid fa-arrow-right text-[10px]" />
          </Link>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-7 lg:p-8 flex flex-col justify-between hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 text-sm mb-5">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star" />
                  ))}
                </div>

                <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-5 border-t border-white/10">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0 bg-slate-800">
                  <img
                    src={rev.avatar}
                    alt={rev.authorRole}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = "/images/homepage/testi-user1.webp";
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {rev.authorRole}
                  </h4>
                  <p className="text-xs text-slate-400">{rev.authorCompany}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
