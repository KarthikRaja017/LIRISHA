"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getServices } from "@/lib/api/content";
import { FALLBACK_SERVICES } from "@/lib/api/fallbackServices";

export interface ServiceCardItem {
  id?: string | number;
  title: string;
  link: string;
  image: string;
  alt?: string;
  tagline?: string;
  subServices?: string[];
  iconClass?: string;
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
    id: "real-estate",
    title: "Real Estate Image Editing",
    link: "/real-estate",
    image: "/Portfolio/Real Estate/HDR Blending/07-Front Facade_1.jpg",
    alt: "Real Estate Image Editing Services",
    tagline: "High-impact MLS HDR bracket blending, twilight & virtual staging",
    iconClass: "fa-solid fa-house-chimney",
    subServices: [
      "Image Enhancement",
      "HDR Blending",
      "Aerial Editing",
      "360 Panorama & Tours",
      "Day to Dusk Conversion",
      "Floor Plans (2D, 3D, Site Plan)",
    ],
  },
  {
    id: "image-clipping",
    title: "Image Clipping Services",
    link: "/image-clipping",
    image: "/Portfolio/CLipping/1_2.jpg",
    alt: "Image Clipping Services",
    tagline: "Handcrafted Photoshop pen tool clipping paths & background removal",
    iconClass: "fa-solid fa-scissors",
    subServices: [
      "Background Removal Services",
      "Handcrafted Vector Paths",
      "Hair Masking & Alpha Channel",
      "Pure White #FFFFFF Amazon Backgrounds",
    ],
  },
  {
    id: "portrait",
    title: "Portrait Editing Services",
    link: "/portrait",
    image: "/Portfolio/Portrait Editing/1a.jpg",
    alt: "Portrait Editing Services",
    tagline: "Magazine-grade skin retouching that preserves authentic pore texture",
    iconClass: "fa-solid fa-user-check",
    subServices: [
      "Skin Retouching & Frequency Separation",
      "High-End Beauty Retouching",
      "Corporate Headshot Grooming",
      "Blemish, Teeth & Eye Sparkle",
    ],
  },
  {
    id: "wedding",
    title: "Wedding Photo Post Processing",
    link: "/wedding-photo-post-processing",
    image: "/Portfolio/Portrait Editing/DSC_5619_1.jpg",
    alt: "Wedding Photo Post Processing",
    tagline: "High-volume RAW culling, custom Lightroom presets & hero retouching",
    iconClass: "fa-solid fa-camera-retro",
    subServices: [
      "High-Volume RAW Culling",
      "Custom Lightroom Preset Calibration",
      "Ceremony & Reception Tone Balance",
      "Hero Bride & Groom Retouching",
    ],
  },
];

