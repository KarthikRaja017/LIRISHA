"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const ServicesScroll: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return;

    const items = wrapper.querySelectorAll<HTMLElement>(".item");
    if (!items.length) return;

    // Set initial positions: first card is visible at yPercent 0, subsequent cards start at yPercent 100
    items.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, { yPercent: 100 });
      }
    });

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${items.length * 70}%`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      items.forEach((item, index) => {
        timeline.to(item, {
          borderRadius: "15px",
        });

        if (items[index + 1]) {
          timeline.to(
            items[index + 1],
            {
              yPercent: 0,
            },
            "<"
          );
        }
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="services-scroll py-8">
      <div ref={sectionRef} className="services-scroll-pin-wrapper">
        <div className="container">
        <div className="scroll-section vertical-section image-editing">
          <div className="row">
            <div className="col-md-10 col-lg-6 col-xl-6 offset-md-1 offset-xl-3 offset-lg-3 text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Our Professional
                <br />
                Image Editing Services
              </h2>
              <div className="space30"></div>
            </div>
          </div>

          <div ref={wrapperRef} className="wrapper">
            <div role="list" className="list">
              {/* Item 1: Furniture Photo Editing & 2D/3D Floor Plan */}
              <div role="listitem" className="item">
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="image-editing-box shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
                      <a href="/virtual-staging/furniture-photo-editing.php" className="block">
                        <img
                          src="/images/homepage/furniture-photo-editing.webp"
                          className="img-fluid w-full rounded-xl"
                          alt="Furniture Photo Editing Services"
                        />
                        <h3 className="flex items-center justify-between">
                          <span>Furniture Photo Editing</span>
                          <i className="fa fa-long-arrow-right"></i>
                        </h3>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="image-editing-box shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
                      <a href="/real-estate/floor-plan-conversions.php" className="block">
                        <img
                          src="/images/homepage/2d-3d-floor-plan.webp"
                          className="img-fluid w-full rounded-xl"
                          alt="2D & 3D Floor Plan Services"
                        />
                        <h3 className="flex items-center justify-between">
                          <span>2D & 3D Floor Plan</span>
                          <i className="fa fa-long-arrow-right"></i>
                        </h3>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 2: Ecommerce Image Editing & Image Clipping */}
              <div role="listitem" className="item">
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="image-editing-box shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
                      <a href="/image-manipulation/ecommerce-image-editing.php" className="block">
                        <img
                          src="/images/homepage/ecommerce-image-editing.webp"
                          className="img-fluid w-full rounded-xl"
                          alt="Ecommerce Image Editing Services"
                        />
                        <h3 className="flex items-center justify-between">
                          <span>Ecommerce Image Editing</span>
                          <i className="fa fa-long-arrow-right"></i>
                        </h3>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="image-editing-box shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
                      <a href="/image-clipping/" className="block">
                        <img
                          src="/images/homepage/image-cliping.webp"
                          className="img-fluid w-full rounded-xl"
                          alt="Image Cliping Services"
                        />
                        <h3 className="flex items-center justify-between">
                          <span>Image Cliping</span>
                          <i className="fa fa-long-arrow-right"></i>
                        </h3>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 3: Jewelry Image Retouching & Real Estate */}
              <div role="listitem" className="item">
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="image-editing-box shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
                      <a href="/jewelry/" className="block">
                        <img
                          src="/images/homepage/jewellery-retouching.webp"
                          className="img-fluid w-full rounded-xl"
                          alt="Jewelry Image Retouching Services"
                        />
                        <h3 className="flex items-center justify-between">
                          <span>Jewelry Image Retouching</span>
                          <i className="fa fa-long-arrow-right"></i>
                        </h3>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6">
                    <div className="image-editing-box shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
                      <a href="/real-estate/" className="block">
                        <img
                          src="/images/homepage/real-estate.webp"
                          className="img-fluid w-full rounded-xl"
                          alt="Real Estate Services"
                        />
                        <h3 className="flex items-center justify-between">
                          <span>Real Estate</span>
                          <i className="fa fa-long-arrow-right"></i>
                        </h3>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};
