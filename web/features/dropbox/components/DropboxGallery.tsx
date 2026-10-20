"use client";

import React from "react";
import { useDropboxFolder } from "../hooks/useDropboxFolder";
import { DropboxImageCard } from "./DropboxImageCard";
import { DropboxSkeleton } from "./DropboxSkeleton";
import { DropboxFile } from "../types/dropbox.types";

interface DropboxGalleryProps {
  /** Absolute Dropbox folder path (e.g. "/lirisha-media/gallery/portrait") */
  folderPath: string;
  /** Section heading rendered above the grid */
  title?: string;
  /** Tailwind grid-cols classes — defaults to a responsive 4-column layout */
  gridCols?: string;
  /** Maximum images to display (shows all if omitted) */
  limit?: number;
  /** Whether to show a "↻ Refresh" button that bypasses the cache */
  showRefreshButton?: boolean;
  /** Whether the hook should wait for an explicit `refetch()` call before fetching */
  lazy?: boolean;
  /** Optional click handler forwarded to each DropboxImageCard */
  onImageClick?: (file: DropboxFile) => void;
}

/**
 * DropboxGallery
 * Full self-contained gallery component that:
 * 1. Fetches images from the given Dropbox folder via the Flask API.
 * 2. Renders a loading skeleton while fetching.
 * 3. Displays a responsive image grid on success.
 * 4. Shows a friendly error state with a retry button on failure.
 *
 * Usage:
 * ```tsx
 * <DropboxGallery
 *   folderPath="/lirisha-media/gallery/portrait"
 *   title="Portrait Gallery"
 *   limit={12}
 * />
 * ```
 */
export function DropboxGallery({
  folderPath,
  title,
  gridCols = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  limit,
  showRefreshButton = false,
  lazy = false,
  onImageClick,
}: DropboxGalleryProps) {
  const { files, state, error, isCached, refetch } = useDropboxFolder({
    path: folderPath,
    lazy,
  });

  const displayFiles = limit ? files.slice(0, limit) : files;
  const isLoading = state === "loading";
  const isError = state === "error";
  const isEmpty = state === "success" && displayFiles.length === 0;
  const hasImages = state === "success" && displayFiles.length > 0;

  return (
    <section className="dropbox-gallery w-full">

      {/* ── Header ────────────────────────────────────────────────────── */}
      {(title || showRefreshButton || isCached) && (
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          {title && (
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          )}
          <div className="flex items-center gap-3 ml-auto">
            {isCached && (
              <span className="text-xs text-gray-400 italic select-none">
                Served from cache
              </span>
            )}
            {showRefreshButton && (
              <button
                onClick={() => refetch(true)}
                disabled={isLoading}
                aria-label="Refresh gallery"
                className="
                  inline-flex items-center gap-1 px-3 py-1.5 text-sm
                  bg-blue-600 text-white rounded-md
                  hover:bg-blue-700 active:bg-blue-800
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors duration-150
                "
              >
                <span aria-hidden="true" className={isLoading ? "animate-spin inline-block" : ""}>
                  ↻
                </span>
                {isLoading ? "Refreshing…" : "Refresh"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Loading ───────────────────────────────────────────────────── */}
      {isLoading && (
        <DropboxSkeleton count={limit ?? 8} gridCols={gridCols} />
      )}

      {/* ── Error ─────────────────────────────────────────────────────── */}
      {isError && (
        <div className="flex flex-col items-center py-16 text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Could not load images</p>
            <p className="text-sm text-gray-500 mt-1">{error}</p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Try again
          </button>
        </div>
      )}

      {/* ── Empty ─────────────────────────────────────────────────────── */}
      {isEmpty && (
        <div className="py-16 text-center">
          <p className="text-gray-500">No images found in this folder.</p>
          <p className="text-sm text-gray-400 mt-1 font-mono">{folderPath}</p>
        </div>
      )}

      {/* ── Image Grid ────────────────────────────────────────────────── */}
      {hasImages && (
        <>
          <div className={`grid ${gridCols} gap-4`}>
            {displayFiles.map((file) => (
              <DropboxImageCard
                key={file.id}
                file={file}
                onClick={onImageClick}
              />
            ))}
          </div>

          {/* "Showing X of Y" counter when limit is applied */}
          {limit && files.length > limit && (
            <p className="mt-6 text-center text-sm text-gray-500">
              Showing <strong>{limit}</strong> of <strong>{files.length}</strong> images
            </p>
          )}
        </>
      )}
    </section>
  );
}
