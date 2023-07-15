/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['frontend-take-home-service.fetch.com'],
  },
  productionBrowserSourceMaps: true,
  async headers() {
    return [
      {
        source: '/dog-board',
        headers: [
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
