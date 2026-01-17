/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Enable static export for Firebase Hosting
  images: {
    unoptimized: true,  // Disable Image Optimization API for static export
  },
}

module.exports = nextConfig
