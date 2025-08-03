import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1";
const ignoreErrors = process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true" || isVercel;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: ignoreErrors,
  },
  eslint: {
    ignoreDuringBuilds: ignoreErrors,
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

const isIpfs = process.env.NEXT_PUBLIC_IPFS_BUILD === "true";

if (isIpfs) {
  nextConfig.output = "export";
  nextConfig.trailingSlash = true;
  nextConfig.images = {
    unoptimized: true,
  };
}

module.exports = nextConfig;
