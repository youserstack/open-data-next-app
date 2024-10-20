/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SEOUL_OPEN_URL: process.env.SEOUL_OPEN_URL,
    SEOUL_OPEN_API_KEY: process.env.SEOUL_OPEN_API_KEY,
    SEOUL_OPEN_SERVICE: process.env.SEOUL_OPEN_SERVICE,
  },
  images: { domains: ["res.cloudinary.com"] },
};

export default nextConfig;
