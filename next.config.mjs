/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',

  reactStrictMode: true,
  images: {},
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
