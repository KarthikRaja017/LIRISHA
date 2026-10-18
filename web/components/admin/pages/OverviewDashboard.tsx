"use client";

import React from "react";
import Link from "next/link";
import { ServiceCategory, ResourceArticle, TestimonialItem, GalleryTab, PageContent } from "@/types/content";

interface OverviewDashboardProps {
  pages: PageContent[];
  services: ServiceCategory[];
  resources: ResourceArticle[];
  testimonials: TestimonialItem[];
  gallery: GalleryTab[];
  onSelectMenu: (menuId: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  pages,
  services,
  resources,
  testimonials,
  gallery,
  onSelectMenu,
}) => {
  const pageCards = [
    {
      id: "home",
      title: "Home Page",
      route: "/",
      icon: "fa-house",
      color: "from-orange-500 to-[#ff5b0a]",
      description: "Hero slider (5 slides), statistics counters, SPE narrative, video showcase, and FAQs.",
      countLabel: "Full Control",
      count: "8 Sections",
    },
    {
      id: "about-us",
      title: "About Us Page",
      route: "/about-us",
      icon: "fa-circle-info",
      color: "from-blue-600 to-indigo-700",
      description: "Company overview story, banner graphics, historical milestones, and mission pledges.",
      countLabel: "Status",
      count: "Published",
    },
    {
      id: "services",
      title: "Services Catalog Pages",
      route: "/services",
      icon: "fa-layer-group",
      color: "from-amber-500 to-orange-600",
      description: "Portrait, Real Estate, Fashion, Image Clipping, Photoshop, and 360 Panorama sub-services.",
      countLabel: "Active Services",
      count: `${services.length} Pages`,
    },
    {
      id: "pricing",
      title: "Pricing Page",
      route: "/pricing",
      icon: "fa-tag",
      color: "from-emerald-600 to-teal-700",
      description: "Per-image pricing tiers, custom quote retainer models, and high-volume discount rates.",
      countLabel: "Status",
      count: "Live",
    },
    {
      id: "turnaround-time",
      title: "Turnaround Time Page",
      route: "/turnaround-time",
      icon: "fa-clock",
      color: "from-cyan-600 to-blue-700",
      description: "12-hour express, 24-hour standard SLAs, and round-the-clock global shift coverage.",
      countLabel: "Status",
      count: "Live",
    },
    {
      id: "quality",
      title: "Quality Assurance Page",
      route: "/quality",
      icon: "fa-certificate",
      color: "from-yellow-500 to-amber-600",
      description: "3-tier Adobe certified QC workflow, zero-defect inspections, and 100% satisfaction guarantees.",
      countLabel: "Status",
      count: "Live",
    },
    {
      id: "sample-images",
      title: "Sample Images & Gallery",
      route: "/sample-images",
      icon: "fa-images",
      color: "from-pink-600 to-rose-600",
      description: "Interactive before/after image comparison sliders categorized by photography service type.",
      countLabel: "Categories",
      count: `${gallery.length} Tabs`,
    },
    {
      id: "testimonials",
      title: "Testimonials Page",
      route: "/testimonials",
      icon: "fa-comments",
      color: "from-violet-600 to-purple-700",
      description: "Real client quotes, commercial studio feedback, ratings, and client avatar photos.",
      countLabel: "Client Reviews",
      count: `${testimonials.length} Reviews`,
    },
    {
      id: "resources",
      title: "Case Studies & Articles",
      route: "/case-study",
      icon: "fa-newspaper",
      color: "from-purple-600 to-indigo-600",
      description: "In-depth case studies with client ROI metrics, technical retouching articles, and blogs.",
      countLabel: "Published",
      count: `${resources.length} Posts`,
    },
    {
      id: "contact-us",
      title: "Contact Us Page",
      route: "/contact-us",
      icon: "fa-envelope",
      color: "from-sky-500 to-blue-600",
      description: "Phone numbers, email addresses, production shift hours, and free trial quote inquiries.",
      countLabel: "Status",
      count: "Live",
    },
    {
      id: "security",
      title: "Security & Compliance",
      route: "/security",
      icon: "fa-shield-halved",
      color: "from-slate-700 to-slate-900",
      description: "Bilateral NDAs, 256-bit SSL encryption, air-gapped terminals, and 30-day data purges.",
      countLabel: "Status",
      count: "Live",
    },
    {
      id: "privacy-policy",
      title: "Privacy Policy Page",
      route: "/privacy-policy",
      icon: "fa-scale-balanced",
      color: "from-slate-600 to-slate-800",
      description: "Data collection statements, cookie terms, and GDPR/CCPA consumer disclosures.",
      countLabel: "Status",
      count: "Live",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Sleek Compact Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-4 sm:p-5 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#ff5b0a]/20 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-orange-300 font-bold text-[10px] uppercase tracking-wider mb-2">
              <i className="fa-solid fa-sparkles text-[#ff5b0a]"></i>
              <span>Universal CMS Control Deck</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Page-Wise Content Studio
            </h2>
            <p className="text-slate-300 text-xs mt-1 max-w-2xl leading-relaxed">
              Full autonomous control over every single page on the website. Select any page from the sidebar menu or click on any page card below to customize content, images, statistics, and SEO metadata live.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                <i className="fa-solid fa-database animate-pulse"></i>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400 leading-tight">Database</p>
                <p className="text-xs font-bold text-white">PostgreSQL Connected</p>
              </div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#ff5b0a]/20 text-[#ff5b0a] flex items-center justify-center font-bold text-xs">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400 leading-tight">Publish State</p>
                <p className="text-xs font-bold text-white">Instant Dynamic Sync</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3.5 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-2.5 sm:p-3 border border-white/10">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Managed Pages</span>
            <span className="text-lg sm:text-xl font-black text-white mt-0.5 block">12 Pages</span>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5 sm:p-3 border border-white/10">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Services Catalog</span>
            <span className="text-lg sm:text-xl font-black text-orange-400 mt-0.5 block">{services.length} Pillars</span>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5 sm:p-3 border border-white/10">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Client Reviews</span>
            <span className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5 block">{testimonials.length} Reviews</span>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5 sm:p-3 border border-white/10">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Case Studies</span>
            <span className="text-lg sm:text-xl font-black text-cyan-400 mt-0.5 block">{resources.length} Articles</span>
          </div>
        </div>
      </div>

      {/* Adaptive Page-by-Page Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
        {pageCards.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelectMenu(card.id)}
            className="cursor-pointer bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-lg hover:border-[#ff5b0a] transition-all flex flex-col justify-between group transform hover:-translate-y-0.5 duration-150"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center text-sm shadow-xs group-hover:scale-105 transition-transform`}>
                  <i className={`fa-solid ${card.icon}`}></i>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap shrink-0">
                  {card.route}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#ff5b0a] transition-colors truncate">
                {card.title}
              </h3>
              <p className="text-[11px] text-slate-600 font-medium mt-1 leading-normal line-clamp-2">
                {card.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">{card.countLabel}</span>
                <span className="text-xs font-black text-slate-900">{card.count}</span>
              </div>

              <div className="px-2.5 py-1 rounded-lg bg-orange-50 group-hover:bg-[#ff5b0a] text-[#ff5b0a] group-hover:text-white flex items-center gap-1 text-[11px] font-bold transition-all shadow-2xs whitespace-nowrap shrink-0">
                <span>Edit</span>
                <i className="fa-solid fa-arrow-right text-[9px] group-hover:translate-x-0.5 transition-transform"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
