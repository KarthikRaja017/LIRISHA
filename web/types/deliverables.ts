export interface DeliverableFile {
  id: string;
  name: string;
  imageUrl: string;
  downloadUrl?: string;
  fileSize?: string;
  resolution?: string;
  beforeImageUrl?: string;
}

export interface ClientSharedDeliverable {
  id: string;
  clientEmail: string;
  title: string;
  category: string;
  deliveredDate: string;
  status: "Ready for Download" | "Approved" | "In Review";
  notes?: string;
  files: DeliverableFile[]; // Set of files in this project / deliverable order
  // Backward compatibility fields
  imageUrl?: string;
  downloadUrl?: string;
  fileSize?: string;
  resolution?: string;
}

export function normalizeDeliverable(d: ClientSharedDeliverable): ClientSharedDeliverable {
  const files: DeliverableFile[] =
    Array.isArray(d.files) && d.files.length > 0
      ? d.files
      : d.imageUrl
      ? [
          {
            id: `${d.id}-f1`,
            name: `${d.title} - Main`,
            imageUrl: d.imageUrl,
            downloadUrl: d.downloadUrl || d.imageUrl,
            fileSize: d.fileSize || "10.0 MB",
            resolution: d.resolution || "Full High-Res",
          },
        ]
      : [];

  const mainImageUrl = files[0]?.imageUrl || d.imageUrl || "/images/homepage/real-estate.webp";
  const mainDownloadUrl = files[0]?.downloadUrl || d.downloadUrl || mainImageUrl;

  return {
    ...d,
    imageUrl: mainImageUrl,
    downloadUrl: mainDownloadUrl,
    files,
  };
}

