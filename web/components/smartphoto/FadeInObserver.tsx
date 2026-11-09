"use client";

import React, { useEffect } from "react";

/**
 * Bidirectional Scroll & Image Reveal Controller
 *
 * Capabilities:
 * 1. Forward Scroll Animations: Triggers smooth staggered slide-up and scale reveals when elements enter viewport.
 * 2. Reverse Scroll Animations: When scrolling back up, elements entering the viewport animate smoothly with directional easing.
 * 3. Image Load & Reveal Animations: Images start with a luxurious scale-down (1.08 -> 1.0) and unblur (8px -> 0px)
 *    accompanied by a luminous sheen sweep across the image container.
 * 4. Automatic Discovery: Automatically attaches reveal classes to sections, cards, and images without breaking layout.
 */
export const FadeInObserver: React.FC = () => {
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    // Track scroll direction on <html>: data-scroll-dir="down" | "up"
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";

      if (Math.abs(currentScrollY - lastScrollY) > 4) {
        document.documentElement.setAttribute("data-scroll-dir", direction);
        lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollDirection();

    // Setup Bidirectional IntersectionObserver for general elements
    const elementObserver = new IntersectionObserver(
      (entries) => {
        const scrollDir = document.documentElement.getAttribute("data-scroll-dir") || "down";

        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            // Forward or reverse scroll enter
            el.classList.add("is-revealed");
            el.classList.add("visible"); // legacy support for .fadein

            if (scrollDir === "up") {
              el.classList.add("is-reverse-in");
            } else {
              el.classList.remove("is-reverse-in");
            }
          } else {
            // Element has left the viewport:
            // Check bounding rect to know if it scrolled off the bottom or top
            const rect = entry.boundingClientRect;
            const isBelowViewport = rect.top >= window.innerHeight;

            // If it scrolled off the bottom, remove revealed state so that scrolling down again replays the animation!
            if (isBelowViewport) {
              el.classList.remove("is-revealed");
              el.classList.remove("visible");
              el.classList.remove("is-reverse-in");
            }
          }
        });
      },
      {
        threshold: [0, 0.12, 0.3],
        rootMargin: "0px 0px -40px 0px",
      }
    );

    // Setup Image Reveal Observer with automatic loading listener
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target as HTMLImageElement;
          const container = img.closest(".img-reveal-container") || img.parentElement;

          if (entry.isIntersecting) {
            img.classList.add("img-in-view");

            const markLoaded = () => {
              img.classList.add("img-loaded");
              if (container && container.classList.contains("img-reveal-container")) {
                container.classList.add("is-revealed");
              }
            };

            if (img.complete && img.naturalWidth > 0) {
              markLoaded();
            } else {
              img.addEventListener("load", markLoaded, { once: true });
            }
          } else {
            const rect = entry.boundingClientRect;
            if (rect.top >= window.innerHeight) {
              img.classList.remove("img-in-view");
              img.classList.remove("img-loaded");
              if (container && container.classList.contains("img-reveal-container")) {
                container.classList.remove("is-revealed");
              }
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "50px 0px 0px 0px",
      }
    );

    // Collect elements
    const attachObservers = () => {
      // 1. Reveal targets: .reveal, .fadein, [data-reveal], .reveal-card, .reveal-group > *
      const elements = document.querySelectorAll<HTMLElement>(
        ".reveal, .fadein, [data-reveal], .reveal-card, .reveal-header, .reveal-group > *"
      );
      elements.forEach((el) => elementObserver.observe(el));

      // 2. Image reveal targets: explicit .img-reveal, [data-reveal-img], or inside .img-reveal-container
      const images = document.querySelectorAll<HTMLImageElement>(
        ".img-reveal, [data-reveal-img], .img-reveal-container img:not(.no-reveal)"
      );
      images.forEach((img) => {
        img.classList.add("img-reveal");
        imageObserver.observe(img);

        // If parent doesn't have reveal-container, tag parent
        if (img.parentElement && !img.parentElement.classList.contains("img-reveal-container")) {
          img.parentElement.classList.add("img-reveal-container");
        }
      });
    };

    attachObservers();

    // Re-attach after dynamic content or hydration mutations
    const mutationObserver = new MutationObserver(() => {
      attachObservers();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      elementObserver.disconnect();
      imageObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
};

export default FadeInObserver;
