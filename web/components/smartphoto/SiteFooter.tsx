"use client";

import React, { useState } from "react";

export const SiteFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
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
    <footer>
      <div className="container">
        {/* Footer Top Brand */}
        <div className="footer-logo text-center">
          <img
            src="/images/SPE-logo.svg"
            alt="SmartPHOTOeditors Footer logo"
            className="footer-logo-img mx-auto"
            title="SmartPHOTOeditors Footer logo"
            style={{ width: "200px", maxWidth: "100%", height: "auto", display: "inline-block" }}
          />
          <p>
            SmartPHOTOeditors (SPE) is a team of skilled photo editing specialists
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
                <i className="fa fa-envelope icons-size" aria-hidden="true"></i>
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
              <br />
              <li className="contact-col">
                <i
                  className="fa-solid fa-comments icons-size"
                  aria-hidden="true"
                ></i>
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
              <br />
              <li className="contact-col">
                <i
                  className="fa-solid fa-phone icons-size"
                  aria-hidden="true"
                ></i>
                <div className="contact-text">
                  <p>
                    <span>Toll Free Number</span> <br />
                    <a href="tel:18559240830" id="footerPhone">
                      1-855-924-0830
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
