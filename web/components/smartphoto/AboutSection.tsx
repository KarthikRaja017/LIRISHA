"use client";

import React from "react";
import Link from "next/link";

export interface AboutSectionProps {
  initialData?: {
    heading?: string;
    para1?: string;
    para2?: string;
  };
}

export const AboutSection: React.FC<AboutSectionProps> = ({ initialData }) => {
  const heading = initialData?.heading || "About LIRISHA Image Editing Specialists";
  const para1 =
    initialData?.para1 ||
    "LIRISHA is a global team of skilled photo editing specialists dedicated to absolute quality, precision, and delivery excellence. Comprised of experienced artists, LIRISHA channels collective domain knowledge towards transforming raw photos and commercial assets while consistently surpassing studio expectations.";
  const para2 =
    initialData?.para2 ||
    "We observed busy commercial photographers and creative agencies juggling between demanding shoots and exhausting post-processing. We stepped in as a seamless extension of their in-house team — delivering overnight turnarounds with 100% style consistency.";

  const pillars = [
    {
      icon: "fa-solid fa-bolt",
      title: "12–24h Overnight Delivery",
      desc: "Shoot by day, have high-resolution retouched files ready on your desk the next morning.",
    },
    {
      icon: "fa-solid fa-award",
      title: "200+ Certified Artists",
      desc: "Specialized teams for clipping, high-end skin retouching, jewelry, and architecture.",
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "Bilateral NDA & SFTP",
      desc: "Bank-grade data security with biometrically restricted terminals and zero data leakage.",
    },
    {
      icon: "fa-solid fa-sliders",
      title: "Custom Style Calibration",
      desc: "We adapt directly to your presets, color profiles, layer conventions, and delivery formats.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-6 space-y-6 reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>Who We Are</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {heading}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {para1}
            </p>

            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              {para2}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-blue-600 transition-colors shadow-md"
              >
                <span>Learn More About Us</span>
                <i className="fa-solid fa-arrow-right text-[10px]" />
              </Link>

              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <span>Request Sample Batch</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Trust Pillars Bento Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-group">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200 group reveal-card"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-lg mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                  <i className={pillar.icon} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
