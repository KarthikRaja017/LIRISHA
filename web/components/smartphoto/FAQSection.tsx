"use client";

import React, { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  initialFaqs?: FAQItem[];
  heading?: string;
}

const defaultFaqs: FAQItem[] = [
  {
    question: "Which image editing providers offer free trials or sample edits?",
    answer:
      "Reputable providers offer free sample edits to demonstrate quality, consistency, and turnaround before onboarding high-volume or long-term image editing projects.",
  },
  {
    question: "Do you offer bulk photo editing discounts for high-volume orders?",
    answer:
      "Yes. Bulk pricing is available based on volume, complexity, and turnaround, helping ecommerce teams reduce per-image costs at scale.",
  },
  {
    question:
      "Can you edit product photos to meet Amazon, Shopify, eBay, Etsy, Walmart & Marketplace requirements for sellers?",
    answer:
      "Yes. We align images with platform guidelines, including background, size, resolution, and formatting, to ensure compliance across major ecommerce marketplaces.",
  },
  {
    question:
      "Can your image editing service handle 500+ product photos per week for a U.S.-based ecommerce store?",
    answer:
      "Yes. Our teams handle high-volume workflows with consistent quality, meeting weekly delivery targets through scalable production and dedicated resource allocation.",
  },
  {
    question:
      "What file formats do you accept and return — can you work with RAW, TIFF, PSD, and JPEG files?",
    answer:
      "We accept RAW, TIFF, PSD, and JPEG formats and deliver outputs in required formats, optimized for web, print, or marketplace-specific needs.",
  },
];

export const FAQSection: React.FC<FAQSectionProps> = ({ initialFaqs, heading }) => {
  const activeFaqs = initialFaqs && initialFaqs.length > 0 ? initialFaqs : defaultFaqs;
  const activeHeading = heading || "Frequently Asked Questions";
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="new-faq-template py-10 bg-white">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center my-4 mt-0">
            <h2 className="text-3xl font-bold text-gray-900">
              {activeHeading}
            </h2>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          {activeFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between font-medium text-gray-800 focus:outline-none"
                >
                  <span className="text-base md:text-lg">{faq.question}</span>
                  <i
                    className={`fa ${
                      isOpen ? "fa-minus text-green-600" : "fa-plus text-gray-400"
                    } transition-transform ml-4 flex-shrink-0`}
                  ></i>
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-gray-700 leading-relaxed border-t border-gray-100 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
