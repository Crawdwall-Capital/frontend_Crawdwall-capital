import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  typescript: {
    // Always skip TypeScript checking during build
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
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
  // Optimize for Vercel deployment
  output: 'standalone',
  experimental: {
    // Reduce memory usage during build
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
