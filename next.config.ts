import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is the default. 90 is for product mocks, whose small UI text
    // (extension numbers, names, buttons) goes soft at 75.
    qualities: [75, 90],
    remotePatterns: [
      // YouTube thumbnail for the explainer video facade.
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
