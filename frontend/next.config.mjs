/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
        serverActions: {
            bodySizeLimit: "10mb",
        },
    },
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: 'http://backend:8000/media/:path*',
      },
    ]
  },
}

export default nextConfig