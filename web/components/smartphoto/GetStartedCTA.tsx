"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface GetStartedCTAProps {
  initialData?: {
    title?: string;
    contactLink?: string;
    email?: string;
    phone?: string;
  };
}

export const GetStartedCTA: React.FC<GetStartedCTAProps> = ({ initialData }) => {
  const [copied, setCopied] = useState(false);
  const title = initialData?.title || "Ready to Scale Your Studio's Visual Output?";
  const contactLink = initialData?.contactLink || "/contact-us";
  const email = initialData?.email || "info@lirisha.com";
  const phone = initialData?.phone || "1-855-695-6028";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-8 sm:p-12 shadow-2xl border border-slate-800 reveal">
          {/* Decorative ambient background mesh */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Title & Subtitle */}
            <div className="text-center lg:text-left max-w-xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-400/30 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Zero Risk Free Trial
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {title}
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Send us 5 sample images to calibrate styles and test our turnaround without any upfront commitment.
              </p>
            </div>

            {/* Multi-channel Action Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2.5 sm:gap-3">
              {/* Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
                title="Copy email address"
              >
                <i className={`fa-regular ${copied ? "fa-circle-check text-emerald-400" : "fa-copy text-slate-300"}`} />
                <span>{copied ? "Copied!" : "Email Us"}</span>
              </button>

              {/* Call Button */}
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
              >
                <i className="fa-solid fa-phone text-slate-300" />
                <span>Call Us</span>
              </a>

              {/* Live Chat Trigger */}
              <button
                type="button"
                onClick={() => alert("Our 24/7 client concierge will connect with you immediately.")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
              >
                <i className="fa-regular fa-comment-dots text-slate-300" />
                <span>Live Chat</span>
              </button>

              {/* Primary Action Button */}
              <Link
                href={contactLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
              >
                <span>Get Started</span>
                <i className="fa-solid fa-arrow-right text-[10px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
