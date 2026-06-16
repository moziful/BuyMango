/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // 🔒 Your existing catch-all secure pattern
      {
        protocol: 'https',
        hostname: '**',
      },
      // 🔓 Add this pattern to allow the HTTP testing domain
      {
        protocol: 'http',
        hostname: 'googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/mangoes',
        destination: '/all-mangoes',
        permanent: true,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;