/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/blog/[slug]': ['node_modules/shiki/**/*'],
    },
  },
}

module.exports = nextConfig
