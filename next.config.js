/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `/:path*`,
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    port: 3000,
  },
  // experimental: {
  //   externalDir:
  //     true |
  //     {
  //       enabled: true,
  //       silent: true,
  //     },
  // },
  // webpack(config) {
  //   config.resolve.modules.push(__dirname); // 추가
  //   return config;
  // },
};

module.exports = nextConfig;
