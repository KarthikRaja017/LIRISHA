"use client";

import React, { useState, useRef } from "react";
import { uploadToSupabaseStorage } from "@/lib/supabase/client";

interface ImageUploadButtonProps {
  currentValue: string;
  onUploadSuccess: (url: string) => void;
  folder?: string;
  label?: string;
  className?: string;
}

export const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  currentValue,
  onUploadSuccess,
  folder = "photos",
  label = "Upload to Supabase",
  className = "",
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const res = await uploadToSupabaseStorage(file, folder);
    setUploading(false);

    if (res.error) {
      setError(res.error);
    } else if (res.url) {
      onUploadSuccess(res.url);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`inline-flex flex-col gap-1 ${className}`}>
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.ico,.svg"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          <i className={`fa-solid ${uploading ? "fa-spinner fa-spin" : "fa-cloud-arrow-up"}`}></i>
          <span>{uploading ? "Uploading..." : label}</span>
        </button>
        {currentValue && (
          <a
            href={currentValue}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-gray-500 hover:text-indigo-600 underline truncate max-w-[200px]"
            title={currentValue}
          >
            Preview
          </a>
        )}
      </div>
      {error && <span className="text-[11px] text-red-500">{error}</span>}
    </div>
  );
};
