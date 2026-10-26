import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        // Supabase storage domains (both projects & wildcard)
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "xznlbaqqxmmglaidridj.supabase.co",
      },
      {
        protocol: "https",
        hostname: "rtcflmsmhsuouytntegg.supabase.co",
      },
      {
        // NitroCDN / smartphoto CDN assets
        protocol: "https",
        hostname: "cdn-kglcp.nitrocdn.com",
      },
      {
        protocol: "https",
        hostname: "www.smartphotoeditors.com",
      },
      {
        // Dropbox temporary link domain (files_get_temporary_link)
        protocol: "https",
        hostname: "dl.dropboxusercontent.com",
      },
      {
        // Dropbox shared link domain (shared_links / direct links)
        protocol: "https",
        hostname: "www.dropbox.com",
      },
      {
        // Dropbox content delivery domain
        protocol: "https",
        hostname: "**.dropbox.com",
      },
      {
        // Unsplash photography assets
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*.php",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
