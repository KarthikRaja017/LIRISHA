import React from "react";
import { SubServiceDetailContent } from "@/components/smartphoto/SubServiceDetailContent";

export const metadata = {
  title: "Image File Conversion Services | SmartPHOTOeditors",
  description: "Bulk image format conversions, color profile standardization (sRGB/CMYK), and compression optimization.",
};

export default function ImageConversionsPage() {
  return (
    <SubServiceDetailContent
      categorySlug="image-clipping"
      subServiceSlug="conversions"
      title="Image Conversions & Format Standardization"
      tagline="High-Speed Batch Format Conversion, Color Space Profile Mapping & Lossless Compression"
      description="Streamline digital asset management across omnichannel pipelines. We convert massive archives of RAW, PSD, TIFF, and HEIC files into optimized WebP, AVIF, JPEG, and PNG formats calibrated for web speed and print fidelity."
      features={[
        "Batch RAW/TIFF to WebP & JPEG conversion",
        "sRGB / AdobeRGB / CMYK color profile mapping",
        "Metadata (EXIF/IPTC) preservation or stripping",
        "Lossless & lossy web compression algorithms",
        "Standardized naming taxonomy & folder structuring",
        "Automated API & FTP ingestion integration"
      ]}
    />
  );
}
