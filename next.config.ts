import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
};

module.exports = {
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    localeDetection: true,
  },
};

export default nextConfig;