export const ServicesScroll: React.FC<ServicesScrollProps> = ({ initialData }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [cards, setCards] = useState<ServiceCardItem[]>(() => {
    if (initialData?.items && initialData.items.length > 0) {
      return initialData.items;
    }
    return defaultCards;
  });

  const syncCards = (liveServices: any[]) => {
    if (!liveServices || liveServices.length === 0) return;

    const defaultImgs = [
      "/Portfolio/Real Estate/HDR Blending/07-Front Facade_1.jpg",
      "/Portfolio/CLipping/1_2.jpg",
      "/Portfolio/Portrait Editing/1a.jpg",
      "/Portfolio/Portrait Editing/DSC_5619_1.jpg",
      "/Portfolio/Ecommerce/01.jpg",
      "/Portfolio/Jewelry/01.jpg",
    ];

    const initialItems = initialData?.items || [];
    const matchedServiceIds = new Set<string>();
    const mergedCards: ServiceCardItem[] = [];

    // 1. Process initialData items
    initialItems.forEach((item, idx) => {
      const cleanLink = (item.link || "").replace(/^\/+|\/+$/g, "");
      const match = liveServices.find(
        (s) =>
          s.id === item.id ||
          s.slug === cleanLink ||
          s.id === cleanLink ||
          s.name.toLowerCase() === (item.title || "").toLowerCase()
      );

      // Skip legacy dummy cards that don't match any active live service
      if (!match && !String(item.id).startsWith("service-")) {
        return;
      }

      if (match) {
        matchedServiceIds.add(match.id);
        matchedServiceIds.add(match.slug);
      }

      mergedCards.push({
        id: item.id || match?.id || `card-${idx}`,
        title: item.title || match?.name || "Image Editing Service",
        link: item.link || (match ? `/${match.slug}` : "/services"),
        image: item.image || match?.heroImage || defaultImgs[idx % defaultImgs.length],
        alt: item.alt || item.title || match?.name || "Image Editing",
        tagline: item.tagline || match?.tagline || match?.shortDesc || "",
        iconClass: item.iconClass || match?.iconClass || "fa-solid fa-wand-magic-sparkles",
        subServices:
          item.subServices && item.subServices.length > 0
            ? item.subServices
            : match?.subServices?.map((sub: any) =>
                typeof sub === "string" ? sub : sub.name
              ) || ["Professional Quality", "12-24h Delivery"],
      });
    });

    // 2. Add any live services (including newly added services) not yet in initialItems
    liveServices.forEach((s, idx) => {
      if (!matchedServiceIds.has(s.id) && !matchedServiceIds.has(s.slug)) {
        let img = s.heroImage || s.afterSrc || s.beforeSrc;
        if (!img || img.includes("placeholder") || img.includes("banner-bg")) {
          img = defaultImgs[idx % defaultImgs.length];
        }

        const targetLink =
          s.id === "wedding" || s.slug === "wedding-photo-post-processing"
            ? "/wedding-photo-post-processing"
            : s.slug?.startsWith("/")
            ? s.slug
            : `/${s.slug || s.id}`;

        const subs = Array.isArray(s.subServices)
          ? s.subServices
              .map((sub: any) =>
                typeof sub === "string" ? sub : sub.name || sub.title
              )
              .filter(Boolean)
          : [];

        mergedCards.push({
          id: s.id,
          title: s.name,
          link: targetLink,
          image: img,
          alt: s.name,
          tagline: s.tagline || s.shortDesc || "",
          iconClass: s.iconClass || "fa-solid fa-wand-magic-sparkles",
          subServices:
            subs.length > 0
              ? subs.slice(0, 6)
              : ["100% Handcrafted", "12-24h Delivery", "Dedicated Artists"],
        });
      }
    });

    if (mergedCards.length > 0) {
      setCards(mergedCards);
    }
  };

  // Dynamic fetch to synchronize with live database services and newly added ones
  useEffect(() => {
    let isMounted = true;
    const fetchAndSync = () => {
      getServices()
        .then((data) => {
          if (!isMounted || !data || data.length === 0) return;
          syncCards(data);
        })
        .catch(() => {});
    };

    fetchAndSync();

    const handleCmsUpdate = (e: any) => {
      if (!e.detail || e.detail.type === "services" || e.detail.type === "pages") {
        fetchAndSync();
      }
    };

    window.addEventListener("lirisha_cms_update", handleCmsUpdate);
    window.addEventListener("storage", fetchAndSync);

    return () => {
      isMounted = false;
      window.removeEventListener("lirisha_cms_update", handleCmsUpdate);
      window.removeEventListener("storage", fetchAndSync);
    };
  }, [initialData]);

  const heading1 = initialData?.headingLine1 || "Our Professional";
  const heading2 = initialData?.headingLine2 || "Image Editing Services";

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
          end: () => `+=${Math.max(1, items.length - 1) * 90}%`,
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
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Specialized Service Lines</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {heading1}{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  {heading2}
                </span>
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto">
                Explore our core post-production services. Click any card to view detailed specifications, samples, and turnaround times.
              </p>
            </div>

            {/* GSAP Overlapping Card Deck */}
            <div
              ref={wrapperRef}
              className="wrapper relative overflow-hidden h-[580px] sm:h-[610px] lg:h-[630px]"
            >
              <div role="list" className="list relative w-full h-full">
                {cardPairs.map((pair, pIdx) => (
                  <div
                    key={pIdx}
                    role="listitem"
                    className="item absolute inset-0 w-full h-full bg-transparent flex flex-col justify-center"
                    style={{ zIndex: pIdx + 1 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch justify-center max-w-5xl mx-auto w-full px-2">
                      {pair.map((card, cIdx) => {
                        const cleanLink = card.link ? card.link.replace(/\.php$/, "") : "/services";
                        const defaultCardImg =
                          defaultCards[(pIdx * 2 + cIdx) % defaultCards.length]?.image ||
                          "/images/homepage/real-estate.webp";

                        return (
                          <div key={cIdx} className="flex h-full">
                            {/* Entire Card is an active link that redirects directly to that service page */}
                            <Link
                              href={cleanLink}
                              className="bg-white w-full rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                              title={`View ${card.title} page`}
                            >
                              <div>
                                {/* Card Image with zoom on hover */}
                                <div className="overflow-hidden rounded-2xl bg-slate-100 aspect-[16/9] mb-4 relative shadow-inner">
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
                                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-semibold flex items-center gap-1.5">
                                    <i className={card.iconClass || "fa-solid fa-camera"} />
                                    <span>Service</span>
                                  </div>
                                </div>

                                {/* Title & Tagline */}
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                                  {card.title}
                                </h3>
                                {card.tagline && (
                                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                                    {card.tagline}
                                  </p>
                                )}

                                {/* What services we provide inside this service */}
                                {card.subServices && card.subServices.length > 0 && (
                                  <div className="pt-2.5 border-t border-slate-100 mb-2">
                                    <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                                      What We Provide:
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                      {card.subServices.slice(0, 5).map((subName, sIdx) => (
                                        <span
                                          key={sIdx}
                                          className="text-[11px] font-medium text-slate-700 bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-700 px-2 py-0.5 rounded-md transition-colors"
                                        >
                                          • {subName}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Card Action Link Bar */}
                              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                                  <span>Open Service Page</span>
                                  <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" />
                                </span>
                                <span className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-300 text-xs shadow-xs">
                                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                                </span>
                              </div>
                            </Link>
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

export default ServicesScroll;
