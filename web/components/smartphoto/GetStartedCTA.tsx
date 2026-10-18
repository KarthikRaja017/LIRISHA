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
  const contactLink = initialData?.contactLink || "/contact-us.php";
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
            <ul className="contact-channels-cta">
              <li>
                <h2 className="mb-0" style={{ fontSize: "20px" }}>
                  {title}
                </h2>
              </li>
              <li>
                <a href={contactLink}>Contact Us</a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Live Chat will connect you with a representative.");
                  }}
                >
                  Chat Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleCopyEmail}
                  className="click2copy"
                  title="Click to copy email"
                >
                  Email Us{" "}
                  <i
                    className={`far ${copied ? "fa-check-circle" : "fa-copy"}`}
                  ></i>
                </a>
              </li>
              <li>
                <a href={`tel:${phone}`}>Call Us</a>
              </li>
              <li>
                <a href={`tel:${phone}`}>Book a Meeting</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="space20"></div>
      </div>
    </section>
  );
};
