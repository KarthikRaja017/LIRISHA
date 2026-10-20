import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  images: {
    remotePatterns: [
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
    ],
  },
};

export default nextConfig;
