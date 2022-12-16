/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_ENV_API_URI}/:path*`,
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
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
