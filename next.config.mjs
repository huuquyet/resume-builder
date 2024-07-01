/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/editor',
        destination: '/builder',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
