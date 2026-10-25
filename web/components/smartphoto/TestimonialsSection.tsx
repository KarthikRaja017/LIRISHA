"use client";

import React from "react";

export interface HomeReviewItem {
  id?: string | number;
  quote: string;
  authorRole: string;
  authorCompany: string;
  avatar: string;
  boxStyle?: "dark" | "white";
}

export interface HomeTestimonialsData {
  headingLine1?: string;
  headingLine2?: string;
  ctaText?: string;
  ctaLink?: string;
  items?: HomeReviewItem[];
}

interface TestimonialsSectionProps {
  initialData?: HomeTestimonialsData;
}

const defaultReviews: HomeReviewItem[] = [
  {
    id: 1,
    quote:
      "Their edits are always sharp and on point. They really get our style, and their quick responses make the whole process so much easier.",
    authorRole: "Brand Manager",
    authorCompany: "Jewelry Company, UK",
    avatar: "/images/homepage/testi-user1.webp",
    boxStyle: "dark",
  },
  {
    id: 2,
    quote:
      "They always nail the edits, and the results look fantastic. Super easy to work with, and their support feels genuinely helpful — not just professional, but like our extended team.",
    authorRole: "Photography Lead",
    authorCompany: "Interior Design Studio, Australia",
    avatar: "/images/homepage/testi-user2.webp",
    boxStyle: "white",
  },
  {
    id: 3,
    quote:
      "Our visuals turned out way better than we imagined. They're quick with tweaks, really know their stuff, and we genuinely trust them to get it right every time.",
    authorRole: "Digital Marketing Manager",
    authorCompany: "Travel & Hospitality, Singapore",
    avatar: "/images/homepage/testi-user3.webp",
    boxStyle: "dark",
  },
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ initialData }) => {
  const heading1 = initialData?.headingLine1 || "Listen to What Our";
  const heading2 = initialData?.headingLine2 || "Clients Have to Say About Us";
  const ctaText = initialData?.ctaText || "See More Reviews";
  const ctaLink = initialData?.ctaLink || "/testimonials";
  const reviews =
    initialData?.items && initialData.items.length > 0 ? initialData.items : defaultReviews;

  return (
    <section className="homepage-testimonials fadein visible">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8 col-lg-8 col-xl-8 col-sm-9">
            <h2>
              {heading1}
              <br />
              {heading2}
            </h2>
            <div className="space20"></div>
          </div>
          <div className="col-md-4 col-lg-4 col-xl-4 col-sm-3 text-right">
            <a href={ctaLink} className="butn3 butn__new butn-size">
              {ctaText}
            </a>
            <div className="space20"></div>
          </div>
        </div>
        <div className="row">
          {reviews.map((rev, idx) => {
            const isWhite = rev.boxStyle === "white" || (!rev.boxStyle && idx % 3 === 1);
            return (
              <div key={rev.id || idx} className="col-md-12 col-lg-4 col-xl-4 col-sm-6">
                <div className={`home-testimonials-box ${isWhite ? "white" : ""}`}>
                  <img
                    src={
                      isWhite
                        ? "/images/homepage/icon-quotes-black.webp"
                        : "/images/homepage/icon-quotes-white.webp"
                    }
                    alt="Quote"
                    className="quote-home"
                  />
                  <p>{rev.quote}</p>
                  <div className="d-flex flex-nowrap justify-content-top">
                    <div className="flex-shrink-0">
                      <img
                        src={rev.avatar}
                        alt={rev.authorRole || "Testimonial Client"}
                        className="testi-user"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <p className={`font-semibold ${isWhite ? "text-black" : "text-white"}`}>
                        {rev.authorRole}
                      </p>
                      <p className={isWhite ? "text-gray-600" : "text-gray-400"}>
                        {rev.authorCompany}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
