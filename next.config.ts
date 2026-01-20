import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This wildcard allows all hostnames
        port: "",
        pathname: "**", // This wildcard allows all pathnames
      },
    ],
  },
};

export default nextConfig;
