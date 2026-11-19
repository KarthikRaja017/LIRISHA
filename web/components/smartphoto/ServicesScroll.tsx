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

  // Mobile / Tablet interactive state
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const [mobileViewMode, setMobileViewMode] = useState<"carousel" | "list">("carousel");

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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

  // Group cards into pairs of 2 for desktop GSAP overlapping deck
  const cardPairs: ServiceCardItem[][] = [];
  for (let i = 0; i < cards.length; i += 2) {
    cardPairs.push([cards[i], cards[i + 1]].filter(Boolean));
  }

  // Desktop-only GSAP ScrollTrigger timeline via matchMedia
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    const mm = gsap.matchMedia();

    // STRICTLY activate GSAP pin timeline only on large screens (>= 1024px)
    // Never pin or trap touch scrolling on mobile devices or tablets
    mm.add("(min-width: 1024px)", () => {
      const items = wrapper.querySelectorAll<HTMLElement>(".desktop-item");
      if (!items.length) return;

      items.forEach((item, index) => {
        if (index === 0) {
          gsap.set(item, { yPercent: 0, opacity: 1, scale: 1 });
        } else {
          gsap.set(item, { yPercent: 100, opacity: 0, scale: 1 });
        }
      });

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
    });

    return () => {
      mm.revert();
    };
  }, [cardPairs.length]);

  // Touch gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      setActiveMobileIdx((prev) => (prev + 1) % cards.length);
    }
    if (isRightSwipe) {
      setActiveMobileIdx((prev) => (prev - 1 + cards.length) % cards.length);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeCard = cards[activeMobileIdx] || cards[0];

  return (
    <section className="services-scroll py-12 sm:py-16 lg:py-20 bg-slate-50/80 border-y border-slate-200/70">
      <div ref={sectionRef} className="services-scroll-pin-wrapper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scroll-section vertical-section">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Specialized Service Lines</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {heading1}{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  {heading2}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto">
                Explore our core post-production services. Click any card to view detailed specifications, samples, and turnaround times.
              </p>
            </div>

            {/* ========================================================= */}
            {/* 1. MOBILE & TABLET VIEW (< 1024px): Dedicated Responsive UI */}
            {/* ========================================================= */}
            <div className="block lg:hidden">
              {/* Category Quick Selector Pills */}
              <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1 scrollbar-none w-full sm:w-auto -mx-2 px-2 sm:mx-0 sm:px-0">
                  {cards.map((c, idx) => {
                    const isActive = activeMobileIdx === idx;
                    const cleanTitle = c.title
                      .replace(/ Services| Image Editing| Photo Post Processing/gi, "")
                      .trim();

                    return (
                      <button
                        key={c.id || idx}
                        type="button"
                        onClick={() => setActiveMobileIdx(idx)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                            : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-xs"
                        }`}
                      >
                        <i className={`${c.iconClass || "fa-solid fa-wand-magic-sparkles"} text-[11px]`} />
                        <span>{cleanTitle}</span>
                      </button>
                    );
                  })}
                </div>

                {/* View Mode Toggle: Carousel vs Full List */}
                <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-lg text-[11px] font-bold text-slate-600 ml-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setMobileViewMode("carousel")}
                    className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                      mobileViewMode === "carousel"
                        ? "bg-white text-blue-600 shadow-xs"
                        : "hover:text-slate-900"
                    }`}
                    title="Swipeable Carousel View"
                  >
                    <i className="fa-solid fa-arrows-left-right text-[10px]" />
                    <span className="hidden xs:inline">Swipe</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileViewMode("list")}
                    className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                      mobileViewMode === "list"
                        ? "bg-white text-blue-600 shadow-xs"
                        : "hover:text-slate-900"
                    }`}
                    title="View All Cards in Stack"
                  >
                    <i className="fa-solid fa-bars text-[10px]" />
                    <span className="hidden xs:inline">All ({cards.length})</span>
                  </button>
                </div>
              </div>

              {/* Mode A: Carousel Single-Card View */}
              {mobileViewMode === "carousel" && activeCard && (
                <div
                  className="touch-pan-y"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-md transition-all duration-300">
                    {/* Card Image */}
                    <div className="overflow-hidden rounded-2xl bg-slate-100 aspect-[16/9] mb-4 relative shadow-inner">
                      <img
                        src={activeCard.image || "/Portfolio/Real Estate/HDR Blending/07-Front Facade_1.jpg"}
                        alt={activeCard.alt || activeCard.title}
                        className="w-full h-full object-cover transition-transform duration-500 rounded-2xl"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          const fallback = "/Portfolio/Real Estate/HDR Blending/07-Front Facade_1.jpg";
                          if (target.src !== fallback && !target.src.endsWith(fallback)) {
                            target.src = fallback;
                          }
                        }}
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-semibold flex items-center gap-1.5">
                        <i className={activeCard.iconClass || "fa-solid fa-camera"} />
                        <span>Service</span>
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-white text-[11px] font-bold">
                        {activeMobileIdx + 1} / {cards.length}
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5">
                      {activeCard.title}
                    </h3>
                    {activeCard.tagline && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {activeCard.tagline}
                      </p>
                    )}

                    {/* What We Provide Chips */}
                    {activeCard.subServices && activeCard.subServices.length > 0 && (
                      <div className="pt-3 border-t border-slate-100 mb-4">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                          <i className="fa-solid fa-circle-check text-blue-600 text-xs" />
                          <span>What We Provide:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {activeCard.subServices.map((subName, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/60"
                            >
                              • {subName}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Direct Action Link */}
                    <Link
                      href={activeCard.link ? activeCard.link.replace(/\.php$/, "") : "/services"}
                      className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
                    >
                      <span>Explore {activeCard.title}</span>
                      <i className="fa-solid fa-arrow-right text-xs" />
                    </Link>
                  </div>

                  {/* Carousel Controls (Prev, Next, Dot Indicators) */}
                  <div className="flex items-center justify-between mt-4 px-1">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMobileIdx((prev) => (prev - 1 + cards.length) % cards.length)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 active:scale-95 transition-all shadow-xs"
                      aria-label="Previous Service"
                    >
                      <i className="fa-solid fa-chevron-left text-[10px]" />
                      <span>Prev</span>
                    </button>

                    {/* Dot Indicators */}
                    <div className="flex items-center gap-1.5">
                      {cards.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={() => setActiveMobileIdx(dotIdx)}
                          className={`rounded-full transition-all ${
                            activeMobileIdx === dotIdx
                              ? "w-6 h-2 bg-blue-600"
                              : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                          }`}
                          aria-label={`Go to slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveMobileIdx((prev) => (prev + 1) % cards.length)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 active:scale-95 transition-all shadow-xs"
                      aria-label="Next Service"
                    >
                      <span>Next</span>
                      <i className="fa-solid fa-chevron-right text-[10px]" />
                    </button>
                  </div>
                </div>
              )}

              {/* Mode B: Vertical List All Cards */}
              {mobileViewMode === "list" && (
                <div className="space-y-6">
                  {cards.map((card, idx) => {
                    const cleanLink = card.link ? card.link.replace(/\.php$/, "") : "/services";
                    const defaultCardImg =
                      defaultCards[idx % defaultCards.length]?.image ||
                      "/Portfolio/Real Estate/HDR Blending/07-Front Facade_1.jpg";

                    return (
                      <div
                        key={card.id || idx}
                        className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:border-blue-400 transition-all"
                      >
                        <div className="overflow-hidden rounded-2xl bg-slate-100 aspect-[16/9] mb-4 relative shadow-inner">
                          <img
                            src={card.image || defaultCardImg}
                            alt={card.alt || card.title}
                            className="w-full h-full object-cover rounded-2xl"
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
                            <span>Service {idx + 1}</span>
                          </div>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
                          {card.title}
                        </h3>
                        {card.tagline && (
                          <p className="text-xs text-slate-500 leading-relaxed mb-3">
                            {card.tagline}
                          </p>
                        )}

                        {card.subServices && card.subServices.length > 0 && (
                          <div className="pt-2.5 border-t border-slate-100 mb-4">
                            <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                              What We Provide:
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {card.subServices.slice(0, 5).map((subName, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md"
                                >
                                  • {subName}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <Link
                          href={cleanLink}
                          className="w-full py-3 px-4 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-blue-200 hover:border-blue-600 transition-all"
                        >
                          <span>Open {card.title}</span>
                          <i className="fa-solid fa-arrow-right text-[11px]" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ========================================================= */}
            {/* 2. DESKTOP VIEW (>= 1024px): GSAP Overlapping Card Deck   */}
            {/* ========================================================= */}
            <div
              ref={wrapperRef}
              className="hidden lg:block wrapper relative overflow-hidden h-[630px] xl:h-[650px]"
            >
              <div role="list" className="list relative w-full h-full">
                {cardPairs.map((pair, pIdx) => (
                  <div
                    key={pIdx}
                    role="listitem"
                    className="desktop-item absolute inset-0 w-full h-full bg-transparent flex flex-col justify-center"
                    style={{ zIndex: pIdx + 1 }}
                  >
                    <div className="grid grid-cols-2 gap-6 items-stretch justify-center max-w-5xl mx-auto w-full px-2">
                      {pair.map((card, cIdx) => {
                        const cleanLink = card.link ? card.link.replace(/\.php$/, "") : "/services";
                        const defaultCardImg =
                          defaultCards[(pIdx * 2 + cIdx) % defaultCards.length]?.image ||
                          "/Portfolio/Real Estate/HDR Blending/07-Front Facade_1.jpg";

                        return (
                          <div key={cIdx} className="flex h-full">
                            <Link
                              href={cleanLink}
                              className="bg-white w-full rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
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
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
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
