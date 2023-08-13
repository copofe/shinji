'use client'

import { useTheme } from 'next-themes';
import { useEffect, useMemo } from 'react'

const CommentConfig = {
  src: 'https://utteranc.es/client.js',
  repo: 'copofe/shinji',
  crossOrigin: 'anonymous',
  async: true,
}

import { useRef } from 'react'

export default function BlogPostComment({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { src, repo } = CommentConfig
  const { theme } = useTheme()

  const themeName = useMemo(() => {
    switch (theme) {
      case 'light':
        return 'github-light'
      case 'dark':
        return 'github-dark'
    
      default:
        return 'preferred-color-scheme'
    }
  }, [theme])

  useEffect(() => {
    let script = document.createElement('script')
    script.src = src
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('theme', themeName)
    script.setAttribute('issue-term', slug)
    script.setAttribute('repo', repo)

    if (ref.current?.innerHTML) {
      ref.current.innerHTML = ''
    }
    ref.current?.appendChild(script)

  }, [theme])
  return <div ref={ref} className="w-full"></div>
}
