"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ResourceArticle } from "@/types/content";
import { getResources } from "@/lib/api/content";

interface BlogContentProps {
  initialPosts?: ResourceArticle[];
}

export const BlogContent: React.FC<BlogContentProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<ResourceArticle[]>(initialPosts || []);

  useEffect(() => {
    if (!initialPosts || initialPosts.length === 0) {
      getResources("Blog").then((data) => {
        if (data && data.length > 0) setPosts(data);
      });
    }
  }, [initialPosts]);

  return (
    <div className="blog-page-inner">
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
                <span className="inline-block bg-orange-50 text-[#ff5b0a] font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-orange-200 mb-3">
                  Industry News & Opinions
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">
                  SmartPHOTOeditors Blog
                </h1>
                <p className="text-base md:text-lg text-gray-600 mt-2 max-w-2xl leading-relaxed">
                  Stay ahead with trends in AI-assisted image editing, human-in-the-loop retouching, conversion optimization, and studio workflow tips.
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
                <li className="text-gray-800 font-semibold">Blog</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-14 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 shadow-sm">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 font-medium">
                      <span>{post.date}</span>
                      <span>&bull;</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-gray-900 hover:text-[#ff5b0a] transition-colors mb-2 line-clamp-2">
                      <Link href={post.link}>{post.title}</Link>
                    </h3>

                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {post.tags.map((tag, ti) => (
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

                <div className="p-5 pt-0 border-t border-gray-100 mt-auto">
                  <Link
                    href={post.link}
                    className="text-xs font-bold uppercase tracking-wider text-[#ff5b0a] hover:text-[#e04f05] inline-flex items-center gap-1.5 pt-3"
                  >
                    <span>Read Full Post</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="section cta-section py-14 bg-white border-t border-gray-200 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Want to Outsource Your Studio Editing?
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Focus on shooting while our team handles the post-production heavy lifting.
            </p>
            <Link
              href="/contact-us.php"
              className="btn bg-[#ff5b0a] hover:bg-[#e04f05] text-white px-8 py-3 rounded-full font-semibold text-sm inline-block shadow-md"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
