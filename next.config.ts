import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local images from the public folder (no remote patterns needed)
    remotePatterns: [],
  },
};

export default nextConfig;
