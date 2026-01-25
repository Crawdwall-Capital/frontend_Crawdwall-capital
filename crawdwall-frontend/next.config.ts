import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
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
