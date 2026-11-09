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
    question: "Do you offer free trial edits before contract commitment?",
    answer:
      "Yes. We provide up to 5 complimentary sample edits for studios and high-volume brands. This allows you to verify our turnaround, layer structure, and color consistency on your own raw captures before starting a project.",
  },
  {
    question: "What is your standard turnaround time, and can you rush overnight?",
    answer:
      "Our standard delivery is 24 hours. For high-priority production runs, we provide 12-hour rush turnarounds so you can shoot during the day and have finalized, retouched files on your desk the following morning.",
  },
  {
    question: "Do you offer volume-based tiered discounts?",
    answer:
      "Absolutely. We offer dedicated editor team structures and tiered volume rates based on monthly image volumes, drastically reducing your studio's cost per image at scale.",
  },
  {
    question: "Which file formats do you accept and deliver?",
    answer:
      "We accept RAW (CR2, CR3, NEF, ARW, DNG), TIFF, PSD, and JPEG formats. Deliverables can be exported in layered PSD with non-destructive adjustment masks, high-res TIFF, web-optimized JPEG, or transparent PNG.",
  },
  {
    question: "How do you guarantee client data privacy and image security?",
    answer:
      "We operate under bilateral non-disclosure agreements (NDAs) with biometrically restricted editing facilities. Editor terminals have USB and external storage ports physically disabled, and files are transferred via end-to-end encrypted SFTP pipelines.",
  },
];

export const FAQSection: React.FC<FAQSectionProps> = ({ initialFaqs, heading }) => {
  const activeFaqs = initialFaqs && initialFaqs.length > 0 ? initialFaqs : defaultFaqs;
  const activeHeading = heading || "Frequently Asked Questions";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50/70 border-t border-slate-200/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-header">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {activeHeading}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            Everything you need to know about our outsourcing turnaround, quality guarantees, and sample workflows.
          </p>
        </div>

        {/* FAQ Accordion Stack */}
        <div className="space-y-3.5 reveal-group">
          {activeFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-blue-300 shadow-md ring-1 ring-blue-100"
                    : "bg-white border-slate-200/80 hover:border-slate-300 shadow-sm"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                      isOpen
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-150">
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
