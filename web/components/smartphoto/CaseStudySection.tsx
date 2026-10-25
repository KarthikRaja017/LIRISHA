"use client";

import React from "react";

export interface CaseStudyItem {
  id?: string | number;
  img: string;
  alt: string;
  title: string;
  desc: string;
  link: string;
}

export interface CaseStudySectionData {
  heading?: string;
  items?: CaseStudyItem[];
}

interface CaseStudySectionProps {
  initialData?: CaseStudySectionData;
}

const defaultCaseStudies: CaseStudyItem[] = [
  {
    id: 1,
    img: "/images/homepage/case-study-1.webp",
    alt: "15K Edited Images Delivered to French Studio as Part of Continuous Engagement Project",
    title:
      "15K Edited Images Delivered to French Studio as Part of Continuous Engagement Project",
    desc: "Established in 2016 and based in Paris, France, the client is a visual content provider for over 500 different brands and businesses boasting more than 500,000 completed photoshoots.",
    link: "/case-study-image-enhancement",
  },
  {
    id: 2,
    img: "/images/homepage/case-study-2.webp",
    alt: "Aerial Videography Company in the UK Outsources Drone Imaging Stitching to SmartPHOTOeditor",
    title:
      "Aerial Videography Company in the UK Outsources Drone Imaging Stitching to SmartPHOTOeditor",
    desc: "The client is a London, UK based specialist in aerial and ground filming and photography. The company has been in the business for over two decades and",
    link: "/panorama360/drone-image",
  },
  {
    id: 3,
    img: "/images/homepage/case-study-3.webp",
    alt: "Image Clipping for a Leading US-Based Tech Firm To Enhance Their Product Catalog",
    title:
      "Image Clipping for a Leading US-Based Tech Firm To Enhance Their Product Catalog",
    desc: "The client is a US-based ITAR-registered technology company that is focused on developing high-performance components used in both commercial and military-grade systems.",
    link: "/image-clipping/case-study-image-clipping-tech-firm",
  },
];

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({ initialData }) => {
  const heading = initialData?.heading || "Photo Editing Success Story";
  const caseStudies =
    initialData?.items && initialData.items.length > 0 ? initialData.items : defaultCaseStudies;

  return (
    <section className="homepage-case-study pt-5 fadein visible">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-8 col-xl-8 offset-xl-2 offset-lg-2 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {heading}
            </h2>
            <div className="space30"></div>
          </div>

          <div className="col-md-12 col-lg-12 col-xl-12">
            {caseStudies.map((study, idx) => (
              <React.Fragment key={study.id || idx}>
                <div className="row align-items-center my-4">
                  <div className="col-md-4 col-xl-3 col-lg-3 col-sm-3 col-12 mb-3 mb-sm-0">
                    <img
                      src={study.img}
                      alt={study.alt || study.title}
                      className="img-fluid custom-img rounded-xl shadow-sm"
                    />
                  </div>
                  <div className="col-md-5 col-xl-7 col-lg-7 col-sm-7 col-12 mb-3 mb-sm-0">
                    <h3 className="font-semibold text-lg text-gray-900 leading-snug">
                      {study.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{study.desc}</p>
                  </div>
                  <div className="col-md-3 col-xl-2 col-lg-2 col-sm-2 col-12 text-sm-right">
                    <a
                      href={study.link}
                      className="butn4 butn__new butn-size inline-block"
                      aria-label={`View more ${study.title}`}
                    >
                      View More
                    </a>
                  </div>
                </div>
                {idx < caseStudies.length - 1 && <hr className="my-6" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
