"use client";

import React, { useState } from "react";

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
  const title = initialData?.title || "Get Start Now!";
  const contactLink = initialData?.contactLink || "/contact-us";
  const email = initialData?.email || "info@lirisha.com";
  const phone = initialData?.phone || "18557291549";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      alert(`Email copied to clipboard: ${email}`);
    });
  };

  return (
    <section className="get-start-now fadein visible">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-xl-9 col-lg-9 text-center mx-auto">
            <ul className="contact-channels-cta shadow-lg">
              <li>
                <h2 className="mb-0 text-white font-bold tracking-wide" style={{ fontSize: "19px" }}>
                  {title}
                </h2>
              </li>
              <li>
                <a href={contactLink} className="hover:text-cyan-100 transition-colors">Contact Us</a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Live Chat will connect you with a representative.");
                  }}
                  className="hover:text-cyan-100 transition-colors"
                >
                  Chat Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleCopyEmail}
                  className="click2copy hover:text-cyan-100 transition-colors"
                  title="Click to copy email"
                >
                  Email Us{" "}
                  <i
                    className={`far ${copied ? "fa-check-circle text-cyan-200" : "fa-copy"}`}
                  ></i>
                </a>
              </li>
              <li>
                <a href={`tel:${phone}`} className="hover:text-cyan-100 transition-colors">Call Us</a>
              </li>
              <li>
                <a href={`tel:${phone}`} className="hover:text-cyan-100 transition-colors">Book a Meeting</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="space20"></div>
      </div>
    </section>
  );
};
