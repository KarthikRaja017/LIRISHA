"use client";

import React from "react";

export interface StatItem {
  count: string;
  label: string;
  icon: string;
  alt?: string;
  iconClass?: string;
}

export interface CounterSectionProps {
  initialStats?: StatItem[];
}

export const CounterSection: React.FC<CounterSectionProps> = ({ initialStats }) => {
  const defaultStats: StatItem[] = [
    {
      count: "13+",
      label: "Years of Studio Craft",
      icon: "/images/homepage/icon-experience.webp",
      alt: "Years of Experience",
    },
    {
      count: "1000+",
      label: "Enterprise Projects Completed",
      icon: "/images/homepage/icon-projects.webp",
      alt: "Completed Projects",
    },
    {
      count: "1300+",
      label: "Global Photographers & Studios",
      icon: "/images/homepage/icon-clients.webp",
      alt: "Happy Clients",
    },
    {
      count: "05+",
      label: "International Industry Awards",
      icon: "/images/homepage/icon-award.webp",
      alt: "Awards Rewarded",
    },
  ];

  const activeStats = initialStats && initialStats.length > 0 ? initialStats : defaultStats;

  return (
    <section className="relative z-20 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 reveal-group">
        {activeStats.map((stat, idx) => (
          <div
            key={idx}
            className="group relative reveal-card bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.1)] hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                {stat.count}
              </span>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <img
                  src={stat.icon}
                  alt={stat.alt || stat.label}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                />
              </div>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
