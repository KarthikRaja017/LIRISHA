"use client";

import React from "react";
import { DropboxFolderTabs } from "@/features/dropbox/components/DropboxFolderTabs";
import { DropboxGallery } from "@/features/dropbox/components/DropboxGallery";

/**
 * /dropbox-gallery — Dedicated page to view and browse all Dropbox images.
 * This page is the easiest place to see photos fetched live from Dropbox.
 *
 * URL: http://localhost:3000/dropbox-gallery
 */
export default function DropboxGalleryPage() {
  const galleryTabs = [
    { label: "Portrait",       folderPath: "/lirisha-media/gallery/portrait" },
    { label: "Real Estate",    folderPath: "/lirisha-media/gallery/real-estate" },
    { label: "E-commerce",     folderPath: "/lirisha-media/gallery/ecommerce" },
    { label: "Wedding",        folderPath: "/lirisha-media/gallery/wedding" },
    { label: "Automotive",     folderPath: "/lirisha-media/gallery/automotive" },
    { label: "Clipping Path",  folderPath: "/lirisha-media/gallery/clipping-path" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <section className="bg-[#07152F] text-white py-14 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          📦 Dropbox Photo Gallery
        </h1>
        <p className="text-gray-300 text-lg max-w-xl mx-auto">
          Images fetched live from Dropbox — cached for performance.
          Upload images to <code className="bg-white/10 px-2 py-0.5 rounded text-sm">/lirisha-media/</code> in your Dropbox to see them here.
        </p>
      </section>

      {/* ── Gallery Tabs (Portrait, Real Estate, etc.) ──────────────── */}
      <section className="container mx-auto px-4 py-12">
        <DropboxFolderTabs
          tabs={galleryTabs}
          title="Browse by Category"
          gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        />
      </section>

      {/* ── Sample Images Section ────────────────────────────────────── */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto">
          <DropboxGallery
            folderPath="/lirisha-media/sample-images"
            title="Sample Images"
            gridCols="grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
            showRefreshButton={true}
          />
        </div>
      </section>

      {/* ── Resources Section ───────────────────────────────────────── */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <DropboxGallery
            folderPath="/lirisha-media/resources"
            title="Resources"
            gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            showRefreshButton={true}
          />
        </div>
      </section>

    </main>
  );
}
