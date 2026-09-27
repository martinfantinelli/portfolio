import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/blog", destination: "/en/blog", permanent: true },
      // no dots: /blog/*.jpg etc. are post images in public/blog
      { source: "/blog/:slug([^.]+)", destination: "/en/blog/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
