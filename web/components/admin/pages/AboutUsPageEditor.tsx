"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageContent } from "@/types/content";
import { ImageUploadButton } from "@/components/admin/ImageUploadButton";

interface AboutUsPageEditorProps {
  page?: PageContent;
  onSave: (updatedPage: PageContent) => Promise<void>;
  showToast: (message: string, type?: "success" | "error") => void;
}

export const AboutUsPageEditor: React.FC<AboutUsPageEditorProps> = ({
  page,
  onSave,
  showToast,
}) => {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "banner" | "stats" | "automation" | "scale" | "why_choose" | "cta" | "seo"
  >("banner");

  // SEO
  const [pageTitle, setPageTitle] = useState(
    page?.title || "About Us | SmartPHOTOeditors"
  );
  const [metaDescription, setMetaDescription] = useState(
    page?.metaDescription ||
      "SmartPHOTOeditors provides value-focused, quality services from a team of skilled Adobe experts who set the benchmark for image editing solutions."
  );

  // Hero Banner
  const [heroTitle, setHeroTitle] = useState(
    page?.hero?.title || "About SPE Image Editing Specialists"
  );
  const [heroTagline, setHeroTagline] = useState(
    page?.hero?.tagline ||
      "SmartPHOTOeditors (SPE) provides professional, AI-assisted image editing and post-production support to businesses that need high-quality work delivered consistently, efficiently, and at scale. We work as an extension of our clients' teams, helping them manage everything from day-to-day editing requirements to large-volume projects with demanding turnaround times.\n\nOur clients include real estate businesses, e-commerce companies, photography studios, marketing agencies, and other organizations that depend on high-quality visual content. Whether the requirement involves a few specialized edits or thousands of images, we provide the people, processes, and technology needed to keep projects moving without compromising on quality."
  );
  const [heroImage, setHeroImage] = useState(
    page?.hero?.image || "/images/about/about-banner-540x671.webp"
  );
  const [ctaText, setCtaText] = useState(
    page?.hero?.ctaText || "Get a free Quote Note"
  );
  const [ctaLink, setCtaLink] = useState(
    page?.hero?.ctaLink || "/contact-us"
  );

  // Statistics Section
  const defaultStats = [
    { value: "05+", label: "AWARDS REWARDED" },
    { value: "13+", label: "YEARS OF EXPERIENCE" },
    { value: "1000+", label: "COMPLETED PROJECT" },
    { value: "1300+", label: "HAPPY CLIENT" },
  ];
  const statsSection = page?.sections?.find((s: any) => s.type === "statistics");
  const [statsItems, setStatsItems] = useState<any[]>(
    statsSection?.items && statsSection.items.length > 0
      ? statsSection.items
      : defaultStats
  );

  // Automation / Human-in-the-Loop Section
  const automationSection = page?.sections?.find((s: any) => s.type === "automation");
  const [automationTitle, setAutomationTitle] = useState(
    automationSection?.title ||
      "Automation Helps Us Move Faster. Human Expertise Keeps Quality in Focus."
  );
  const [automationImage, setAutomationImage] = useState(
    automationSection?.image || "/images/about/country-info-1000x250.webp"
  );
  const defaultAutomationParagraphs = [
    "At SPE, technology is part of the workflow, but it does not replace human expertise.",
    "We use AI-assisted tools to speed up repetitive and time-consuming tasks, improve workflow efficiency, and help our teams handle larger volumes of work. However, every project still benefits from the judgment and experience of skilled editors. Our editors review outputs, make refinements where required, and ensure the final images meet the client's specifications and quality expectations.",
    "This Human-in-the-Loop approach gives our clients the benefits of faster processing without relying entirely on automated results. AI helps us work more efficiently; our people make sure the work is right.",
  ];
  const [automationParagraphs, setAutomationParagraphs] = useState<string[]>(
    automationSection?.paragraphs && automationSection.paragraphs.length > 0
      ? automationSection.paragraphs
      : defaultAutomationParagraphs
  );

  // Scale With You Section
  const scaleSection = page?.sections?.find((s: any) => s.type === "scale");
  const [scaleTitle, setScaleTitle] = useState(
    scaleSection?.title ||
      "From One-Off Projects to High Volumes. We Scale with You"
  );
  const [scaleDescription, setScaleDescription] = useState(
    scaleSection?.description ||
      "From real estate and eCommerce businesses to photography studios, marketing agencies, and other image-driven organizations, we provide flexible editing support built around each client's requirements. Our AI-assisted, Human-in-the-Loop workflow helps speed up repetitive tasks, while experienced editors review, refine, and verify the final output. Whether the requirement is a one-time project or ongoing support, clients receive consistent quality, reliable turnaround, and a workflow that can scale as volumes grow."
  );
  const [scaleImage, setScaleImage] = useState(
    scaleSection?.image || "/images/about/professionals-1.webp"
  );

  // Why Businesses Choose SPE
  const defaultWhyChooseItems = [
    {
      title: "Faster Project Turnaround",
      description:
        "AI-assisted workflows help reduce repetitive editing time, while human editors review and refine the final output.",
    },
    {
      title: "Consistent Quality at Scale",
      description:
        "Defined workflows and human quality checks help maintain consistency across projects, batches, and growing image volumes.",
    },
    {
      title: "Support Your Brand Standards",
      description:
        "Our editors work according to your specifications, helping ensure every image reflects your preferred style and brand requirements.",
    },
    {
      title: "Overcome Resource Challenges",
      description:
        "Access dedicated editing capacity when workloads increase without the cost and complexity of expanding your in-house team.",
    },
    {
      title: "Natural, Accurate Results",
      description:
        "Technology supports the workflow, while experienced editors apply the judgment needed to deliver realistic, polished results.",
    },
    {
      title: "Reliable Human Verification",
      description:
        "Every project benefits from human review, helping identify issues, make refinements, and ensure the final output meets expectations.",
    },
  ];
  const whyChooseSection = page?.sections?.find((s: any) => s.type === "why_choose");
  const [whyChooseTitle, setWhyChooseTitle] = useState(
    whyChooseSection?.title || "Why Businesses Choose SmartPHOTOeditors"
  );
  const [whyChooseDescription, setWhyChooseDescription] = useState(
    whyChooseSection?.description ||
      "Our approach combines experienced editors, AI-assisted workflows, and structured quality checks to help businesses manage image editing requirements more efficiently. Technology helps us reduce repetitive effort and improve turnaround times, while human expertise remains responsible for reviewing and refining every project. With scalable teams, secure processes, licensed software, and flexible support models, we help global clients maintain quality while controlling costs."
  );
  const [whyChooseItems, setWhyChooseItems] = useState<any[]>(
    whyChooseSection?.items && whyChooseSection.items.length > 0
      ? whyChooseSection.items
      : defaultWhyChooseItems
  );

  // Outsource CTA
  const ctaSection = page?.sections?.find((s: any) => s.type === "cta");
  const [ctaTitle, setCtaTitle] = useState(
    ctaSection?.title || "Outsource Image Editing Services to the Experts"
  );
  const [ctaDescription, setCtaDescription] = useState(
    ctaSection?.description ||
      "World-class support helps you discover new ways to enhance your images to connect with your customers, showcase your brand, and fulfill your marketing strategies. Contact SmartPHOTOeditors to be your photo editing service partner."
  );
  const [ctaBtnText, setCtaBtnText] = useState(
    ctaSection?.buttonText || "Contact Us to Get Free Quote"
  );
  const [ctaBtnLink, setCtaBtnLink] = useState(
    ctaSection?.buttonLink || "/contact-us"
  );

  // Populate from prop whenever it arrives
  useEffect(() => {
    if (page) {
      if (page.title) setPageTitle(page.title);
      if (page.metaDescription) setMetaDescription(page.metaDescription);
      if (page.hero?.title) setHeroTitle(page.hero.title);
      if (page.hero?.tagline) setHeroTagline(page.hero.tagline);
      if (page.hero?.image) setHeroImage(page.hero.image);
      if (page.hero?.ctaText) setCtaText(page.hero.ctaText);
      if (page.hero?.ctaLink) setCtaLink(page.hero.ctaLink);

      const s = page.sections?.find((sec: any) => sec.type === "statistics");
      if (s?.items && s.items.length > 0) setStatsItems(s.items);

      const auto = page.sections?.find((sec: any) => sec.type === "automation");
      if (auto) {
        if (auto.title) setAutomationTitle(auto.title);
        if (auto.image) setAutomationImage(auto.image);
        if (auto.paragraphs && auto.paragraphs.length > 0)
          setAutomationParagraphs(auto.paragraphs);
      }

      const sc = page.sections?.find((sec: any) => sec.type === "scale");
      if (sc) {
        if (sc.title) setScaleTitle(sc.title);
        if (sc.description) setScaleDescription(sc.description);
        if (sc.image) setScaleImage(sc.image);
      }

      const wc = page.sections?.find((sec: any) => sec.type === "why_choose");
      if (wc) {
        if (wc.title) setWhyChooseTitle(wc.title);
        if (wc.description) setWhyChooseDescription(wc.description);
        if (wc.items && wc.items.length > 0) setWhyChooseItems(wc.items);
      }

      const ct = page.sections?.find((sec: any) => sec.type === "cta");
      if (ct) {
        if (ct.title) setCtaTitle(ct.title);
        if (ct.description) setCtaDescription(ct.description);
        if (ct.buttonText) setCtaBtnText(ct.buttonText);
        if (ct.buttonLink) setCtaBtnLink(ct.buttonLink);
      }
    }
  }, [page]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload: PageContent = {
        slug: "about-us",
        title: pageTitle,
        metaDescription: metaDescription,
        hero: {
          title: heroTitle,
          tagline: heroTagline,
          image: heroImage,
          ctaText: ctaText,
          ctaLink: ctaLink,
        },
        sections: [
          {
            type: "statistics",
            title: "Key Statistics",
            items: statsItems,
          },
          {
            type: "automation",
            title: automationTitle,
            image: automationImage,
            paragraphs: automationParagraphs,
          },
          {
            type: "scale",
            title: scaleTitle,
            description: scaleDescription,
            image: scaleImage,
          },
          {
            type: "why_choose",
            title: whyChooseTitle,
            description: whyChooseDescription,
            items: whyChooseItems,
          },
          {
            type: "cta",
            title: ctaTitle,
            description: ctaDescription,
            buttonText: ctaBtnText,
            buttonLink: ctaBtnLink,
          },
        ],
      };

      await onSave(payload);
      showToast("About Us Page saved successfully!");
    } catch (err: any) {
      showToast(err.message || "Failed to save About Us page", "error");
    } finally {
      setSaving(false);
    }
  };

  // Helper functions for array updates
  const updateStatItem = (index: number, field: "value" | "label", val: string) => {
    const next = [...statsItems];
    next[index] = { ...next[index], [field]: val };
    setStatsItems(next);
  };

  const updateParagraph = (index: number, val: string) => {
    const next = [...automationParagraphs];
    next[index] = val;
    setAutomationParagraphs(next);
  };

  const addParagraph = () => {
    setAutomationParagraphs([...automationParagraphs, ""]);
  };

  const removeParagraph = (index: number) => {
    setAutomationParagraphs(automationParagraphs.filter((_, i) => i !== index));
  };

  const updateWhyChooseItem = (
    index: number,
    field: "title" | "description",
    val: string
  ) => {
    const next = [...whyChooseItems];
    next[index] = { ...next[index], [field]: val };
    setWhyChooseItems(next);
  };

  const addWhyChooseItem = () => {
    setWhyChooseItems([
      ...whyChooseItems,
      { title: "New Feature Benefit", description: "Describe this benefit..." },
    ]);
  };

  const removeWhyChooseItem = (index: number) => {
    setWhyChooseItems(whyChooseItems.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl shadow-md shrink-0 aspect-square">
            <i className="fa-solid fa-circle-info"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900 whitespace-nowrap">
                About Us Page Studio
              </h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold whitespace-nowrap shrink-0">
                Route: /about-us 
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate sm:whitespace-normal">
              Edit all sections: Hero banner, 4 statistics counters, AI automation info, scale section, why choose benefits, and outsource CTA.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <Link
            href="/about-us"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[#1265E8]"></i>
            <span>View Live Page</span>
          </Link>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#1265E8] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
          >
            <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
            <span>{saving ? "Saving..." : "Save About Us Page"}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-gray-200 scrollbar-none text-xs font-bold">
        {[
          { id: "banner", label: "1. Hero Banner", icon: "fa-image" },
          { id: "stats", label: "2. Statistics (4)", icon: "fa-chart-simple" },
          { id: "automation", label: "3. AI & Human Touch", icon: "fa-microchip" },
          { id: "scale", label: "4. Scale With You", icon: "fa-arrow-up-right-dots" },
          { id: "why_choose", label: "5. Why Choose (6 Cards)", icon: "fa-star" },
          { id: "cta", label: "6. Outsource CTA", icon: "fa-bullhorn" },
          { id: "seo", label: "7. SEO & Meta", icon: "fa-magnifying-glass" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? "bg-[#1265E8] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <i className={`fa-solid ${tab.icon}`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: HERO BANNER */}
      {activeTab === "banner" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#1265E8] flex items-center justify-center text-xs">
                <i className="fa-solid fa-image"></i>
              </span>
              Hero Banner Section
            </h3>
            <p className="text-gray-500 mt-1">
              Top intro banner with headline, introductory paragraphs, banner graphic, and quote button.
            </p>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1.5">
              Headline Title
            </label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-bold text-sm border border-gray-300 rounded-xl focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/15 outline-none transition-all shadow-sm"
              placeholder="About SPE Image Editing Specialists"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1.5">
              Introductory Text / Story
            </label>
            <textarea
              rows={6}
              value={heroTagline}
              onChange={(e) => setHeroTagline(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-normal border border-gray-300 rounded-xl focus:border-[#1265E8] focus:ring-4 focus:ring-blue-500/15 outline-none leading-relaxed transition-all shadow-sm"
              placeholder="Enter intro story. Separate paragraphs with double newlines."
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Tip: Separate multiple paragraphs with empty lines. They will render as distinct styled paragraphs on the live page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-800 mb-1.5">
                CTA Button Text
              </label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-semibold border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                placeholder="Get a free Quote Note"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-800 mb-1.5">
                CTA Button Link
              </label>
              <input
                type="text"
                value={ctaLink}
                onChange={(e) => setCtaLink(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-semibold border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                placeholder="/contact-us"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <label className="block font-bold text-gray-800 mb-2">
              Banner Illustration / Graphic (540x671)
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="w-32 h-40 bg-white border border-gray-300 rounded-xl overflow-hidden flex items-center justify-center shadow-inner shrink-0">
                {heroImage ? (
                  <img
                    src={heroImage}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <i className="fa-solid fa-image text-gray-300 text-3xl"></i>
                )}
              </div>
              <div className="flex-1 space-y-3 w-full">
                <input
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white text-gray-900 font-mono text-xs border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                  placeholder="/images/about/about-banner-540x671.webp"
                />
                <div className="flex items-center gap-3">
                  <ImageUploadButton
                    folder="about"
                    onUploadSuccess={(url) => {
                      setHeroImage(url);
                      showToast("Banner image uploaded successfully!");
                    }}
                    buttonText="Upload New Banner Image"
                  />
                  {heroImage !== "/images/about/about-banner-540x671.webp" && (
                    <button
                      type="button"
                      onClick={() =>
                        setHeroImage("/images/about/about-banner-540x671.webp")
                      }
                      className="text-xs text-gray-500 hover:text-red-500 underline"
                    >
                      Reset to Default
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STATISTICS */}
      {activeTab === "stats" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#1265E8] flex items-center justify-center text-xs">
                <i className="fa-solid fa-chart-simple"></i>
              </span>
              Key Statistics Counters
            </h3>
            <p className="text-gray-500 mt-1">
              The 4 milestone counters displayed horizontally with photography icons.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {statsItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between text-gray-400 font-bold text-[11px]">
                  <span>Metric #{idx + 1}</span>
                  <i className="fa-solid fa-hashtag text-blue-500"></i>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    Value / Number
                  </label>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => updateStatItem(idx, "value", e.target.value)}
                    className="w-full px-3 py-2 bg-white text-gray-900 font-extrabold text-lg border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm text-center"
                    placeholder="15+"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    Label Description
                  </label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updateStatItem(idx, "label", e.target.value)}
                    className="w-full px-3 py-2 bg-white text-gray-900 font-semibold text-xs border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm text-center"
                    placeholder="AWARDS REWARDED"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AUTOMATION & HUMAN-IN-THE-LOOP */}
      {activeTab === "automation" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#1265E8] flex items-center justify-center text-xs">
                <i className="fa-solid fa-microchip"></i>
              </span>
              AI Automation &amp; Human Expertise Section
            </h3>
            <p className="text-gray-500 mt-1">
              Soft-blue background section showcasing technology combined with skilled craftsmanship.
            </p>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1.5">
              Section Heading Title
            </label>
            <input
              type="text"
              value={automationTitle}
              onChange={(e) => setAutomationTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-bold text-sm border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
              placeholder="Automation Helps Us Move Faster. Human Expertise Keeps Quality in Focus."
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
            <label className="block font-bold text-gray-800">
              Country Infographic Graphic (1000x250)
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-48 h-20 bg-white border border-gray-300 rounded-xl overflow-hidden flex items-center justify-center shadow-inner shrink-0 p-1">
                {automationImage ? (
                  <img
                    src={automationImage}
                    alt="Country info preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <i className="fa-solid fa-image text-gray-300"></i>
                )}
              </div>
              <div className="flex-1 space-y-2 w-full">
                <input
                  type="text"
                  value={automationImage}
                  onChange={(e) => setAutomationImage(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-900 font-mono text-xs border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                  placeholder="/images/about/country-info-1000x250.webp"
                />
                <div className="flex items-center gap-3">
                  <ImageUploadButton
                    folder="about"
                    onUploadSuccess={(url) => {
                      setAutomationImage(url);
                      showToast("Country info image uploaded!");
                    }}
                    buttonText="Upload New Country Info Graphic"
                  />
                  {automationImage !== "/images/about/country-info-1000x250.webp" && (
                    <button
                      type="button"
                      onClick={() =>
                        setAutomationImage(
                          "/images/about/country-info-1000x250.webp"
                        )
                      }
                      className="text-xs text-gray-500 hover:text-red-500 underline"
                    >
                      Reset Default
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-bold text-gray-800">
                Editorial Paragraphs ({automationParagraphs.length})
              </label>
              <button
                type="button"
                onClick={addParagraph}
                className="px-3 py-1.5 bg-blue-50 text-[#1265E8] hover:bg-blue-100 font-bold rounded-lg transition-all flex items-center gap-1.5"
              >
                <i className="fa-solid fa-plus"></i>
                <span>Add Paragraph</span>
              </button>
            </div>

            {automationParagraphs.map((para, idx) => (
              <div key={idx} className="relative flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-[#1265E8] flex items-center justify-center font-bold text-xs shrink-0 mt-2">
                  {idx + 1}
                </span>
                <textarea
                  rows={3}
                  value={para}
                  onChange={(e) => updateParagraph(idx, e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none leading-relaxed transition-all shadow-sm"
                  placeholder={`Paragraph ${idx + 1}...`}
                />
                {automationParagraphs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParagraph(idx)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors mt-2"
                    title="Remove paragraph"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SCALE WITH YOU */}
      {activeTab === "scale" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#1265E8] flex items-center justify-center text-xs">
                <i className="fa-solid fa-arrow-up-right-dots"></i>
              </span>
              Scale With You Section
            </h3>
            <p className="text-gray-500 mt-1">
              Highlights capacity to support one-off tasks up to massive enterprise volumes.
            </p>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1.5">
              Section Title
            </label>
            <input
              type="text"
              value={scaleTitle}
              onChange={(e) => setScaleTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-bold text-sm border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
              placeholder="From One-Off Projects to High Volumes. We Scale with You"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1.5">
              Detailed Description
            </label>
            <textarea
              rows={5}
              value={scaleDescription}
              onChange={(e) => setScaleDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-normal border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none leading-relaxed shadow-sm"
              placeholder="Describe how your studio scales with client demand..."
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
            <label className="block font-bold text-gray-800">
              Professionals Team Graphic (500x350)
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-40 h-28 bg-white border border-gray-300 rounded-xl overflow-hidden flex items-center justify-center shadow-inner shrink-0 p-1">
                {scaleImage ? (
                  <img
                    src={scaleImage}
                    alt="Professionals preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <i className="fa-solid fa-image text-gray-300"></i>
                )}
              </div>
              <div className="flex-1 space-y-2 w-full">
                <input
                  type="text"
                  value={scaleImage}
                  onChange={(e) => setScaleImage(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-900 font-mono text-xs border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                  placeholder="/images/about/professionals-1.webp"
                />
                <div className="flex items-center gap-3">
                  <ImageUploadButton
                    folder="about"
                    onUploadSuccess={(url) => {
                      setScaleImage(url);
                      showToast("Professionals graphic uploaded!");
                    }}
                    buttonText="Upload New Professionals Graphic"
                  />
                  {scaleImage !== "/images/about/professionals-1.webp" && (
                    <button
                      type="button"
                      onClick={() =>
                        setScaleImage("/images/about/professionals-1.webp")
                      }
                      className="text-xs text-gray-500 hover:text-red-500 underline"
                    >
                      Reset Default
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: WHY CHOOSE SPE (6 CARDS) */}
      {activeTab === "why_choose" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#1265E8] flex items-center justify-center text-xs">
                <i className="fa-solid fa-star"></i>
              </span>
              Why Businesses Choose Us (Feature Benefits)
            </h3>
            <p className="text-gray-500 mt-1">
              Display reasons clients partner with SmartPHOTOeditors arranged in 2 columns.
            </p>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1.5">
              Section Heading
            </label>
            <input
              type="text"
              value={whyChooseTitle}
              onChange={(e) => setWhyChooseTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-bold text-sm border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
              placeholder="Why Businesses Choose SmartPHOTOeditors"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1.5">
              Section Subtitle / Narrative
            </label>
            <textarea
              rows={3}
              value={whyChooseDescription}
              onChange={(e) => setWhyChooseDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-normal border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none leading-relaxed shadow-sm"
              placeholder="Overview statement for why clients select our services..."
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-bold text-gray-800">
                Feature Benefit Cards ({whyChooseItems.length})
              </label>
              <button
                type="button"
                onClick={addWhyChooseItem}
                className="px-3 py-1.5 bg-blue-50 text-[#1265E8] hover:bg-blue-100 font-bold rounded-lg transition-all flex items-center gap-1.5"
              >
                <i className="fa-solid fa-plus"></i>
                <span>Add Card</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whyChooseItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2.5 relative shadow-sm"
                >
                  <div className="flex items-center justify-between text-gray-400 font-bold text-[11px]">
                    <span className="text-[#1265E8] font-bold">
                      Feature #{idx + 1}
                    </span>
                    {whyChooseItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWhyChooseItem(idx)}
                        className="text-gray-400 hover:text-red-500"
                        title="Remove feature"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">
                      Feature Title
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        updateWhyChooseItem(idx, "title", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white text-gray-900 font-bold text-xs border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                      placeholder="e.g. Faster Project Turnaround"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">
                      Feature Explanation
                    </label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) =>
                        updateWhyChooseItem(idx, "description", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white text-gray-900 text-xs border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                      placeholder="Description of this feature..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: OUTSOURCE CTA */}
      {activeTab === "cta" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#1265E8] flex items-center justify-center text-xs">
                <i className="fa-solid fa-bullhorn"></i>
              </span>
              Outsource CTA Banner
            </h3>
            <p className="text-gray-500 mt-1">
              Call-to-action banner displayed near the bottom encouraging visitors to partner with you.
            </p>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1.5">
              Call to Action Heading
            </label>
            <input
              type="text"
              value={ctaTitle}
              onChange={(e) => setCtaTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-bold text-sm border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
              placeholder="Outsource Image Editing Services to the Experts"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1.5">
              Description Message
            </label>
            <textarea
              rows={3}
              value={ctaDescription}
              onChange={(e) => setCtaDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-normal border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none leading-relaxed shadow-sm"
              placeholder="World-class support helps you discover new ways..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-800 mb-1.5">
                Button Text
              </label>
              <input
                type="text"
                value={ctaBtnText}
                onChange={(e) => setCtaBtnText(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-semibold border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                placeholder="Contact Us to Get Free Quote"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-800 mb-1.5">
                Button Target Link
              </label>
              <input
                type="text"
                value={ctaBtnLink}
                onChange={(e) => setCtaBtnLink(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-semibold border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
                placeholder="/contact-us"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SEO */}
      {activeTab === "seo" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#1265E8] flex items-center justify-center text-xs">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              Search Engine Optimization (SEO)
            </h3>
            <p className="text-gray-500 mt-1">
              Configure browser title tag and search engine snippet description.
            </p>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1.5">
              Browser Page Title
            </label>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-bold text-sm border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none shadow-sm"
              placeholder="About Us | SmartPHOTOeditors"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1.5">
              Meta Description
            </label>
            <textarea
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white text-gray-900 font-normal border border-gray-300 rounded-xl focus:border-[#1265E8] outline-none leading-relaxed shadow-sm"
              placeholder="Brief summary of page for Google search results..."
            />
          </div>
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="p-4 sm:p-5 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <i className="fa-solid fa-circle-info text-[#1265E8]"></i>
          <span>
            Changes saved here update immediately on /about-us and /about-us.
          </span>
        </div>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1265E8] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          <i className={`fa-solid ${saving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}></i>
          <span>{saving ? "Saving Changes..." : "Save About Us Page"}</span>
        </button>
      </div>
    </div>
  );
};
