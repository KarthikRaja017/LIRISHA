"use client";

import React from "react";

export interface BrandLoaderProps {
  message?: string;
  subMessage?: string;
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const BrandLoader: React.FC<BrandLoaderProps> = ({
  message = "Loading...",
  subMessage,
  fullScreen = false,
  size = "md",
  className = "",
}) => {
  const sizeMap = {
    sm: {
      spinner: "w-6 h-6",
      stroke: 2.5,
      msg: "text-[11px]",
      sub: "text-[10px]",
    },
    md: {
      spinner: "w-8 h-8",
      stroke: 2.75,
      msg: "text-xs",
      sub: "text-[11px]",
    },
    lg: {
      spinner: "w-10 h-10",
      stroke: 3,
      msg: "text-xs",
      sub: "text-[11px]",
    },
  }[size];

  const content = (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center text-center select-none ${className}`}
    >
      {/* Professional Minimalist Spinner */}
      <div className={`relative ${sizeMap.spinner} flex items-center justify-center`}>
        <svg
          className="w-full h-full animate-spin text-slate-900"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle background track */}
          <circle
            cx="12"
            cy="12"
            r="9.5"
            stroke="currentColor"
            strokeWidth={sizeMap.stroke}
            className="opacity-15"
          />
          {/* Active rotating arc */}
          <path
            d="M12 2.5C6.75329 2.5 2.5 6.75329 2.5 12"
            stroke="currentColor"
            strokeWidth={sizeMap.stroke}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Clean, Professional Typography */}
      {(message || subMessage) && (
        <div className="mt-3.5 space-y-0.5 flex flex-col items-center">
          {message && (
            <p className={`${sizeMap.msg} font-medium text-slate-700 tracking-wider uppercase`}>
              {message}
            </p>
          )}
          {subMessage && (
            <p className={`${sizeMap.sub} text-slate-400 font-normal`}>
              {subMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-sm transition-opacity duration-200">
        {content}
      </div>
    );
  }

  return content;
};

export default BrandLoader;
