/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
        port: '',
        pathname: '/media/games/**'
      }
    ]
  },
  experimental: {
    serverActions: true
  }
}

https: module.exports = nextConfig
