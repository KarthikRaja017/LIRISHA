"use client";

import React from "react";
import Image from "next/image";

export interface BrandLoaderProps {
  message?: string;
  subMessage?: string;
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const BrandLoader: React.FC<BrandLoaderProps> = ({
  message = "Loading live content...",
  subMessage,
  fullScreen = false,
  size = "md",
  className = "",
}) => {
  const sizeMap = {
    sm: {
      box: "w-20 h-20",
      svg: 80,
      radius: 36,
      logo: "w-10 h-10",
      title: "text-xs tracking-[0.2em]",
      msg: "text-[11px]",
      bar: "w-32 h-0.5",
    },
    md: {
      box: "w-28 h-28",
      svg: 112,
      radius: 50,
      logo: "w-14 h-14",
      title: "text-sm tracking-[0.28em]",
      msg: "text-xs",
      bar: "w-44 h-1",
    },
    lg: {
      box: "w-36 h-36",
      svg: 144,
      radius: 64,
      logo: "w-18 h-18 sm:w-20 sm:h-20",
      title: "text-base tracking-[0.3em]",
      msg: "text-sm",
      bar: "w-56 h-1.5",
    },
  }[size];

  const content = (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center text-center select-none ${className}`}
    >
      {/* Visual Camera Core Container */}
      <div className={`relative ${sizeMap.box} flex items-center justify-center`}>
        {/* Soft Ambient Radial Glow Backdrop */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00C8F8]/25 via-[#1265E8]/20 to-[#FF4FA3]/25 blur-xl pointer-events-none" />

        {/* Outer Expanding Radar Wave */}
        <div className="absolute inset-2 rounded-full border border-[#00C8F8]/40 animate-camera-radar pointer-events-none" />

        {/* Orbit SVG Rings */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${sizeMap.svg} ${sizeMap.svg}`}
        >
          <defs>
            <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00C8F8" />
              <stop offset="45%" stopColor="#1265E8" />
              <stop offset="80%" stopColor="#713CFF" />
              <stop offset="100%" stopColor="#FF4FA3" />
            </linearGradient>
            <linearGradient id="brand-accent" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00C8F8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#713CFF" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Outer Dashed Rotating Ring */}
          <circle
            cx={sizeMap.svg / 2}
            cy={sizeMap.svg / 2}
            r={sizeMap.radius}
            fill="none"
            stroke="url(#brand-grad)"
            strokeWidth="2"
            strokeDasharray="14 10"
            strokeLinecap="round"
            className="animate-orbit-spin origin-center opacity-85"
          />

          {/* Inner Counter-Rotating Thin Accent Ring */}
          <circle
            cx={sizeMap.svg / 2}
            cy={sizeMap.svg / 2}
            r={sizeMap.radius - 8}
            fill="none"
            stroke="url(#brand-accent)"
            strokeWidth="1.2"
            strokeDasharray="6 8"
            className="animate-orbit-spin-reverse origin-center opacity-60"
          />
        </svg>

        {/* Centerpiece: Camera Favicon with Breathing Glow */}
        <div className={`relative z-10 ${sizeMap.logo} flex items-center justify-center animate-camera-breathe`}>
          <img
            src="/images/lirisha-camera-logo.png"
            alt="LIRISHA Camera Icon"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>
      </div>

      {/* Brand Title */}
      <div className="mt-5 space-y-1.5 flex flex-col items-center">
        <h3
          className={`font-black font-heading ${sizeMap.title} bg-gradient-to-r from-[#00C8F8] via-[#1265E8] to-[#FF4FA3] bg-clip-text text-transparent`}
        >
          LIRISHA
        </h3>

        {/* Dynamic Status Message */}
        {message && (
          <p className={`${sizeMap.msg} font-medium text-slate-300 tracking-wide`}>
            {message}
          </p>
        )}

        {/* Optional Sub-message */}
        {subMessage && (
          <p className="text-[11px] text-slate-400 font-normal">
            {subMessage}
          </p>
        )}

        {/* Electric Indeterminate Progress Bar */}
        <div
          className={`mt-2 ${sizeMap.bar} rounded-full bg-slate-800/80 overflow-hidden relative border border-slate-700/40`}
        >
          <div className="absolute top-0 bottom-0 w-1/2 rounded-full bg-gradient-to-r from-[#00C8F8] via-[#1265E8] to-[#FF4FA3] shadow-[0_0_10px_#00C8F8] animate-progress-shimmer" />
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#07152F] p-4 overflow-hidden transition-opacity duration-300"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 45%, rgba(0, 200, 248, 0.08) 0%, rgba(113, 60, 255, 0.06) 40%, #07152F 75%)",
        }}
      >
        {content}
      </div>
    );
  }

  return content;
};
