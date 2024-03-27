/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SEOUL_OPEN_URL: process.env.SEOUL_OPEN_URL,
    SEOUL_OPEN_API_KEY: process.env.SEOUL_OPEN_API_KEY,
  },
};

export default nextConfig;
