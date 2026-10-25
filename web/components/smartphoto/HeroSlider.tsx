"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

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
    <div className="relative overflow-hidden w-full">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
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
        className="slide-swiper relative w-full"
      >
        {activeSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="slider-container relative overflow-hidden w-full">
              <img
                src={slide.image}
                alt={slide.alt}
                className="slide-img"
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
        ))}
        {/* Custom right-aligned pagination bullets */}
        <div className="hero-custom-pagination swiper-pagination swiper-pagination-bullets"></div>
      </Swiper>
    </div>
  );
};
