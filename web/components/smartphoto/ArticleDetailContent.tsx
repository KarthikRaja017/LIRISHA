"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ResourceArticle } from "@/types/content";
import { getResourceBySlug, getResources } from "@/lib/api/content";


interface ArticleDetailProps {
  slug: string;
  type?: "article" | "blog";
  initialItem?: ResourceArticle;
}

export const ArticleDetailContent: React.FC<ArticleDetailProps> = ({
  slug,
  type = "article",
  initialItem,
}) => {
  const normalizedSlug = slug.replace(/\.php$/, "");
  const [item, setItem] = useState<ResourceArticle>(
    initialItem || {
      id: "default",
      slug: normalizedSlug,
      category: type === "blog" ? "Blog" : "Articles",
      title: "Mastering Professional Digital Image Editing & Retouching Workflows",
      excerpt:
        "Comprehensive techniques, industry benchmarks, and post-production strategies to deliver flawless visual experiences for commercial photography, e-commerce, and luxury brands.",
      date: "2026",
      author: "Editorial Team",
      readTime: "5 min read",
      image: "/images/homepage/real-estate.webp",
      link: `/articles/${normalizedSlug}`,
      tags: ["Image Editing", "Retouching", "Best Practices", "Workflows"],
    }
  );

  const [relatedItems, setRelatedItems] = useState<ResourceArticle[]>([]);

  useEffect(() => {
    if (!initialItem && slug) {
      getResourceBySlug(normalizedSlug).then((data) => {
        if (data) setItem(data);
      });
    }
  }, [slug, normalizedSlug, initialItem]);

  useEffect(() => {
    getResources().then((data) => {
      if (data) {
        setRelatedItems(data.filter((a) => a.id !== item.id).slice(0, 4));
      }
    });
  }, [item.id]);



  return (
    <div className="article-detail-page">
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
                  <i className="fa-solid fa-newspaper"></i>
                  <span>{item.category}</span>
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  {item.title}
                </h1>
                <div className="flex items-center gap-4 text-xs md:text-sm text-gray-600 mt-2 flex-wrap">
                  <span className="font-semibold text-gray-900">
                    <i className="fa-solid fa-user-pen mr-1 text-[#ff5b0a]"></i>
                    {item.author}
                  </span>
                  <span>•</span>
                  <span>
                    <i className="fa-regular fa-calendar mr-1 text-gray-400"></i>
                    {item.date}
                  </span>
                  <span>•</span>
                  <span>
                    <i className="fa-regular fa-clock mr-1 text-gray-400"></i>
                    {item.readTime}
                  </span>
                </div>
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
                  <Link
                    href={type === "blog" ? "/blog" : "/articles"}
                    className="text-[#fd5d0a] hover:underline font-medium"
                  >
                    {item.category}
                  </Link>
                </li>
                <li className="text-gray-400">&gt;</li>
                <li className="text-gray-800 font-semibold truncate max-w-xs">{item.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARTICLE BODY & SIDEBAR */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="row">
            {/* Main Content Column */}
            <div className="col-lg-8 mb-12 lg:mb-0">
              <div className="relative h-[320px] md:h-[450px] rounded-3xl overflow-hidden mb-8 shadow-md border border-gray-200">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Lead Excerpt */}
              <div className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed mb-8 border-l-4 border-[#ff5b0a] pl-5 py-1 bg-orange-50/50 rounded-r-2xl">
                {item.excerpt}
              </div>

              {/* Rich Formatted Article Content */}
              <div className="prose prose-lg max-w-none text-gray-700 space-y-6 leading-relaxed">
                <h2 className="text-2xl font-bold text-[#1c2a5a] mt-8 mb-4">
                  1. The Strategic Importance of Post-Production Excellence
                </h2>
                <p>
                  In the visual-first digital economy, images are often the very first touchpoint between a potential buyer and a brand or real estate property. Whether browsing an e-commerce catalog, researching an architectural listing, or viewing a luxury headshot, image clarity, lighting balance, and color fidelity directly dictate customer confidence and purchasing intent.
                </p>
                <p>
                  High-caliber editing bridges the gap between raw camera capture and polished, publication-ready perfection. Professional post-production eliminates distractions, balances complex multi-source lighting, and standardizes color calibration across thousands of assets.
                </p>

                <h2 className="text-2xl font-bold text-[#1c2a5a] mt-8 mb-4">
                  2. Core Best Practices & Technical Execution
                </h2>
                <p>
                  Achieving repeatable, high-volume consistency requires a disciplined non-destructive workflow utilizing industry-standard software like Adobe Photoshop CC and Adobe Lightroom Classic:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>Non-Destructive Layer Stacking:</strong> Keeping frequency separation, Dodge & Burn, and color grading on isolated adjustment layers ensures infinite revision capability.
                  </li>
                  <li>
                    <strong>Strict Color Management:</strong> Calibrating workflows against sRGB for web performance and AdobeRGB/CMYK for luxury print catalogs to guarantee true-to-life color consistency.
                  </li>
                  <li>
                    <strong>Handcrafted Pen Tool Precision:</strong> Hand-drawing vector clipping paths zooming up to 300% to avoid jagged pixel fringing and harsh artificial halos.
                  </li>
                  <li>
                    <strong>Multi-Exposure High Dynamic Range:</strong> Blending bracketed exposures naturally to preserve both delicate window views and subtle indoor ambient lighting.
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-[#1c2a5a] mt-8 mb-4">
                  3. Key Takeaways & Operational Efficiency
                </h2>
                <p>
                  By partnering with a dedicated back-office editing partner like SmartPHOTOeditors, photography studios and enterprises eliminate production bottlenecks, reduce fixed overhead, and guarantee strict 12-to-24-hour turnaround times for peak seasonal demand.
                </p>
              </div>

              {/* Tags & Social Share */}
              <div className="mt-12 pt-6 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase text-gray-500">Tags:</span>
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-gray-500">Share:</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      typeof window !== "undefined" ? window.location.href : ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-90"
                  >
                    <i className="fa-brands fa-facebook-f text-xs"></i>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90"
                  >
                    <i className="fa-brands fa-x-twitter text-xs"></i>
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(
                      item.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center hover:opacity-90"
                  >
                    <i className="fa-brands fa-linkedin-in text-xs"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="col-lg-4">
              <div className="sticky top-24 space-y-6">
                {/* Free Sample CTA Box */}
                <div className="bg-gradient-to-br from-[#1c2a5a] to-[#0f172a] text-white p-6 rounded-3xl shadow-lg">
                  <span className="text-[#ff5b0a] text-xs font-bold uppercase tracking-wider">
                    Free Trial Editing
                  </span>
                  <h4 className="text-xl font-bold mt-2 mb-3">
                    Test Our Editing Quality With No Obligation
                  </h4>
                  <p className="text-gray-300 text-xs leading-relaxed mb-6">
                    Upload your sample files today and experience our 12-24h turnaround, color fidelity, and handcrafted precision.
                  </p>
                  <Link
                    href="/contact-us.php"
                    className="block text-center bg-[#ff5b0a] hover:bg-[#e04f05] text-white py-3 rounded-full font-bold text-sm shadow-md transition-colors"
                  >
                    Get Free Sample Edit
                  </Link>
                </div>

                {/* Related Articles Box */}
                <div className="bg-[#f8f9fa] p-6 rounded-3xl border border-gray-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 pb-2 border-b border-gray-200">
                    Recommended Reads
                  </h4>
                  <div className="space-y-4">
                    {relatedItems.map((rel) => (
                        <div key={rel.id} className="group">
                          <Link href={rel.link} className="block">
                            <span className="text-[11px] font-bold text-[#ff5b0a] uppercase tracking-wider">
                              {rel.category}
                            </span>
                            <h5 className="text-sm font-bold text-gray-900 group-hover:text-[#ff5b0a] transition-colors leading-snug mt-0.5">
                              {rel.title}
                            </h5>
                            <span className="text-xs text-gray-400 mt-1 block">
                              {rel.readTime}
                            </span>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
