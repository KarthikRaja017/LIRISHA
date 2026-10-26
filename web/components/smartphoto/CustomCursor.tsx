"use client";

import React, { useEffect, useRef, useState } from "react";

export const CustomCursor: React.FC = () => {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (typeof window === "undefined") return;
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches ||
      window.innerWidth < 1024;

    if (isTouch) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const inner = innerRef.current;
    const outer = outerRef.current;
    if (!inner || !outer) return;

    inner.style.visibility = "visible";
    outer.style.visibility = "visible";

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      inner.style.transform = `translate(${x}px, ${y}px)`;
      outer.style.transform = `translate(${x}px, ${y}px)`;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest(".cursor-pointer") ||
        target?.closest(".clickable")
      ) {
        inner.classList.add("cursor-hover");
        outer.classList.add("cursor-hover");
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest(".cursor-pointer") ||
        target?.closest(".clickable")
      ) {
        inner.classList.remove("cursor-hover");
        outer.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseover", handleMouseEnter);
    document.body.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseover", handleMouseEnter);
      document.body.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      <div ref={outerRef} className="mouse-cursor cursor-outer" />
      <div ref={innerRef} className="mouse-cursor cursor-inner" />
    </>
  );
};
