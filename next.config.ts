import type { NextConfig } from "next";

const repo = "openclaw-landing";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",

  // GitHub Pages serves this project at /<repo>/
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,

  // GitHub Pages doesn't do "clean URLs" unless we generate /path/index.html
  trailingSlash: true,

  // Allow next/image to work with static export (or avoid next/image)
  images: { unoptimized: true },
};

export default nextConfig;
