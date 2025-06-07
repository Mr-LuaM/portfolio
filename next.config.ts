import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'],  // Add the domain of the external image source
  },
};

export default nextConfig;
