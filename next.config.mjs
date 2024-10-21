/** @type {import('next').NextConfig} */

const endpointUrl = `${process.env.API_KEY}/json/VwsmAdstrdNcmCnsmpW/:start/:end`;
const proxyServerApiUrl = `/api/${endpointUrl}`;
const seoulServerApiUrl = `http://openapi.seoul.go.kr:8088/${endpointUrl}`;
// console.log({ proxyServerApiUrl, seoulServerApiUrl });

const nextConfig = {
  env: { API_KEY: process.env.API_KEY },
  images: { domains: ["res.cloudinary.com"] },

  // 프록시 서버 (중계역할) : mixed content 오류를 해결함
  async rewrites() {
    return [{ source: proxyServerApiUrl, destination: seoulServerApiUrl }];
  },
};

export default nextConfig;
