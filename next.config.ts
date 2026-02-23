import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://payroll.politekniklp3i-tasikmalaya.ac.id/:path*",
      },
    ];
  },
};

export default nextConfig;