/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Solo usar export para GitHub Pages, no para Vercel
  ...(process.env.GITHUB_PAGES ? {
    output: 'export',
    trailingSlash: true,
    distDir: 'dist',
    basePath: '/Portfolio',
    assetPrefix: '/Portfolio/',
  } : {}),
}

export default nextConfig