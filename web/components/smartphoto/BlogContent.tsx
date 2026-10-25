"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ResourceArticle } from "@/types/content";
import { getResources } from "@/lib/api/content";
import { BrandLoader } from "@/components/ui/BrandLoader";

interface BlogContentProps {
  initialPosts?: ResourceArticle[];
}

export const BlogContent: React.FC<BlogContentProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<ResourceArticle[]>(initialPosts || []);
  const [loading, setLoading] = useState(!initialPosts || initialPosts.length === 0);

  useEffect(() => {
    if (!initialPosts || initialPosts.length === 0) {
      setLoading(true);
      getResources("Blog")
        .then((data) => {
          if (data && data.length > 0) setPosts(data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [initialPosts]);

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-[#07152F]">
        <BrandLoader
          size="lg"
          message="Loading Blog Posts..."
          subMessage="Fetching latest insights from database"
        />
      </div>
    );
  }

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
              <div className="banner-title-block mb-3">
                <div className="banner-badge-attractive">
                  <span className="banner-badge-dot"></span>
                  <span>Industry News &amp; Updates</span>
                </div>
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
            {posts.map((post) => {
              const postLink = post.link && post.link.startsWith('/blog') ? post.link : `/blog/${post.slug}`;
              return (
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
                    <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-[#1265E8] shadow-sm">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 font-medium">
                      <span>{post.date}</span>
                      <span>&bull;</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-gray-900 hover:text-[#1265E8] transition-colors mb-2 line-clamp-2">
                      <Link href={postLink}>{post.title}</Link>
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
                    href={postLink}
                    className="text-xs font-bold uppercase tracking-wider text-[#1265E8] hover:text-[#00C8F8] inline-flex items-center gap-1.5 pt-3"
                  >
                    <span>Read Full Post</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </Link>
                </div>
              </div>
              );
            })}
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
                Scale Your Creative Business
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Want to Outsource Your Studio Editing?
              </h2>
              <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                Focus on shooting and growing your business while our team handles the post-production heavy lifting.
              </p>
              <div className="flex justify-center items-center gap-4 flex-wrap">
                <Link
                  href="/contact-us"
                  className="btn-brand-primary px-8 py-3.5 rounded-full font-semibold text-base shadow-xl inline-flex items-center gap-2"
                >
                  Get a Free Quote
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