export const defaultSharedDeliverables: ClientSharedDeliverable[] = [
  {
    id: "deliv-1",
    clientEmail: "user@example.com",
    title: "Luxury Palm Villa - Twilight & Sky Replacement Suite",
    category: "Real Estate",
    imageUrl: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Lawn-Replacement/001-after-525x.webp",
    downloadUrl: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Lawn-Replacement/001-after-525x.webp",
    fileSize: "32.4 MB (4 Photos)",
    resolution: "6000 x 4000 px (300 DPI)",
    deliveredDate: "Oct 21, 2026",
    status: "Ready for Download",
    notes: "Full exterior suite delivered. Lawn greening complete, driveway oil stains removed, dusk sky blended seamlessly.",
    files: [
      {
        id: "f1-1",
        name: "Villa Front Exterior - Twilight Lawn & Sky",
        imageUrl: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Lawn-Replacement/001-after-525x.webp",
        downloadUrl: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Lawn-Replacement/001-after-525x.webp",
        fileSize: "8.4 MB",
        resolution: "6000 x 4000 px",
        beforeImageUrl: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Lawn-Replacement/001-before-525x.webp",
      },
      {
        id: "f1-2",
        name: "Infinity Pool & Sunset Terrace",
        imageUrl: "/images/homepage/real-estate.webp",
        downloadUrl: "/images/homepage/real-estate.webp",
        fileSize: "7.8 MB",
        resolution: "6000 x 4000 px",
      },
      {
        id: "f1-3",
        name: "Grand Living Room - Window Pull & Declutter",
        imageUrl: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Day-to-Dusk/001-after-525x.webp",
        downloadUrl: "https://cdn-kglcp.nitrocdn.com/SHzaNANRXFrCblvqwWjtxqWqqvNwNsjl/assets/images/optimized/rev-2b1418b/www.smartphotoeditors.com/images/sample-images/Realestate/Day-to-Dusk/001-after-525x.webp",
        fileSize: "8.1 MB",
        resolution: "6000 x 4000 px",
      },
      {
        id: "f1-4",
        name: "Master Suite Balcony - Ocean Horizon Blend",
        imageUrl: "/images/services/real-estate-1.webp",
        downloadUrl: "/images/services/real-estate-1.webp",
        fileSize: "8.1 MB",
        resolution: "6000 x 4000 px",
      },
    ],
  },
  {
    id: "deliv-2",
    clientEmail: "user@example.com",
    title: "Luxury Timepiece - High-End Packshot & Clipping Suite",
    category: "E-Commerce",
    imageUrl: "/images/homepage/furniture-photo-editing.webp",
    downloadUrl: "/images/homepage/furniture-photo-editing.webp",
    fileSize: "28.5 MB (3 Photos)",
    resolution: "4500 x 4500 px (300 DPI)",
    deliveredDate: "Oct 20, 2026",
    status: "Approved",
    notes: "Pure white vector clipping path, hand-drawn shadows, bezel scratch removal, and micro-polishing.",
    files: [
      {
        id: "f2-1",
        name: "Chronograph Dial - Macro Bezel Retouch",
        imageUrl: "/images/homepage/furniture-photo-editing.webp",
        downloadUrl: "/images/homepage/furniture-photo-editing.webp",
        fileSize: "9.2 MB",
        resolution: "4500 x 4500 px",
      },
      {
        id: "f2-2",
        name: "Stainless Steel Bracelet - Mirror Polish & Shadow",
        imageUrl: "/images/services/image-clipping-1.webp",
        downloadUrl: "/images/services/image-clipping-1.webp",
        fileSize: "9.5 MB",
        resolution: "4500 x 4500 px",
      },
      {
        id: "f2-3",
        name: "Caseback & Crown Detail - Clean Vector Path",
        imageUrl: "/images/services/image-manipulation-1.webp",
        downloadUrl: "/images/services/image-manipulation-1.webp",
        fileSize: "9.8 MB",
        resolution: "4500 x 4500 px",
      },
    ],
  },
  {
    id: "deliv-3",
    clientEmail: "user@example.com",
    title: "Commercial Editorial Fashion Retouch - Milan Autumn Collection",
    category: "Portrait",
    imageUrl: "/images/about/professionals-1.webp",
    downloadUrl: "/images/about/professionals-1.webp",
    fileSize: "36.2 MB (3 Photos)",
    resolution: "7360 x 4912 px (ProPhoto RGB)",
    deliveredDate: "Oct 19, 2026",
    status: "Ready for Download",
    notes: "Frequency separation skin retouching, flyaway hair cleanup, color grading matching brand guide.",
    files: [
      {
        id: "f3-1",
        name: "Editorial Cover - Close-up Beauty Retouch",
        imageUrl: "/images/about/professionals-1.webp",
        downloadUrl: "/images/about/professionals-1.webp",
        fileSize: "12.3 MB",
        resolution: "7360 x 4912 px",
      },
      {
        id: "f3-2",
        name: "Runway Trench Coat - Fabric Smoothing & Crease Removal",
        imageUrl: "/images/services/portrait-1.webp",
        downloadUrl: "/images/services/portrait-1.webp",
        fileSize: "11.8 MB",
        resolution: "7360 x 4912 px",
      },
      {
        id: "f3-3",
        name: "Studio Headshot - Eyes & Lips Contrast Enhancement",
        imageUrl: "/images/homepage/hero-sample.webp",
        downloadUrl: "/images/homepage/hero-sample.webp",
        fileSize: "12.1 MB",
        resolution: "7360 x 4912 px",
      },
    ],
  },
  {
    id: "deliv-4",
    clientEmail: "user@example.com",
    title: "Oceanfront Resort - 360 Panorama & Lens Flare Correction",
    category: "Real Estate",
    imageUrl: "/images/homepage/real-estate.webp",
    downloadUrl: "/images/homepage/real-estate.webp",
    fileSize: "18.7 MB (2 Panoramas)",
    resolution: "8000 x 4000 px",
    deliveredDate: "Oct 18, 2026",
    status: "In Review",
    notes: "Bracketed exposure fusion, water blue reflection saturated, window views preserved.",
    files: [
      {
        id: "f4-1",
        name: "Main Lobby 360 Spherical Panorama",
        imageUrl: "/images/homepage/real-estate.webp",
        downloadUrl: "/images/homepage/real-estate.webp",
        fileSize: "9.5 MB",
        resolution: "8000 x 4000 px",
      },
      {
        id: "f4-2",
        name: "Penthouse Rooftop Sunset Panorama",
        imageUrl: "/images/services/real-estate-1.webp",
        downloadUrl: "/images/services/real-estate-1.webp",
        fileSize: "9.2 MB",
        resolution: "8000 x 4000 px",
      },
    ],
  },
];
