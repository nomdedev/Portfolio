/** @type {import('next').NextConfig} */
const isGitHubPages = !!process.env.GITHUB_PAGES;
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: isGitHubPages,
  },
  // Solo usar export para GitHub Pages, no para Vercel
  ...(isGitHubPages ? {
    output: 'export',
    trailingSlash: true,
    distDir: 'dist',
    basePath: '/Portfolio',
    assetPrefix: '/Portfolio/',
  } : {}),
}

export default nextConfig