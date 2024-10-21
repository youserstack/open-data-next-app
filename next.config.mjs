/** @type {import('next').NextConfig} */
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const API_SERVICE = process.env.API_SERVICE;

const nextConfig = {
  env: {
    API_URL,
    API_KEY,
    API_SERVICE,
  },
  images: { domains: ["res.cloudinary.com"] },
  async rewrites() {
    return [
      {
        source: `/api/${API_KEY}/json/VwsmAdstrdNcmCnsmpW/:start/:end`,
        destination: `${API_URL}/${API_KEY}/json/VwsmAdstrdNcmCnsmpW/:start/:end`,
      },
    ];
  },
};

export default nextConfig;
