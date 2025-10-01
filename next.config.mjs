import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  
  // ✅ Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
