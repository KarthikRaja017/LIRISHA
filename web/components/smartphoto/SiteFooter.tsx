"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

export const SiteFooter: React.FC = () => {
  const { getSettingValue } = useSettings();
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const footerLogo = getSettingValue("site_footer_logo", getSettingValue("site_logo", "/images/SPE-logo.svg"));
  const siteName = getSettingValue("site_name", "SmartPHOTOeditors");
  const contactEmail = getSettingValue("contact_email", "info@smartphotoeditors.com");
  const contactPhone = getSettingValue("contact_phone", "1-855-924-0830");

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(contactEmail).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      alert(`Email copied to clipboard: ${contactEmail}`);
    });
  };

  return (
    <footer>
      <div className="container">
        {/* Footer Top Brand */}
        <div className="footer-logo text-center">
          <img
            src={footerLogo}
            alt={`${siteName} Footer logo`}
            className="footer-logo-img mx-auto"
            title={`${siteName} Footer logo`}
            style={{ width: "200px", maxWidth: "100%", height: "auto", display: "inline-block" }}
          />
          <p>
            {siteName} is a team of skilled photo editing specialists
            with a <br />
            commitment to providing quality, excellence, and satisfaction.
          </p>
        </div>

        {/* 4 Column Links & Info */}
        <div
          className="row"
          style={{ borderBottom: "2px solid #1c2a5a", paddingBottom: "19px" }}
        >
          {/* Quick Links */}
          <div className="col-6 col-md-2 mb-4 mb-md-0">
            <div className="widget quick-links">
              <p className="footer-menu-heading">Quick Links</p>
              <ul>
                <li>
                  <a href="/services"> Services</a>
                </li>
                <li>
                  <a href="/resources"> Resources</a>
                </li>
                <li>
                  <a href="/about-us.php"> About Us</a>
                </li>
                <li>
                  <a href="/contact-us.php"> Contact Us</a>
                </li>
                <li>
                  <a href="/sample-images.php"> Portfolio</a>
                </li>
                <li>
                  <a href="/blog/"> Blog</a>
                </li>
                <li>
                  <a href="/sitemap.php"> Sitemap</a>
                </li>
                <li>
                  <a href="/case-study/"> Case Studies</a>
                </li>
                <li>
                  <a href="/articles/"> Resource Articles</a>
                </li>
                <li>
                  <a href="/accessories/"> Accessories</a>
                </li>
                <li>
                  <a href="/testimonials.php"> Testimonials</a>
                </li>
                <li>
                  <a href="/privacy-policy.php"> Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Features */}
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <div className="widget quick-links">
              <p className="footer-menu-heading">Features</p>
              <ul>
                <li>
                  <a href="/security.php"> Security</a>
                </li>
                <li>
                  <a href="/quality.php"> Quality</a>
                </li>
                <li>
                  <a href="/247-coverage.php"> 24/7 Coverage</a>
                </li>
                <li>
                  <a href="/pricing.php"> Pricing</a>
                </li>
                <li>
                  <a href="/benefits.php"> Benefits</a>
                </li>
                <li>
                  <a href="/turnaround-time.php"> Quick Delivery</a>
                </li>
                <li>
                  <a href="/compliant-software.php"> 100% Compliance Software</a>
                </li>
                <li>
                  <a href="/adobe-specialized-artists.php">
                    {" "}
                    Adobe specialized artists
                  </a>
                </li>
                <li>
                  <a href="/sitemap.php"> Sitemap</a>
                </li>
                <li>
                  <a href="/glossary.php"> Glossary</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Addresses */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <div className="widget address">
              <p className="footer-menu-heading">Address</p>
              <div className="add-1">
                <p className="country-name">USA</p>
                <p>116 Village Blvd, Suite 220, Princeton, NJ 08540</p>
              </div>
              <div className="add-1">
                <p className="country-name">India</p>
                <p>
                  No.6, Banaswadi Main Road, Dodda Banaswadi, Bangalore - 560 043
                </p>
              </div>
              <div className="add-1">
                <p className="country-name">Philippines</p>
                <p>Aeon Towers, J.P. Laurel Avenue, Bajada, Davao 8000</p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="col-12 col-md-4">
            <ul className="widget contact-us">
              <li className="contact-col">
                <span className="icons-size">
                  <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                </span>
                <div className="contact-text">
                  <p>
                    <span>Email</span> <br />
                    <a
                      href="#"
                      onClick={handleCopyEmail}
                      className="click2copy"
                      id="footerEmail"
                    >
                      info***@smartphotoeditors.com{" "}
                      <i
                        className={`far ${
                          copied ? "fa-check-circle text-green-400" : "fa-copy"
                        } copy-icon`}
                      ></i>
                    </a>
                  </p>
                </div>
              </li>
              <li className="contact-col">
                <span className="icons-size">
                  <i
                    className="fa-solid fa-comments"
                    aria-hidden="true"
                  ></i>
                </span>
                <div className="contact-text">
                  <p>
                    <span>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(
                            "Live Chat will connect you with a representative."
                          );
                        }}
                      >
                        Live Chat
                      </a>
                    </span>
                  </p>
                </div>
              </li>
              <li className="contact-col">
                <span className="icons-size">
                  <i
                    className="fa-solid fa-phone"
                    aria-hidden="true"
                  ></i>
                </span>
                <div className="contact-text">
                  <p>
                    <span>Toll Free Number</span> <br />
                    <a href={`tel:${contactPhone.replace(/[^0-9+]/g, "")}`} id="footerPhone">
                      {contactPhone}
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Social */}
        <div className="copyright">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-xxl-8 col-sm-12 col-md-6">
              <p>
                © <span>{currentYear}</span> www.smartphotoeditors.com | Web
                Property of Flatworld Solutions Inc.{" "}
                <span className="mx-2 opacity-30">|</span>
                <Link
                  href="/admin"
                  className="text-gray-400 hover:text-white transition-colors underline decoration-dotted text-xs inline-flex items-center gap-1"
                >
                  <i className="fa-solid fa-gear text-[10px]"></i> Admin CMS
                </Link>
                <span className="mx-2 opacity-30">|</span>
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-white transition-colors underline decoration-dotted text-xs inline-flex items-center gap-1"
                >
                  <i className="fa-solid fa-arrow-right-to-bracket text-[10px]"></i> Admin Login
                </Link>
              </p>
            </div>
            <div className="col-xl-4 col-lg-4 col-xxl-4 col-sm-12 col-md-6">
              <div className="social-icons">
                <p>
                  Social connect :{" "}
                  <a
                    href="https://www.facebook.com/SmartPHOTOeditors/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                  </a>
                  <a
                    href="https://twitter.com/smartphotoedits"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <i className="fa-brands fa-x-twitter" aria-hidden="true"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/smart-photo-editors/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Linkedin"
                  >
                    <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                  </a>
                  <a
                    href="//pinterest.com/smartphotoedits/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pinterest"
                  >
                    <i className="fa-brands fa-pinterest-p" aria-hidden="true"></i>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
