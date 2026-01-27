import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  typescript: {
    // Skip TypeScript checking during build if SKIP_TYPE_CHECK is set
    ignoreBuildErrors: process.env.SKIP_TYPE_CHECK === 'true',
  },
  eslint: {
    // Skip ESLint checking during build if SKIP_TYPE_CHECK is set
    ignoreDuringBuilds: process.env.SKIP_TYPE_CHECK === 'true',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  // Add API proxy for CORS issues
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://crawdwall-backend-ywlk.onrender.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
