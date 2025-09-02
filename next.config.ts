// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // recommended for catching issues
  swcMinify: true,       // improves performance
  // You can add more configs like images, redirects, etc.
};

export default nextConfig;
