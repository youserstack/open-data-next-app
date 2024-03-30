/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "https://open-data-next-app.vercel.app/",
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    SEOUL_OPEN_URL: process.env.SEOUL_OPEN_URL,
    SEOUL_OPEN_API_KEY: process.env.SEOUL_OPEN_API_KEY,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `${process.env.SEOUL_OPEN_URL}/${process.env.SEOUL_OPEN_API_KEY}/json/VwsmAdstrdNcmCnsmpW/:start/:end`,
      },
    ];
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value: "upgrade-insecure-requests",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
