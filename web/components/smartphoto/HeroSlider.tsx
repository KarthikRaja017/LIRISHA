"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

interface SlideData {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  link: string;
  alt: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    image: "/images/homepage/banner-1.webp",
    category: "Image Editing",
    title: "Professional Image Editing Services",
    description:
      "LIRISHA is a premier outsourced image post-processing studio with over 200 dedicated artists. Guaranteed 12–24h turnaround, pixel-perfect accuracy, and ISO-certified consistency for top commercial photographers.",
    link: "/photoshop-services",
    alt: "Image Editing Services",
  },
  {
    id: 2,
    image: "/images/homepage/banner-2.webp",
    category: "Portrait Retouching",
    title: "High-End Portrait Photo Retouching",
    description:
      "Flawless frequency separation, realistic skin texture retention, digital makeup, and background cleanup that preserves identity while elevating editorial impact.",
    link: "/portrait",
    alt: "Portrait Photo Editing Services",
  },
  {
    id: 3,
    image: "/images/homepage/banner-3.webp",
    category: "Ecommerce Visuals",
    title: "High-Volume Ecommerce Product Editing",
    description:
      "Amazon, Shopify, and eBay marketplace-compliant pure white backgrounds (#FFFFFF), invisible ghost mannequin composites, and natural cast shadows tailored for brand catalogs.",
    link: "/image-manipulation/ecommerce-image-editing",
    alt: "Ecommerce Photo Editing Services",
  },
  {
    id: 4,
    image: "/images/homepage/banner-4.webp",
    category: "Real Estate",
    title: "Architectural & Sky Replacement Editing",
    description:
      "Transform overcast properties into golden-hour masterworks. Complete with HDR exposure blending, window masking, 360 virtual tours, and perspective corrections.",
    link: "/real-estate/sky-replacement",
    alt: "Real Estate Sky Replacement Services",
  },
  {
    id: 5,
    image: "/images/homepage/banner-5.webp",
    category: "Wedding & Events",
    title: "Bespoke Wedding Photo Retouching",
    description:
      "Speed up your studio delivery without compromising your signature style. Consistent batch color grading, skin smoothing, stray hair removal, and artistic enhancements.",
    link: "/portrait/wedding-photo-editing",
    alt: "Wedding Photo Editing Services",
  },
];

export interface HeroSliderProps {
  initialSlides?: SlideData[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ initialSlides }) => {
  const activeSlides = initialSlides && initialSlides.length > 0 ? initialSlides : slides;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative overflow-hidden w-full group bg-slate-950">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade, Navigation]}
        effect="fade"
        speed={1400}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        pagination={{
          clickable: true,
          el: ".hero-custom-pagination",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        navigation={{
          prevEl: ".hero-slider-prev-btn",
          nextEl: ".hero-slider-next-btn",
        }}
        className="slide-swiper relative w-full"
      >
        {activeSlides.map((slide, index) => {
          const fallbackBanner = slides[index % slides.length]?.image || "/images/homepage/banner-1.webp";
          return (
            <SwiperSlide key={slide.id || index}>
              <div className="relative overflow-hidden w-full h-[75dvh] min-h-[580px] lg:h-[86dvh] lg:min-h-[660px]">
                {/* Background Image with Ken Burns Zoom */}
                <img
                  src={slide.image || fallbackBanner}
                  alt={slide.alt || "Banner"}
                  className="slide-img absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== fallbackBanner && !target.src.endsWith(fallbackBanner)) {
                      target.src = fallbackBanner;
                    }
                  }}
                  key={activeIndex === index ? `active-${index}` : `inactive-${index}`}
                />

                {/* Cinematic Vignette & Ambient Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/65 to-slate-950/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />

                {/* Content Container */}
                <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                  <div className="max-w-xl lg:max-w-2xl py-12">
                    {/* Eyebrow Pill */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-cyan-300 bg-cyan-950/70 border border-cyan-400/40 backdrop-blur-md mb-5 shadow-lg shadow-cyan-950/50">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00C8F8] animate-pulse" />
                      <span>{slide.category}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4 drop-shadow-md">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 drop-shadow max-w-xl">
                      {slide.description}
                    </p>

                    {/* CTA Button Group */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                      <Link
                        href={slide.link}
                        className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                        aria-label={`Explore ${slide.category}`}
                      >
                        <span>Explore Services</span>
                        <i className="fa-solid fa-arrow-right text-xs transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>

                      <Link
                        href="/contact-us"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white rounded-full bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                      >
                        <span>Claim 5 Free Edits</span>
                      </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-white/15 text-xs font-semibold text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <i className="fa-solid fa-bolt text-cyan-400 text-xs" />
                        <span>12–24h Rush Turnaround</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <i className="fa-solid fa-shield-halved text-cyan-400 text-xs" />
                        <span>ISO 9001 &amp; Bilateral NDA</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <i className="fa-solid fa-users text-cyan-400 text-xs" />
                        <span>200+ Adobe Certified Artists</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* Desktop Navigation Arrows */}
        <button
          type="button"
          className="hero-slider-prev-btn absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-950/50 hover:bg-slate-900/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-2xl opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 -translate-x-0.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          className="hero-slider-next-btn absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-950/50 hover:bg-slate-900/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-2xl opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 translate-x-0.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom Floating Glass Dock Pagination */}
        <div className="hero-custom-pagination swiper-pagination swiper-pagination-bullets"></div>
      </Swiper>
    </div>
  );
};
