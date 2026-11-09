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
    title: "Image Clipping & Masking",
    link: "/image-clipping/",
    image: "/images/homepage/image-cliping.webp",
    alt: "Image Clipping Services",
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
    title: "Real Estate HDR Enhancement",
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
          start: "top top+=80",
          pin: true,
          end: () => `+=${Math.max(1, items.length - 1) * 85}%`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power1.inOut" },
      });

      items.forEach((item, index) => {
        if (items[index + 1]) {
          timeline.to(item, {
            opacity: 0,
            scale: 0.96,
            duration: 1,
          });

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
    <section className="services-scroll py-20 bg-slate-50/80 border-y border-slate-200/70">
      <div ref={sectionRef} className="services-scroll-pin-wrapper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scroll-section vertical-section">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Specialized Production Lines</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {heading1}{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  {heading2}
                </span>
              </h2>
            </div>

            <div ref={wrapperRef} className="wrapper relative overflow-hidden h-[480px] sm:h-[520px]">
              <div role="list" className="list relative w-full h-full">
                {cardPairs.map((pair, pIdx) => (
                  <div
                    key={pIdx}
                    role="listitem"
                    className="item absolute inset-0 w-full h-full bg-transparent flex flex-col justify-center"
                    style={{ zIndex: pIdx + 1 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch justify-center max-w-5xl mx-auto w-full">
                      {pair.map((card, cIdx) => {
                        const cleanLink = card.link ? card.link.replace(/\.php$/, "") : "/services";
                        const defaultCardImg =
                          defaultCards[(pIdx * 2 + cIdx) % defaultCards.length]?.image ||
                          "/images/homepage/real-estate.webp";
                        return (
                          <div key={cIdx} className="flex">
                            <div className="bg-white w-full rounded-3xl p-5 border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group">
                              <Link href={cleanLink} className="block flex-1 flex flex-col justify-between">
                                <div className="overflow-hidden rounded-2xl bg-slate-100 aspect-[16/10] mb-4 relative shadow-inner">
                                  <img
                                    src={card.image || defaultCardImg}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
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
                                <h3 className="flex items-center justify-between text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                                  <span>{card.title}</span>
                                  <span className="w-9 h-9 rounded-full bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 text-xs shadow-sm">
                                    <i className="fa-solid fa-arrow-right group-hover:translate-x-0.5 transition-transform" />
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
