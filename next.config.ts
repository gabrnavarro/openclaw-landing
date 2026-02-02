import type { NextConfig } from "next";

const repo = "openclaw-landing";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",

  // GitHub Pages serves this project at /<repo>/
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,

  // Allow next/image to work with static export (or avoid next/image)
  images: { unoptimized: true }
};

export default nextConfig;
