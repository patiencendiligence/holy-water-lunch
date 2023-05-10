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
  api: {
    responseLimit: "8mb",
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
