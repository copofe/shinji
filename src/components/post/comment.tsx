'use client'

import { useTheme } from '::/components/ThemeProvider'
import { useEffect, useRef } from 'react'

const CommentConfig = {
  src: 'https://utteranc.es/client.js',
  repo: 'copofe/shinji',
}

// 主题映射：utterances 只认 github-light / github-dark / preferred-color-scheme
function toUtterancesTheme(theme?: string) {
  switch (theme) {
    case 'light':
      return 'github-light'
    case 'dark':
      return 'github-dark'
    default:
      return 'preferred-color-scheme'
  }
}

export default function BlogPostComment({ slug }: { slug: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const { src, repo } = CommentConfig

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 每次重挂载前彻底清空：移除旧 script 与 utterances 注入的 iframe，
    // 避免 utterances 持有的 script 父节点引用失效后报
    // insertAdjacentHTML: The element has no parent。
    container.innerHTML = ''

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('theme', toUtterancesTheme(theme))
    script.setAttribute('issue-term', slug)
    script.setAttribute('repo', repo)
    container.appendChild(script)
    // effect 依赖 theme：切主题时重建 utterances 实例以应用新主题。
  }, [theme, slug, src, repo])

  return <div ref={containerRef} className="w-full" />
}
