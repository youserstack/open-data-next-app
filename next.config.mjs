/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SEOUL_OPEN_URL: process.env.SEOUL_OPEN_URL,
    SEOUL_OPEN_API_KEY: process.env.SEOUL_OPEN_API_KEY,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/about',
  //       destination: `${process.env.SEOUL_OPEN_URL}`,
  //     },
  //   ]
  // },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
