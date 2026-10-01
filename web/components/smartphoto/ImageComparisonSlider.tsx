"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

interface ImageComparisonSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  title?: string;
}

export const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  title,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="twentytwenty-container relative overflow-hidden rounded-2xl shadow-md select-none cursor-ew-resize bg-gray-100 aspect-[4/3] w-full"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* After Image (Background, Full) */}
        <img
          src={afterSrc}
          alt={afterAlt}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="lazy"
        />

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeSrc}
            alt={beforeAlt}
            className="absolute top-0 left-0 max-w-none h-full object-cover pointer-events-none"
            style={{
              width: containerRef.current
                ? `${containerRef.current.clientWidth}px`
                : "100%",
            }}
            loading="lazy"
          />
        </div>

        {/* Floating Tag Labels */}
        <span className="absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded backdrop-blur-sm pointer-events-none z-10">
          BEFORE
        </span>
        <span className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded backdrop-blur-sm pointer-events-none z-10">
          AFTER
        </span>

        {/* Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-[#8DCE3C] text-gray-700">
            <svg
              className="w-4 h-4 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M8 9l-4 3 4 3m8-6l4 3-4 3"
              />
            </svg>
          </div>
        </div>
      </div>

      {title && (
        <div className="mt-3 text-center font-semibold text-gray-800 text-base md:text-lg">
          {title}
        </div>
      )}
    </div>
  );
};
