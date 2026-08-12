/** @type {import('next').NextConfig} */

// 安全响应头。用静态 CSP 而非 nonce：App Router 的 RSC payload 是内联
// <script>，nonce 需在 layout 读 headers()，会把 revalidate=3600 的 ISR
// 强制变成动态渲染，毁掉边缘缓存。静态 CSP 仍收紧 object-src / base-uri
// / form-action / frame-ancestors / connect-src——实打实的纵深防御。
const ContentSecurityPolicy = [
  "default-src 'self'",
  // RSC payload + next-themes 注入脚本 = 内联，无法避免
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  // 博客封面、friend favicon 走 https / data:
  "img-src 'self' data: https:",
  // 视频用 plyr，源 URL 可能是外部 https
  "media-src 'self' https:",
  // 可变字体兜底是 base64 内联（font-weight 系统），需放行 data:
  "font-src 'self' data:",
  // Supabase 全在服务端；客户端只 fetch 同源 /api/posts
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ')

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const nextConfig = {
  // Cache Components（Next 16 稳定）：启用 PPR + use cache + dynamicIO 的统一开关。
  // 数据默认动态，由 'use cache' 显式缓存；见 src/db/post.ts 的两个数据函数。
  cacheComponents: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
