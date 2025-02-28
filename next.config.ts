import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// next.config.js
module.exports = {
  eslint: {
    // Disable ESLint during the build process
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
