"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DropboxFile } from "../types/dropbox.types";

interface DropboxImageCardProps {
  file: DropboxFile;
  /** Optional click handler — e.g. to open a lightbox */
  onClick?: (file: DropboxFile) => void;
  /** Show the filename on hover */
  showFileName?: boolean;
}

/**
 * DropboxImageCard
 * Renders a single image tile from Dropbox.
 *
 * - Uses Next.js <Image> with `unoptimized` (required for external Dropbox temp URLs).
 * - Graceful fallback when tempUrl is null or broken.
 * - Smooth hover scale + filename overlay.
 * - Animated fade-in once the image loads.
 */
export function DropboxImageCard({
  file,
  onClick,
  showFileName = true,
}: DropboxImageCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Fallback tile when there's no URL or the image failed to load
  if (!file.tempUrl || imgError) {
    return (
      <div
        className="aspect-square rounded-lg bg-gray-100 border border-gray-200
                   flex flex-col items-center justify-center p-3 text-center"
        title={file.name}
      >
        {/* Broken image icon */}
        <svg
          className="w-8 h-8 text-gray-300 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-gray-400 text-xs truncate w-full">{file.name}</span>
      </div>
    );
  }

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => e.key === "Enter" && onClick(file)
          : undefined
      }
      onClick={() => onClick?.(file)}
      className={`
        relative aspect-square overflow-hidden rounded-lg bg-gray-100
        transition-shadow duration-200 group
        ${onClick ? "cursor-pointer hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500" : ""}
      `}
    >
      {/* Pulse placeholder while image loads */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}

      <Image
        src={file.tempUrl}
        alt={file.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={`
          object-cover transition-all duration-300
          group-hover:scale-105
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
        onLoad={() => setLoaded(true)}
        onError={() => setImgError(true)}
        unoptimized  // Required: Dropbox temp URLs are external and time-limited
      />

      {/* Filename overlay on hover */}
      {showFileName && (
        <div
          className="
            absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-200
            flex items-end p-2
          "
        >
          <p className="text-white text-xs font-medium truncate w-full leading-tight">
            {file.name}
          </p>
        </div>
      )}
    </div>
  );
}
