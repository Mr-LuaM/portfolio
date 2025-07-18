import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'mr-luam.s3.ap-southeast-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
