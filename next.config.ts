import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Keep defaults for ordinary images, 90 for UI mocks, and 95 for the
    // large product artwork so glass edges and fine ridges retain detail.
    qualities: [75, 90, 95],
  },
};

export default nextConfig;
