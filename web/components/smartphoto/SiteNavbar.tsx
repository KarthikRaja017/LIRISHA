"use client";

import React, { useState } from "react";
import Link from "next/link";

export const SiteNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header id="navbar">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-expand-md">
              <Link className="navbar-brand" href="/">
                <img
                  src="/images/SPE-logo.svg"
                  alt="SmartPHOTOeditors logo"
                  className="header-logo-img"
                  title="SmartPHOTOeditors logo"
                  style={{ width: "240px", maxWidth: "100%", height: "auto", display: "inline-block" }}
                />
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className={`navbar-collapse ${isOpen ? "show" : ""}`}
                id="main_nav"
              >
                <ul className="navbar-nav ml-auto navbar-dark align-items-md-center">
                  {/* Services Dropdown */}
                  <li
                    className={`nav-item dropdown ${
                      activeDropdown === "services" ? "show" : ""
                    }`}
                    onMouseEnter={() => setActiveDropdown("services")}
                    onMouseLeave={() => {
                      setActiveDropdown(null);
                      setActiveSubmenu(null);
                    }}
                  >
                    <a
                      className="nav-link cursor-pointer"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown("services");
                      }}
                    >
                      Services
                    </a>
                    <ul
                      className={`dropdown-menu ${
                        activeDropdown === "services" ? "show" : ""
                      }`}
                    >
                      {/* Real Estate */}
                      <li
                        className="dropdown-item"
                        onMouseEnter={() => setActiveSubmenu("real-estate")}
                        onMouseLeave={() => setActiveSubmenu(null)}
                      >
                        <a href="/real-estate/">Real Estate</a>
                        <ul
                          className={`submenu dropdown-menu ${
                            activeSubmenu === "real-estate" ? "show" : ""
                          }`}
                        >
                          <li>
                            <a className="dropdown-item" href="/real-estate/image-enhancement.php">
                              Image Enhancements
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/real-estate/floor-plan-conversions.php">
                              Floor Plan Conversions
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/real-estate/photo-corrections.php">
                              Photo Corrections
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/real-estate/hdr-blending-corrections.php">
                              HDR Blending Corrections
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/real-estate/perspective-correction.php">
                              Perspective Corrections
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/real-estate/sky-replacement.php">
                              Sky Replacement
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/real-estate/360-virtual-tours.php">
                              360° Virtual Tour
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/real-estate/drone-image-editing.php">
                              Drone Image Editing
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/panorama360/">
                              360°Panorama
                            </a>
                          </li>
                        </ul>
                      </li>

                      {/* Portrait Services */}
                      <li
                        className="dropdown-item"
                        onMouseEnter={() => setActiveSubmenu("portrait")}
                        onMouseLeave={() => setActiveSubmenu(null)}
                      >
                        <a href="/portrait/">Portrait Services</a>
                        <ul
                          className={`submenu dropdown-menu ${
                            activeSubmenu === "portrait" ? "show" : ""
                          }`}
                        >
                          <li>
                            <a className="dropdown-item" href="/photo-retouching/">
                              Photo Retouching
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/portrait/airbrushing-services.php">
                              Airbrushing
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/portrait/wedding-photo-editing.php">
                              Wedding Photo Editing
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/portrait/photo-montage.php">
                              Photo Montage
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/portrait/skin-retouching.php">
                              Skin Retouching
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/portrait/remove-backgrounds.php">
                              Remove Background
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/portrait/natural-shadow.php">
                              Natural Shadow
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/portrait/color-corrections.php">
                              Color Correction
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/portrait/exposure-corrections.php">
                              Exposure Corrections
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/portrait/high-end-retouching.php">
                              High-end Retouching
                            </a>
                          </li>
                        </ul>
                      </li>

                      {/* Image Clipping */}
                      <li
                        className="dropdown-item"
                        onMouseEnter={() => setActiveSubmenu("clipping")}
                        onMouseLeave={() => setActiveSubmenu(null)}
                      >
                        <a href="/image-clipping/">Image Clipping</a>
                        <ul
                          className={`submenu dropdown-menu ${
                            activeSubmenu === "clipping" ? "show" : ""
                          }`}
                        >
                          <li>
                            <a className="dropdown-item" href="/image-clipping/clipping-path-services.php">
                              Clipping Path
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/image-clipping/tracing-image.php">
                              Tracing Image
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/image-clipping/hair-masking.php">
                              Hair Masking
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/image-clipping/conversions.php">
                              Conversions
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/image-manipulation/car-image-clipping.php">
                              Car Image Clipping
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/image-clipping/product-image-clipping.php">
                              Product Image Clipping
                            </a>
                          </li>
                        </ul>
                      </li>

                      {/* Fashion Photo */}
                      <li
                        className="dropdown-item"
                        onMouseEnter={() => setActiveSubmenu("fashion")}
                        onMouseLeave={() => setActiveSubmenu(null)}
                      >
                        <a href="/fashion/">Fashion Photo</a>
                        <ul
                          className={`submenu dropdown-menu ${
                            activeSubmenu === "fashion" ? "show" : ""
                          }`}
                        >
                          <li>
                            <a className="dropdown-item" href="/fashion/ghost-mannequin-photo-editing.php">
                              Ghost Mannequin Editing
                            </a>
                          </li>
                        </ul>
                      </li>

                      {/* Photoshop Services */}
                      <li
                        className="dropdown-item"
                        onMouseEnter={() => setActiveSubmenu("photoshop")}
                        onMouseLeave={() => setActiveSubmenu(null)}
                      >
                        <a href="/photoshop-services/">Photoshop Services</a>
                        <ul
                          className={`submenu dropdown-menu ${
                            activeSubmenu === "photoshop" ? "show" : ""
                          }`}
                        >
                          <li>
                            <a className="dropdown-item" href="/photoshop-services/stock-photo-editing.php">
                              Stock Photo Editing
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/photoshop-services/vector-graphics.php">
                              Vector Graphics Editing
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/photoshop-services/image-cloning.php">
                              Image Cloning
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/photoshop-services/pop-art.php">
                              Pop Art
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/photoshop-services/special-effects.php">
                              Special Effects
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/photoshop-services/focus-stacking.php">
                              Focus Stacking
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <a className="dropdown-item no-dropdown" href="/lightroom-services/">
                          Lightroom Services
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item no-dropdown" href="/image-manipulation/ecommerce-image-editing.php">
                          E-Commerce
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item no-dropdown" href="/jewelry/">
                          Jewelry
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item no-dropdown" href="/photo-restoration/">
                          Photo Restoration
                        </a>
                      </li>
                    </ul>
                  </li>

                  {/* Portfolio */}
                  <li className="nav-item">
                    <a className="nav-link menu_hover" href="/sample-images.php">
                      Portfolio
                    </a>
                  </li>

                  {/* Resources */}
                  <li
                    className={`nav-item dropdown ${
                      activeDropdown === "resources" ? "show" : ""
                    }`}
                    onMouseEnter={() => setActiveDropdown("resources")}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a
                      className="nav-link cursor-pointer"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown("resources");
                      }}
                    >
                      Resources
                    </a>
                    <ul
                      className={`dropdown-menu ${
                        activeDropdown === "resources" ? "show" : ""
                      }`}
                    >
                      <li>
                        <a className="dropdown-item no-dropdown" href="/blog/">
                          Blog
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item no-dropdown" href="/articles/">
                          Articles
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item no-dropdown" href="/case-study/">
                          Case Studies
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item no-dropdown" href="/testimonials.php">
                          Testimonials
                        </a>
                      </li>
                    </ul>
                  </li>

                  {/* Contact Us */}
                  <li className="nav-item">
                    <a className="nav-link menu_hover" href="/contact-us.php">
                      Contact us
                    </a>
                  </li>

                  {/* Phone CTA Button */}
                  <li className="nav-item ml-lg-3">
                    <a
                      className="navbar-link butn3 butn__new butn1-size"
                      id="menuPhone"
                      href="tel:18556956028"
                    >
                      <i className="fa-solid fa-phone pr-2" aria-hidden="true" style={{ color: "#1c2a5a" }}></i>{" "}
                      1-855-695-6028
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
