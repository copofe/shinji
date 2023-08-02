'use client'

import useComment from '::/hooks/useComment'
import { useRef } from 'react'

export default function BlogPostComment() {
  const ref = useRef(null)
  useComment({
    src: 'https://utteranc.es/client.js',
    repo: 'copofe/shinji',
    issueTerm: 'pathname',
    crossOrigin: 'anonymous',
    async: true,
    ref,
  })
  return <div ref={ref} className='w-full'></div>
}
