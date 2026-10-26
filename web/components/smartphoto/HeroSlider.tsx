"use client";

import React, { useState } from "react";
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
      "LIRISHA is a trusted outsource image editing service with over 200 professional editors, serving clients globally since 2010. Its 12-hour delivery and 100% quality output make it a top choice for professional photographers.",
    link: "/photoshop-services",
    alt: "Image Editing",
  },
  {
    id: 2,
    image: "/images/homepage/banner-2.webp",
    category: "Photo Editing",
    title: "Portrait Photo Editing Services",
    description:
      "Scalable and professional portrait photo editing services that ensure brand consistency across executive and employee profiles.",
    link: "/portrait",
    alt: "Photo Editing",
  },
  {
    id: 3,
    image: "/images/homepage/banner-3.webp",
    category: "Ecommerce Photo Editing",
    title: "Ecommerce Photo Editing Services",
    description:
      "LIRISHA provides fast, cost-effective E-Commerce Photo Editing Services, specializing in product photo retouching for key markets including the UK, US, and Australia.",
    link: "/image-manipulation/ecommerce-image-editing",
    alt: "Ecommerce Photo Editing",
  },
  {
    id: 4,
    image: "/images/homepage/banner-4.webp",
    category: "Real Estate",
    title: "Sky Replacement Editing Services",
    description:
      "Elevate your visual storytelling by transforming your images into captivating masterpieces.",
    link: "/real-estate/sky-replacement",
    alt: "Real Estate",
  },
  {
    id: 5,
    image: "/images/homepage/banner-5.webp",
    category: "Wedding Editing",
    title: "Wedding Photo Editing Services",
    description: "Impress your clients by quick turnaround time and creativity.",
    link: "/portrait/wedding-photo-editing",
    alt: "Wedding Editing",
  },
];

export interface HeroSliderProps {
  initialSlides?: SlideData[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ initialSlides }) => {
  const activeSlides = initialSlides && initialSlides.length > 0 ? initialSlides : slides;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative overflow-hidden w-full group">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade, Navigation]}
        effect="fade"
        speed={1500}
        autoplay={{
          delay: 5000,
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
              <div className="slider-container relative overflow-hidden w-full">
                <img
                  src={slide.image || fallbackBanner}
                  alt={slide.alt || "Banner"}
                  className="slide-img"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== fallbackBanner && !target.src.endsWith(fallbackBanner)) {
                      target.src = fallbackBanner;
                    }
                  }}
                  key={activeIndex === index ? `active-${index}` : `inactive-${index}`}
                />
                <div className="slide-content-title">
                  <span className="hero-category-tag">{slide.category}</span>
                  <div>{slide.title}</div>
                  <p>{slide.description}</p>
                  <a
                    href={slide.link}
                    className="butn5 butn__new butn-size inline-block"
                    aria-label={`View more about ${slide.category}`}
                  >
                    View More
                  </a>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* Sleek Navigation Arrows (Visible on desktop/tablet hover) */}
        <button
          type="button"
          className="hero-slider-prev-btn absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-12 md:h-12 rounded-full bg-slate-950/40 hover:bg-slate-900/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-2xl opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer pointer-events-auto"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 -translate-x-0.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          className="hero-slider-next-btn absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-12 md:h-12 rounded-full bg-slate-950/40 hover:bg-slate-900/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-2xl opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer pointer-events-auto"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 translate-x-0.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Attractive Bottom Centered Floating Glass Dock Pagination */}
        <div className="hero-custom-pagination swiper-pagination swiper-pagination-bullets"></div>
      </Swiper>
    </div>
  );
};
