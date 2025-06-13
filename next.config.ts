import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com',"mr-luam.s3.ap-southeast-2.amazonaws.com"],  // Add the domain of the external image source
  },
};

export default nextConfig;
