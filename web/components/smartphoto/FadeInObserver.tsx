"use client";

import React, { useEffect } from "react";

export const FadeInObserver: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const pageTop = window.scrollY;
      const pageBottom = pageTop + window.innerHeight;
      const elements = document.querySelectorAll(".fadein");

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + pageTop;
        if (elementTop < pageBottom) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
};
