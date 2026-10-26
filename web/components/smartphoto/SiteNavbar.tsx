'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';
import { ServiceCategory } from '@/types/content';
import { getServices } from '@/lib/api/content';
import { FALLBACK_SERVICES } from '@/lib/api/fallbackServices';

export const SiteNavbar: React.FC = () => {
  const { getSettingValue } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [services, setServices] = useState<ServiceCategory[]>(FALLBACK_SERVICES);

  const logoUrl = getSettingValue(
    'site_logo',
    '/images/lirisha-camera-logo.png',
  );
  const siteName = getSettingValue('site_name', 'LIRISHA');
  const contactPhone = getSettingValue('contact_phone', '1-855-695-6028');

  useEffect(() => {
    let isMounted = true;
    getServices()
      .then((data) => {
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
    setActiveSubmenu(null);
  };

  return (
    <header id="navbar">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-expand-md">
              <Link
                className="navbar-brand flex items-center gap-2.5"
                href="/"
                onClick={closeMobileMenu}>
                <img
                  src={logoUrl || '/images/lirisha-camera-logo.png'}
                  alt={`${siteName} logo`}
                  className="header-logo-img"
                  title={`${siteName} logo`}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== '/images/lirisha-camera-logo.png' && !target.src.endsWith('/images/lirisha-camera-logo.png')) {
                      target.src = '/images/lirisha-camera-logo.png';
                    }
                  }}
                  style={{
                    height: '46px',
                    width: 'auto',
                    maxWidth: '160px',
                    objectFit: 'contain',
                    display: 'inline-block',
                  }}
                />
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className={`navbar-collapse ${isOpen ? 'show' : ''}`}
                id="main_nav">
                <ul className="navbar-nav ml-auto navbar-dark align-items-md-center">
                  {/* Services Dynamic Dropdown */}
                  <li
                    className={`nav-item dropdown ${
                      activeDropdown === 'services' ? 'show' : ''
                    }`}
                    onMouseEnter={() => setActiveDropdown('services')}
                    onMouseLeave={() => {
                      setActiveDropdown(null);
                      setActiveSubmenu(null);
                    }}>
                    <Link
                      className="nav-link cursor-pointer inline-flex items-center gap-1"
                      href="/services"
                      onClick={(e) => {
                        if (typeof window !== 'undefined' && window.innerWidth < 992) {
                          e.preventDefault();
                          toggleDropdown('services');
                        } else {
                          closeMobileMenu();
                        }
                      }}>
                      <span>Services</span>
                      <i className="fa-solid fa-caret-down text-[11px] opacity-75"></i>
                    </Link>
                    <ul
                      className={`dropdown-menu ${
                        activeDropdown === 'services' ? 'show' : ''
                      }`}>
                      {services.map((cat) => {
                        const hasSubs = cat.subServices && cat.subServices.length > 0;
                        const catKey = cat.slug || cat.id;
                        const catUrl = `/${catKey}`;
                        return (
                          <li
                            key={catKey}
                            className={`service-cat-item ${hasSubs ? 'relative has-children' : ''}`}
                            onMouseEnter={() => hasSubs && setActiveSubmenu(catKey)}
                            onMouseLeave={() => hasSubs && setActiveSubmenu(null)}>
                            <div className="flex items-center justify-between w-full">
                              <Link
                                className={`dropdown-item flex-1 ${hasSubs ? 'has-submenu' : ''}`}
                                href={catUrl}
                                onClick={closeMobileMenu}>
                                {cat.name}
                              </Link>
                              {hasSubs && (
                                <button
                                  type="button"
                                  className="px-3 py-1.5 text-gray-500 hover:text-blue-600 md:hidden"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setActiveSubmenu(activeSubmenu === catKey ? null : catKey);
                                  }}
                                  aria-label={`Toggle ${cat.name} submenu`}>
                                  <i
                                    className={`fa-solid ${
                                      activeSubmenu === catKey ? 'fa-chevron-down' : 'fa-chevron-right'
                                    } text-xs`}></i>
                                </button>
                              )}
                            </div>
                            {hasSubs && (
                              <ul
                                className={`submenu dropdown-menu ${
                                  activeSubmenu === catKey ? 'show' : ''
                                }`}>
                                {cat.subServices.map((sub) => {
                                  const subUrl = sub.link
                                    ? sub.link.replace(/\.php$/, '')
                                    : `${catUrl}/${sub.id}`;
                                  return (
                                    <li key={sub.id || sub.name}>
                                      <Link
                                        className="dropdown-item"
                                        href={subUrl}
                                        onClick={closeMobileMenu}>
                                        {sub.name}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </li>

                  {/* Portfolio */}
                  <li className="nav-item">
                    <Link
                      className="nav-link menu_hover"
                      href="/sample-images"
                      onClick={closeMobileMenu}>
                      Portfolio
                    </Link>
                  </li>

                  {/* Resources */}
                  <li
                    className={`nav-item dropdown ${
                      activeDropdown === 'resources' ? 'show' : ''
                    }`}
                    onMouseEnter={() => setActiveDropdown('resources')}
                    onMouseLeave={() => setActiveDropdown(null)}>
                    <Link
                      className="nav-link cursor-pointer inline-flex items-center gap-1"
                      href="/resources"
                      onClick={(e) => {
                        if (typeof window !== 'undefined' && window.innerWidth < 992) {
                          e.preventDefault();
                          toggleDropdown('resources');
                        } else {
                          closeMobileMenu();
                        }
                      }}>
                      <span>Resources</span>
                      <i className="fa-solid fa-caret-down text-[11px] opacity-75"></i>
                    </Link>
                    <ul
                      className={`dropdown-menu ${
                        activeDropdown === 'resources' ? 'show' : ''
                      }`}>
                      <li>
                        <Link className="dropdown-item" href="/blog" onClick={closeMobileMenu}>
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="/articles" onClick={closeMobileMenu}>
                          Articles
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="/case-study" onClick={closeMobileMenu}>
                          Case Studies
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="/testimonials" onClick={closeMobileMenu}>
                          Testimonials
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* Contact Us */}
                  <li className="nav-item">
                    <Link className="nav-link menu_hover" href="/contact-us" onClick={closeMobileMenu}>
                      Contact us
                    </Link>
                  </li>

                  {/* Phone CTA Button */}
                  <li className="nav-item ml-lg-3">
                    <a
                      className="navbar-link butn3 butn__new butn1-size"
                      id="menuPhone"
                      href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}>
                      <i
                        className="fa-solid fa-phone pr-2"
                        aria-hidden="true"
                        style={{ color: '#07152F' }}></i>{' '}
                      {contactPhone}
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
