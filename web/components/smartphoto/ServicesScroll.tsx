"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ServiceCardItem {
  id?: string | number;
  title: string;
  link: string;
  image: string;
  alt?: string;
}

export interface ServicesScrollData {
  headingLine1?: string;
  headingLine2?: string;
  items?: ServiceCardItem[];
}

interface ServicesScrollProps {
  initialData?: ServicesScrollData;
}

const defaultCards: ServiceCardItem[] = [
  {
    id: 1,
    title: "Furniture Photo Editing",
    link: "/virtual-staging/furniture-photo-editing",
    image: "/images/homepage/furniture-photo-editing.webp",
    alt: "Furniture Photo Editing Services",
  },
  {
    id: 2,
    title: "2D & 3D Floor Plan",
    link: "/real-estate/floor-plan-conversions",
    image: "/images/homepage/2d-3d-floor-plan.webp",
    alt: "2D & 3D Floor Plan Services",
  },
  {
    id: 3,
    title: "Ecommerce Image Editing",
    link: "/image-manipulation/ecommerce-image-editing",
    image: "/images/homepage/ecommerce-image-editing.webp",
    alt: "Ecommerce Image Editing Services",
  },
  {
    id: 4,
    title: "Image Cliping",
    link: "/image-clipping/",
    image: "/images/homepage/image-cliping.webp",
    alt: "Image Cliping Services",
  },
  {
    id: 5,
    title: "Jewelry Image Retouching",
    link: "/jewelry/",
    image: "/images/homepage/jewellery-retouching.webp",
    alt: "Jewelry Image Retouching Services",
  },
  {
    id: 6,
    title: "Real Estate",
    link: "/real-estate/",
    image: "/images/homepage/real-estate.webp",
    alt: "Real Estate Services",
  },
];

export const ServicesScroll: React.FC<ServicesScrollProps> = ({ initialData }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const heading1 = initialData?.headingLine1 || "Our Professional";
  const heading2 = initialData?.headingLine2 || "Image Editing Services";
  const cards = initialData?.items && initialData.items.length > 0 ? initialData.items : defaultCards;

  // Group cards into pairs of 2 so GSAP pinned scroll cards stack cleanly
  const cardPairs: ServiceCardItem[][] = [];
  for (let i = 0; i < cards.length; i += 2) {
    cardPairs.push([cards[i], cards[i + 1]].filter(Boolean));
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    const items = wrapper.querySelectorAll<HTMLElement>(".item");
    if (!items.length) return;

    // Set initial positions: first card pair visible, subsequent pairs start off-screen below with opacity 0
    items.forEach((item, index) => {
      if (index === 0) {
        gsap.set(item, { yPercent: 0, opacity: 1, scale: 1 });
      } else {
        gsap.set(item, { yPercent: 100, opacity: 0, scale: 1 });
      }
    });

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${Math.max(1, items.length - 1) * 85}%`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power1.inOut" },
      });

      items.forEach((item, index) => {
        if (items[index + 1]) {
          // Clean cover: Previous card pair smoothly fades out & scales slightly as the next pair enters
          timeline.to(
            item,
            {
              opacity: 0,
              scale: 0.96,
              duration: 1,
            }
          );

          // Next card pair slides up to cover fully with opacity 1, preventing any uneven bleed
          timeline.to(
            items[index + 1],
            {
              yPercent: 0,
              opacity: 1,
              duration: 1,
            },
            "<"
          );
        }
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [cardPairs.length]);

  return (
    <section className="services-scroll py-8 bg-[#f2f2f2]">
      <div ref={sectionRef} className="services-scroll-pin-wrapper">
        <div className="container mx-auto px-4">
          <div className="scroll-section vertical-section image-editing">
            <div className="row">
              <div className="col-md-10 col-lg-6 col-xl-6 offset-md-1 offset-xl-3 offset-lg-3 text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                  {heading1}
                  <br />
                  <span className="text-[#1265E8]">{heading2}</span>
                </h2>
                <div className="space30"></div>
              </div>
            </div>

            <div ref={wrapperRef} className="wrapper relative overflow-hidden">
              <div role="list" className="list relative w-full h-full">
                {cardPairs.map((pair, pIdx) => (
                  <div
                    key={pIdx}
                    role="listitem"
                    className="item absolute inset-0 w-full h-full bg-[#f2f2f2] flex flex-col justify-center"
                    style={{ zIndex: pIdx + 1 }}
                  >
                    <div className="row g-4 items-stretch justify-center">
                      {pair.map((card, cIdx) => {
                        const cleanLink = card.link ? card.link.replace(/\.php$/, "") : "/services";
                        const defaultCardImg = defaultCards[(pIdx * 2 + cIdx) % defaultCards.length]?.image || "/images/homepage/real-estate.webp";
                        return (
                          <div key={cIdx} className="col-md-6 col-lg-6 col-xl-6 flex">
                            <div className="image-editing-box bg-white w-full rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
                              <Link href={cleanLink} className="block flex-1 flex flex-col justify-between">
                                <div className="overflow-hidden rounded-xl bg-gray-100 aspect-[628/332] mb-3.5 relative shadow-inner">
                                  <img
                                    src={card.image || defaultCardImg}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                                    alt={card.alt || card.title}
                                    loading="lazy"
                                    onError={(e) => {
                                      const target = e.currentTarget;
                                      if (target.src !== defaultCardImg && !target.src.endsWith(defaultCardImg)) {
                                        target.src = defaultCardImg;
                                      }
                                    }}
                                  />
                                </div>
                                <h3 className="flex items-center justify-between text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#1265E8] transition-colors m-0 pt-1">
                                  <span>{card.title}</span>
                                  <span className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-[#1265E8] text-[#1265E8] group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 text-xs shadow-sm">
                                    <i className="fa-solid fa-arrow-right group-hover:translate-x-0.5 transition-transform"></i>
                                  </span>
                                </h3>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
