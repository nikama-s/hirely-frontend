import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `${
          process.env.BACKEND_URL || "https://hirely-backend-4z7u.onrender.com"
        }/:path*`
      }
    ];
  }
};

export default nextConfig;
