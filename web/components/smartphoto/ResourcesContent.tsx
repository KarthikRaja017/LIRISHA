"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ResourceArticle, TestimonialItem } from "@/types/content";
import { getResources, getTestimonials } from "@/lib/api/content";

interface ResourcesContentProps {
  initialResources?: ResourceArticle[];
  initialTestimonials?: TestimonialItem[];
}

export const ResourcesContent: React.FC<ResourcesContentProps> = ({
  initialResources,
  initialTestimonials,
}) => {
  const [resources, setResources] = useState<ResourceArticle[]>(initialResources || []);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials || []);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (!initialResources || initialResources.length === 0) {
      getResources().then((data) => {
        if (data && data.length > 0) setResources(data);
      });
    }
    if (!initialTestimonials || initialTestimonials.length === 0) {
      getTestimonials().then((data) => {
        if (data && data.length > 0) setTestimonials(data);
      });
    }
  }, [initialResources, initialTestimonials]);

  const allResources: ResourceArticle[] = resources;

  const filteredResources = allResources.filter((item) => {

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "articles" && item.category === "Articles") ||
      (activeTab === "case-study" && item.category === "Case Studies") ||
      (activeTab === "blog" && item.category === "Blog");

    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  return (
    <div className="resources-page-inner">
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
                <span className="inline-block bg-blue-50 text-[#1265E8] font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-blue-200 mb-3">
                  Knowledge Hub & Case Studies
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">
                  Resources & Insights
                </h1>
                <p className="text-base md:text-lg text-gray-600 mt-2 max-w-2xl leading-relaxed">
                  Explore practical image editing guides, real-world customer case studies, photography tips, and industry trends to scale your visual operations.
                </p>
              </div>
              <ul className="flex items-center gap-2 text-sm text-gray-600 mt-3 list-none p-0 flex-wrap">
                <li>
                  <Link href="/" className="text-[#fd5d0a] hover:underline font-medium">
                    Home
                  </Link>
                </li>
                <li className="text-gray-400">&gt;</li>
                <li className="text-gray-800 font-semibold">Resources</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH BAR */}
      <section className="py-6 bg-white border-b border-gray-200 sticky top-[76px] z-20 backdrop-blur-md bg-white/95">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "all"
                    ? "bg-[#1265E8] text-white shadow-sm"
                    : "bg-[#f8f9fa] text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                All Resources ({allResources.length})
              </button>
              <button
                onClick={() => setActiveTab("articles")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "articles"
                    ? "bg-[#1265E8] text-white shadow-sm"
                    : "bg-[#f8f9fa] text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                Articles & Guides ({resources.filter((r) => r.category === "Articles").length})
              </button>
              <button
                onClick={() => setActiveTab("case-study")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "case-study"
                    ? "bg-[#1265E8] text-white shadow-sm"
                    : "bg-[#f8f9fa] text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                Case Studies ({resources.filter((r) => r.category === "Case Studies").length})
              </button>
              <button
                onClick={() => setActiveTab("blog")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "blog"
                    ? "bg-[#1265E8] text-white shadow-sm"
                    : "bg-[#f8f9fa] text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                Blog Posts ({resources.filter((r) => r.category === "Blog").length})
              </button>
              <Link
                href="/testimonials.php"
                className="px-4 py-2 rounded-full text-sm font-medium bg-[#f8f9fa] text-gray-700 hover:text-[#1265E8] hover:bg-gray-200 border border-gray-200 transition-all inline-flex items-center gap-1.5"
              >
                <span>Testimonials</span>
                <i className="fa-solid fa-star text-yellow-500 text-xs"></i>
              </Link>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search resources, topics, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-[#1265E8] focus:ring-1 focus:ring-[#1265E8]"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  &times;
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SPOTLIGHT CARD */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-[#07152F] to-[#253670] rounded-3xl p-6 md:p-10 text-white shadow-lg overflow-hidden relative">
            <div className="row items-center">
              <div className="col-lg-7 mb-6 lg:mb-0">
                <span className="inline-block bg-[#1265E8] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  Featured Case Study
                </span>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
                  UK&apos;s Largest Automotive Seller Clips 5,000+ Car Images in 48 Hours
                </h2>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                  Learn how SmartPHOTOeditors deployed a dedicated split-shift editing team to process 5,000 vehicle cutouts, standardize showroom backgrounds, and reduce dealer turnaround by 60%.
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-xl font-bold text-[#8dce3c]">5,000+</div>
                    <div className="text-xs text-gray-300">Images Clipped</div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-xl font-bold text-white">48 Hours</div>
                    <div className="text-xs text-gray-300">Total Delivery</div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-xl font-bold text-[#8dce3c]">45%</div>
                    <div className="text-xs text-gray-300">Cost Saved</div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-xl font-bold text-white">99.4%</div>
                    <div className="text-xs text-gray-300">Pass Rate</div>
                  </div>
                </div>

                <Link
                  href="/case-study/automobile-image-clipping.php"
                  className="btn bg-[#1265E8] hover:bg-[#00C8F8] text-white px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 border-0 transition-all shadow-md"
                >
                  Read Full Case Study
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </Link>
              </div>

              <div className="col-lg-5 text-center">
                <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 inline-block max-w-full">
                  <Image
                    src="/images/homepage/case-study-2.webp"
                    alt="Automotive Image Clipping Case Study"
                    width={480}
                    height={320}
                    className="img-fluid object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN RESOURCES GRID */}
      <section className="py-12 bg-[#f8f9fa] border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#07152F]">
                {activeTab === "all"
                  ? "All Resource Publications"
                  : activeTab === "articles"
                  ? "Articles & Expert Guides"
                  : activeTab === "case-study"
                  ? "Client Case Studies"
                  : "Blog Insights & Updates"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Showing {filteredResources.length} items
              </p>
            </div>
          </div>

          {filteredResources.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <i className="fa-solid fa-folder-open text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-bold text-gray-700">No resources found</h3>
              <p className="text-sm text-gray-500 mt-1">
                Try adjusting your search terms or clearing the filter.
              </p>
              <button
                onClick={() => {
                  setActiveTab("all");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 bg-[#1265E8] text-white text-xs font-semibold rounded-full"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => {
                const isCaseStudy = resource.category === "Case Studies";
                const isArticle = resource.category === "Articles";
                const badgeColor = isCaseStudy
                  ? "bg-purple-100 text-purple-700"
                  : isArticle
                  ? "bg-blue-100 text-blue-700"
                  : "bg-emerald-100 text-emerald-700";

                return (
                  <div
                    key={resource.id}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                        <Image
                          src={resource.image}
                          alt={resource.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <span
                          className={`absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${badgeColor}`}
                        >
                          {resource.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 font-medium">
                          <span>{resource.date}</span>
                          <span>&bull;</span>
                          <span>{resource.readTime}</span>
                        </div>

                        <h3 className="text-base md:text-lg font-bold text-gray-900 hover:text-[#1265E8] transition-colors mb-2 line-clamp-2">
                          <Link href={resource.link}>{resource.title}</Link>
                        </h3>

                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                          {resource.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {resource.tags.slice(0, 3).map((tag, ti) => (
                            <span
                              key={ti}
                              className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Link */}
                    <div className="p-5 pt-0 border-t border-gray-100 mt-auto">
                      <Link
                        href={resource.link}
                        className="text-xs font-bold uppercase tracking-wider text-[#1265E8] hover:text-[#00C8F8] inline-flex items-center gap-1.5 pt-3"
                      >
                        <span>{isCaseStudy ? "View Case Study" : "Read Article"}</span>
                        <i className="fa-solid fa-arrow-right text-[10px]"></i>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 5. DOWNLOADABLE GUIDES SECTION */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="row items-center">
            <div className="col-lg-6 mb-8 lg:mb-0">
              <span className="text-[#1265E8] text-xs font-bold uppercase tracking-widest">
                Free Downloads
              </span>
              <h2 className="text-3xl font-bold text-[#07152F] mt-1 mb-3">
                Downloadable Image Editing Best Practice Cheatsheets
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Equip your photography and marketing teams with our curated PDF guides on Amazon image compliance, real estate staging checklists, and Lightroom batch shortcuts.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-file-pdf text-red-500 text-2xl"></i>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        Amazon Product Photo Compliance 2026 Checklist
                      </h4>
                      <span className="text-xs text-gray-500">PDF Guide &bull; 2.4 MB</span>
                    </div>
                  </div>
                  <Link
                    href="/contact-us.php"
                    className="btn btn-sm bg-[#07152F] hover:bg-[#253670] text-white text-xs px-3 py-1.5 rounded-lg"
                  >
                    Download
                  </Link>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-file-pdf text-red-500 text-2xl"></i>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        Real Estate HDR Bracket Shooting & Culling Guide
                      </h4>
                      <span className="text-xs text-gray-500">PDF Guide &bull; 3.8 MB</span>
                    </div>
                  </div>
                  <Link
                    href="/contact-us.php"
                    className="btn btn-sm bg-[#07152F] hover:bg-[#253670] text-white text-xs px-3 py-1.5 rounded-lg"
                  >
                    Download
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="bg-[#07152F] text-white p-8 rounded-3xl relative overflow-hidden">
                <h3 className="text-2xl font-bold mb-2">Subscribe to SPE Insights</h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6">
                  Get monthly articles, Photoshop tutorials, and exclusive outsourcing discounts delivered straight to your inbox.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you for subscribing to SmartPHOTOeditors Insights!");
                  }}
                  className="space-y-3"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email address"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#1265E8]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#1265E8] hover:bg-[#00C8F8] text-white font-semibold py-3 rounded-xl text-sm transition-all"
                  >
                    Subscribe to Newsletter
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS PREVIEW */}
      <section className="py-16 bg-[#f8f9fa] border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#07152F]">
                Trusted by Global Photography Studios
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Read what clients across North America, Europe, and Australia say about SPE.
              </p>
            </div>
            <Link
              href="/testimonials.php"
              className="text-xs font-bold uppercase tracking-wider text-[#1265E8] hover:underline inline-flex items-center gap-1.5"
            >
              <span>View All 50+ Testimonials</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-yellow-400 mb-3 text-xs">
                    {[...Array(item.rating)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 italic leading-relaxed mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="text-xs font-bold text-gray-900">{item.author}</div>
                    <div className="text-[11px] text-gray-500">{item.role}, {item.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HIGH CONVERTING CTA */}
      <div className="section cta-section py-14 bg-white border-t border-gray-200 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Need a Custom Solution for Your Business?
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Connect with our editing directors to discuss project SLAs, dedicated editor staffing, and custom volume pricing.
            </p>
            <Link
              href="/contact-us.php"
              className="btn bg-[#1265E8] hover:bg-[#00C8F8] text-white px-8 py-3 rounded-full font-semibold text-sm inline-block shadow-md"
            >
              Get in Touch with an Expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
