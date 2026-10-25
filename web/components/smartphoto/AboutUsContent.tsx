"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPageContent } from "@/lib/api/content";
import { PageContent } from "@/types/content";

export const AboutUsContent: React.FC = () => {
  const [pageData, setPageData] = useState<PageContent | null>(null);

  useEffect(() => {
    let isMounted = true;
    getPageContent("about-us")
      .then((data) => {
        if (isMounted && data) {
          setPageData(data);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch about-us dynamic page:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // 1. Hero Banner Content
  const heroTitle = pageData?.hero?.title || "About SPE Image Editing Specialists";
  const heroTaglineRaw =
    pageData?.hero?.tagline ||
    "SmartPHOTOeditors (SPE) provides professional, AI-assisted image editing and post-production support to businesses that need high-quality work delivered consistently, efficiently, and at scale. We work as an extension of our clients' teams, helping them manage everything from day-to-day editing requirements to large-volume projects with demanding turnaround times.\n\nOur clients include real estate businesses, e-commerce companies, photography studios, marketing agencies, and other organizations that depend on high-quality visual content. Whether the requirement involves a few specialized edits or thousands of images, we provide the people, processes, and technology needed to keep projects moving without compromising on quality.";
  const heroParagraphs = heroTaglineRaw
    .split(/\n\s*\n|\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  const heroImage =
    pageData?.hero?.image || "/images/about/about-banner-540x671.webp";
  const ctaText = pageData?.hero?.ctaText || "Get a free Quote Note";
  const ctaLink = pageData?.hero?.ctaLink || "/contact-us";

  // 2. Statistics Section Content
  const defaultStats = [
    { value: "05+", label: "AWARDS REWARDED" },
    { value: "13+", label: "YEARS OF EXPERIENCE" },
    { value: "1000+", label: "COMPLETED PROJECT" },
    { value: "1300+", label: "HAPPY CLIENT" },
  ];
  const statsSection = pageData?.sections?.find(
    (s: any) => s.type === "statistics"
  );
  const statsItems =
    statsSection?.items && statsSection.items.length > 0
      ? statsSection.items
      : defaultStats;

  // 3. Automation Section Content
  const automationSection = pageData?.sections?.find(
    (s: any) => s.type === "automation"
  );
  const automationTitle =
    automationSection?.title ||
    "Automation Helps Us Move Faster. Human Expertise Keeps Quality in Focus.";
  const automationImage =
    automationSection?.image || "/images/about/country-info-1000x250.webp";
  const defaultAutomationParagraphs = [
    "At SPE, technology is part of the workflow, but it does not replace human expertise.",
    "We use AI-assisted tools to speed up repetitive and time-consuming tasks, improve workflow efficiency, and help our teams handle larger volumes of work. However, every project still benefits from the judgment and experience of skilled editors. Our editors review outputs, make refinements where required, and ensure the final images meet the client's specifications and quality expectations.",
    "This Human-in-the-Loop approach gives our clients the benefits of faster processing without relying entirely on automated results. AI helps us work more efficiently; our people make sure the work is right.",
  ];
  const automationParagraphs =
    automationSection?.paragraphs && automationSection.paragraphs.length > 0
      ? automationSection.paragraphs
      : defaultAutomationParagraphs;

  // 4. Scale Section Content
  const scaleSection = pageData?.sections?.find((s: any) => s.type === "scale");
  const scaleTitle =
    scaleSection?.title ||
    "From One-Off Projects to High Volumes. We Scale with You";
  const scaleDescription =
    scaleSection?.description ||
    "From real estate and eCommerce businesses to photography studios, marketing agencies, and other image-driven organizations, we provide flexible editing support built around each client's requirements. Our AI-assisted, Human-in-the-Loop workflow helps speed up repetitive tasks, while experienced editors review, refine, and verify the final output. Whether the requirement is a one-time project or ongoing support, clients receive consistent quality, reliable turnaround, and a workflow that can scale as volumes grow.";
  const scaleImage =
    scaleSection?.image || "/images/about/professionals-1.webp";

  // 5. Why Businesses Choose SPE Content
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
  const whyChooseSection = pageData?.sections?.find(
    (s: any) => s.type === "why_choose"
  );
  const whyChooseTitle =
    whyChooseSection?.title || "Why Businesses Choose SmartPHOTOeditors";
  const whyChooseDescription =
    whyChooseSection?.description ||
    "Our approach combines experienced editors, AI-assisted workflows, and structured quality checks to help businesses manage image editing requirements more efficiently. Technology helps us reduce repetitive effort and improve turnaround times, while human expertise remains responsible for reviewing and refining every project. With scalable teams, secure processes, licensed software, and flexible support models, we help global clients maintain quality while controlling costs.";
  const whyChooseItems =
    whyChooseSection?.items && whyChooseSection.items.length > 0
      ? whyChooseSection.items
      : defaultWhyChooseItems;

  const halfIndex = Math.ceil(whyChooseItems.length / 2);
  const whyChooseCol1 = whyChooseItems.slice(0, halfIndex);
  const whyChooseCol2 = whyChooseItems.slice(halfIndex);

  // 6. Outsource CTA Content
  const ctaSection = pageData?.sections?.find((s: any) => s.type === "cta");
  const ctaTitle =
    ctaSection?.title || "Outsource Image Editing Services to the Experts";
  const ctaDescription =
    ctaSection?.description ||
    "World-class support helps you discover new ways to enhance your images to connect with your customers, showcase your brand, and fulfill your marketing strategies. Contact SmartPHOTOeditors to be your photo editing service partner.";
  const ctaBtnText =
    ctaSection?.buttonText || "Contact Us to Get Free Quote";
  const ctaBtnLink = ctaSection?.buttonLink || "/contact-us";

  return (
    <div className="about-page-inner">
      {/* 1. BANNER SECTION */}
      <div className="banner-section aboutus-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 d-flex align-items-center">
              <div className="banner-text">
                <div className="banner-badge-attractive">
                  <span className="banner-badge-dot"></span>
                  <span>About Our Specialists</span>
                </div>
                <h1>{heroTitle}</h1>
                {heroParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                <div className="cta-button-banner">
                  <Link href={ctaLink} className="btn round-button cta-btn">
                    {ctaText}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="banner-img">
                <Image
                  alt={heroTitle}
                  title={heroTitle}
                  width={540}
                  height={671}
                  className="img-fluid"
                  src={heroImage}
                  priority
                  unoptimized={heroImage.startsWith("http")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATISTIC SECTION */}
      <div className="section stastic-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 stastic-counter-row pt-3">
              {statsItems.map((stat: any, idx: number) => (
                <React.Fragment key={idx}>
                  <div className="stastic-counter mb-2">
                    <div className="stastic-head">{stat.value}</div>
                    <div className="stastic-desc">{stat.label}</div>
                  </div>

                  {idx < statsItems.length - 1 && (
                    <>
                      <div className="line-seperator">
                        <div className="line"></div>
                      </div>

                      <div className="stastic-divider-img">
                        <Image
                          alt="camera-icon"
                          width={idx % 2 === 0 ? 40 : 38}
                          height={idx % 2 === 0 ? 48 : 53}
                          src={
                            idx % 2 === 0
                              ? "/images/about/camera-stand-icon.webp"
                              : "/images/about/flash-icon-76x106.webp"
                          }
                        />
                      </div>
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. SERVICE INTRO ABOUT (AI-Assisted Human Expertise) */}
      <div
        className="service-intro-about mt-5"
        style={{ background: "#e4eaff", padding: "70px 0px 50px" }}
      >
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12 mb-2 text-center mar-auto">
              <h2 className="heading-h2 w-60 element-center">
                {automationTitle}
              </h2>
            </div>
            <div className="col-md-12 mb-4 text-center">
              <Image
                alt="Country Info"
                title="country-info"
                width={1000}
                height={250}
                className="img-fluid"
                src={automationImage}
                unoptimized={automationImage.startsWith("http")}
              />
            </div>
            <div className="col-md-12 text-center mar-auto w-95 mt-3 mb-4">
              {automationParagraphs.map((para: string, i: number) => (
                <p key={i} className="w-90 element-center">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. SCALE SECTION */}
      <div className="service-section eclipse-style-left">
        <div className="container">
          <div className="row mb-3 align-items-center">
            <div className="col-md-6">
              <div className="service-div w-80">
                <h2 className="heading-h2">{scaleTitle}</h2>
              </div>
              <div>
                <p>{scaleDescription}</p>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <Image
                alt="Professionals"
                title="Professionals"
                width={500}
                height={350}
                className="img-fluid"
                src={scaleImage}
                unoptimized={scaleImage.startsWith("http")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5. WHY BUSINESSES CHOOSE SPE */}
      <div className="section eclipse-style-right" style={{ padding: "0px 0px 50px" }}>
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <h2 className="w-90 element-center heading-h2">
                {whyChooseTitle}
              </h2>
              <p className="w-90 element-center">
                {whyChooseDescription}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <ul className="service-list">
                {whyChooseCol1.map((item: any, idx: number) => (
                  <li key={idx} className="service-list-item">
                    <h3>{item.title}</h3>
                    <p className="m-0">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="service-list">
                {whyChooseCol2.map((item: any, idx: number) => (
                  <li key={idx} className="service-list-item">
                    <h3>{item.title}</h3>
                    <p className="m-0">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 6. QUALITY PROCESS CARDS */}
      <section className="sec-quality-process mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="quality-process-list mb-4">
                {/* 01 Security */}
                <li>
                  <Link href="/security" className="q-process-box">
                    <div className="counter">01</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="38.603"
                      height="48.686"
                      viewBox="0 0 38.603 48.686"
                    >
                      <g transform="translate(0 0)">
                        <path
                          d="M7.186,32.644c-1.218,0-2.358.024-3.5-.01a1.065,1.065,0,0,1-1.065-1.043c-.32-2.065-.623-4.13-.93-6.2C1.146,21.7.608,17.995.05,14.3c-.2-1.344.19-1.836,1.544-1.836q17.714,0,35.428,0c1.324,0,1.729.5,1.533,1.8q-1.05,7.006-2.075,14.015c-.167,1.128-.333,2.257-.515,3.384a1.016,1.016,0,0,1-.972.955c-1.172.043-2.347.013-3.589.013v-.587q0-3.479,0-6.959a3.081,3.081,0,0,0-3.184-3.359A13.282,13.282,0,0,1,21,19.44a2.737,2.737,0,0,0-3.363-.01,13.366,13.366,0,0,1-7.329,2.3,3.074,3.074,0,0,0-3.116,3.266c0,2.338,0,4.675,0,7.012v.639"
                          transform="translate(0 2.523)"
                          fill="#1265E8"
                        />
                        <path
                          d="M7.677,28.065c0-1.459,0-2.916,0-4.373,0-.993.314-1.318,1.311-1.374a15.789,15.789,0,0,0,6.73-1.7c.462-.249.9-.55,1.334-.842a1.1,1.1,0,0,1,1.37-.006,14.625,14.625,0,0,0,7.959,2.542c1.144.071,1.415.339,1.415,1.48,0,2.389-.024,4.779.006,7.167a13.264,13.264,0,0,1-6.342,11.883A33.053,33.053,0,0,1,18.293,44.6a1.189,1.189,0,0,1-.9.071,16.534,16.534,0,0,1-7.846-6.363,13.121,13.121,0,0,1-1.872-7.03c0-1.071,0-2.143,0-3.214m10.084,8.7c.28,0,.562,0,.842,0,.72-.012,1.016-.358.911-1.079-.113-.78-.215-1.563-.361-2.339a1.671,1.671,0,0,1,.461-1.658,2.453,2.453,0,0,0-.156-3.5,2.522,2.522,0,0,0-3.478.061,2.45,2.45,0,0,0-.088,3.461,1.61,1.61,0,0,1,.438,1.611c-.142.794-.25,1.593-.36,2.392-.093.689.208,1.034.9,1.047.3.006.6,0,.895,0"
                          transform="translate(1.554 3.955)"
                          fill="#1265E8"
                        />
                        <path
                          d="M4.718,12.948H2.4c-.01-.19-.025-.375-.025-.559q0-5.48,0-10.961c0-1.038.39-1.42,1.442-1.42C6.313.007,8.808.02,11.3,0a1.384,1.384,0,0,1,1.419.868c.2.446.456.869.664,1.313a3.411,3.411,0,0,0,3.4,2.1c5.622-.023,11.243-.01,16.863-.007a4.4,4.4,0,0,1,.735.04,1,1,0,0,1,.883.969c.011,2.529,0,5.058-.011,7.585,0,.013-.02.026-.054.069H32.919c0-.83,0-1.633,0-2.436,0-.492.014-.984,0-1.474a2.023,2.023,0,0,0-2.127-2.063c-2.2-.008-4.391,0-6.588,0H7.071A2.088,2.088,0,0,0,4.718,9.329c0,1.19,0,2.381,0,3.619"
                          transform="translate(0.481 0)"
                          fill="#1265E8"
                        />
                        <rect
                          width="24.035"
                          height="3.909"
                          transform="translate(7.277 9.022)"
                          fill="#1265E8"
                        />
                      </g>
                    </svg>
                    <span>Security</span>
                  </Link>
                </li>

                {/* 02 Quality */}
                <li>
                  <Link href="/quality" className="q-process-box">
                    <div className="counter">02</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="42.793"
                      height="48.815"
                      viewBox="0 0 42.793 48.815"
                    >
                      <g transform="translate(0 0)">
                        <path
                          d="M37.33,18.4a15.823,15.823,0,0,0-5.832-12.2,16.089,16.089,0,0,0-21.728.847A15.815,15.815,0,0,0,4.5,19.261a15.421,15.421,0,0,0,3.31,10.686L0,42.508l6.837,6.307,8.23-11.47a15.938,15.938,0,0,0,5.856,1.109A15.81,15.81,0,0,0,32.355,33.1,15.4,15.4,0,0,0,37.33,18.4ZM20.923,34.4a11.834,11.834,0,0,1-8.916-4.041L16.48,24.13a6.852,6.852,0,0,0,4.443,1.642,6.969,6.969,0,0,0,6.953-6.953,6.864,6.864,0,0,0-1.642-4.443l6.229-4.473a11.9,11.9,0,0,1,0,16.985A11.758,11.758,0,0,1,20.923,34.4Z"
                          fill="#1265E8"
                        />
                      </g>
                    </svg>
                    <span>Quality</span>
                  </Link>
                </li>

                {/* 03 Pricing */}
                <li>
                  <Link href="/pricing" className="q-process-box">
                    <div className="counter">03</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45.986"
                      height="46.002"
                      viewBox="0 0 45.986 46.002"
                    >
                      <g transform="translate(0 0)">
                        <path
                          d="M38.868,26.471l-15.4-15.4a4.119,4.119,0,0,0-2.923-1.218H4.12A4.125,4.125,0,0,0,0,13.974V30.4a4.118,4.118,0,0,0,1.218,2.923l15.4,15.4a4.13,4.13,0,0,0,5.846,0L38.868,32.317a4.13,4.13,0,0,0,0-5.846ZM9.566,19.42A2.433,2.433,0,1,1,12,16.987,2.433,2.433,0,0,1,9.566,19.42Z"
                          transform="translate(0 -9.849)"
                          fill="#1265E8"
                        />
                        <path
                          d="M32.887,4.12A4.12,4.12,0,0,0,29.964,2.9H17.2a4.126,4.126,0,0,1,3.488,1.961l15.4,15.4a4.12,4.12,0,0,1,0,5.846L30.9,31.3l2.846,2.846a4.13,4.13,0,0,0,5.846,0L44.768,18.96a4.13,4.13,0,0,0,0-5.846Z"
                          transform="translate(1.218 -2.902)"
                          fill="#1265E8"
                        />
                      </g>
                    </svg>
                    <span>Pricing</span>
                  </Link>
                </li>

                {/* 04 Benefits */}
                <li>
                  <Link href="/benefits" className="q-process-box">
                    <div className="counter">04</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48.001"
                      height="48.001"
                      viewBox="0 0 48.001 48.001"
                    >
                      <g transform="translate(0 0)">
                        <path
                          d="M24,0A24,24,0,1,0,48,24,24.027,24.027,0,0,0,24,0Zm0,44.4A20.4,20.4,0,1,1,44.4,24,20.423,20.423,0,0,1,24,44.4Zm10.4-27.8a1.8,1.8,0,0,0-2.546,0L20.4,28.055l-4.254-4.255a1.8,1.8,0,0,0-2.546,2.546l5.527,5.527a1.8,1.8,0,0,0,2.546,0L34.4,19.146A1.8,1.8,0,0,0,34.4,16.6Z"
                          fill="#1265E8"
                        />
                      </g>
                    </svg>
                    <span>Benefits</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <div className="testimonials-section mb-5 mt-5">
        <div className="container">
          <h2 className="heading-h2">
            Listen to What <span className="hover">Our <br />Clients</span> Have to Say About Us.
          </h2>
          <Link
            href="/testimonials"
            className="btn round-button read-more-button"
            title="See More Reviews"
          >
            See More Reviews
          </Link>

          {/* Row 1 */}
          <div className="row">
            {/* Testimonial 1 */}
            <div className="col-md-4">
              <div className="testimonial-box first" id="testimonial1">
                <p className="test-text">
                  My experience with Frederick at SmartPHOTOeditors has been incredibly
                  positive, particularly in terms of editing my photographs. I am
                  impressed by the professionalism extended to me, as well as the swift
                  turnaround time in handling my items.
                </p>
                <div className="test-meta">
                  <div className="test-img">
                    <Image
                      alt="SPE testimonial 2"
                      width={55}
                      height={55}
                      src="/images/about/test2.webp"
                    />
                  </div>
                  <div className="test-meta-text">
                    <p className="tname">Photography Professional</p>
                    <p className="tdesc">United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="col-md-4">
              <div className="testimonial-box second" id="testimonial2">
                <p className="test-text">
                  I&apos;ve recently had the opportunity to review the edited photos from the
                  &quot;Millenium Towers&quot; project and I was profoundly impressed. The
                  team at SmartPHOTOeditors is top-notch!
                </p>
                <div className="test-meta">
                  <div className="test-img">
                    <Image
                      alt="SPE testimonial 4"
                      width={55}
                      height={55}
                      src="/images/about/test4.webp"
                    />
                  </div>
                  <div className="test-meta-text">
                    <p className="tname">Real Estate Agent</p>
                    <p className="tdesc">Germany</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="col-md-4 last">
              <div className="testimonial-box third" id="testimonial3">
                <p className="test-text">
                  Frederick was very helpful throughout the process and produced amazing
                  results. The turnaround was super quick, and revisions were handled
                  without any hesitation.
                </p>
                <div className="test-meta">
                  <div className="test-img">
                    <Image
                      alt="SPE testimonial 3"
                      width={55}
                      height={55}
                      src="/images/about/test3.webp"
                    />
                  </div>
                  <div className="test-meta-text">
                    <p className="tname">E-Commerce Merchant</p>
                    <p className="tdesc">United States</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. CTA SECTION */}
      <section className="section cta-section py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto cta-card-attractive p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C8F8]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1265E8]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block text-[#00C8F8] text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[rgba(0,200,248,0.1)] rounded-full border border-[rgba(0,200,248,0.2)] mb-4">
                Global Creative Support
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {ctaTitle}
              </h2>
              <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                {ctaDescription}
              </p>
              <div className="flex justify-center items-center gap-4 flex-wrap">
                <Link
                  href={ctaBtnLink}
                  className="btn-brand-primary px-8 py-3.5 rounded-full font-semibold text-base shadow-xl inline-flex items-center gap-2"
                >
                  {ctaBtnText}
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </Link>
                <Link
                  href="/contact-us"
                  className="btn bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3.5 rounded-full font-semibold text-base transition-all inline-flex items-center gap-2"
                >
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PORTRAIT CASE STUDIES SECTION */}
      <div className="section portrait-cs-section">
        <div className="container">
          <div className="row">
            {/* Title Column */}
            <div className="col-md-4 mb-3">
              <h5>Our Success Story</h5>
              <h2 className="heading-h2">
                Photo Editing <span className="hover">Case Study</span>
              </h2>
              <Link
                href="/case-study/"
                className="btn round-button read-more-button"
                title="See More Success Stories"
              >
                See More Success Stories
              </Link>
            </div>

            {/* Case Study 1 */}
            <div className="col-md-4 mb-3">
              <div className="other-cs-inner-service">
                <div className="cs-heading-inner-service">
                  <span className="cs-tab1">Image Clipping</span>
                  <h3 className="cs-title-inner-service">
                    <Link href="/image-clipping/image-clipping-for-design-agency">
                      Time-critical Image Clipping Project for Atlanta-based Design Agency
                    </Link>
                  </h3>
                  <Link
                    href="/image-clipping/image-clipping-for-design-agency"
                    className="cs-button"
                  >
                    VIEW NOW &#129030;
                  </Link>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="col-md-4 mb-3">
              <div className="other-cs-inner-service">
                <div className="cs-heading-inner-service">
                  <span className="cs-tab2">Image Editing</span>
                  <h3 className="cs-title-inner-service">
                    <Link href="/case-study/automobile-image-clipping">
                      UK&apos;s Largest Automotive Seller Clips 5000 Images with SPE&apos;s Image
                      Clipping Support
                    </Link>
                  </h3>
                  <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
                    The Client: An Enduring Symbol of Successful Car Sales
                  </p>
                  <Link
                    href="/case-study/automobile-image-clipping"
                    className="cs-button"
                  >
                    VIEW NOW &#129030;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
