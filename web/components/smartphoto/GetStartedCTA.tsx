"use client";

import React, { useState } from "react";

export const GetStartedCTA: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("info@smartphotoeditors.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      alert("Email copied to clipboard: info@smartphotoeditors.com");
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
                  Get Start Now!
                </h2>
              </li>
              <li>
                <a href="/contact-us.php">Contact Us</a>
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
                <a href="tel:18557291549">Call Us</a>
              </li>
              <li>
                <a href="tel:18557291549">Book a Meeting</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="space20"></div>
      </div>
    </section>
  );
};
