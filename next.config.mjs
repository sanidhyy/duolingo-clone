/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
          { key: "Content-Range", value: "bytes 0-9/*" },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: [
      "https://organic-train-5gvr4jr646v6fp444-3000.app.github.dev",
      "https://organic-train-5gvr4jr646v6fp444.app.github.dev",
      "https://*.app.github.dev",
      ],
    },
  },
};

export default nextConfig;
