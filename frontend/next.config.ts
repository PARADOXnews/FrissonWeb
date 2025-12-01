import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // output: "export",
  outputFileTracingRoot: __dirname,

  sassOptions: {
    includePaths: [path.join(__dirname, "frontend/styles")],
  },

  experimental: {},
};

