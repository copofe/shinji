'use client'

import { useEffect } from 'react'

const CommentConfig = {
  src: 'https://utteranc.es/client.js',
  repo: 'copofe/shinji',
  theme: 'preferred-color-scheme',
  issueTerm: 'pathname',
  crossOrigin: 'anonymous',
  async: true,
}

import { useRef } from 'react'

export default function BlogPostComment() {
  const ref = useRef<HTMLDivElement>(null)
  const { src, issueTerm, repo, theme } = CommentConfig

  useEffect(() => {
    let script = document.createElement('script')
    script.src = src
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('theme', theme)
    script.setAttribute('issue-term', issueTerm)
    script.setAttribute('repo', repo)

    if (ref.current?.innerHTML) {
      ref.current.innerHTML = ''
    }
    ref.current?.appendChild(script)

  }, [theme])
  return <div ref={ref} className="w-full"></div>
}
