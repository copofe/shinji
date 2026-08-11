'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import PostMeta from '::/components/post/meta'
import { Post } from '::/db/post'

export default function PostContent({
  post,
  children,
}: {
  post: Post
  children: React.ReactNode
}) {
  const router = useRouter()

  // 回到来源页：首页进回首页、列表进回列表。next/navigation 的 back() 包装了
  // history.back()。
  const goBack = () => router.back()

  return (
    <div className="self-center w-full px-4 md:px-8 py-8 md:py-12 flex flex-col items-center">
      <div className="w-full max-w-[80ch]">
        <button
          type="button"
          onClick={goBack}
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          返回
        </button>
        {post.cover ? (
          /* oxlint-disable-next-line nextjs/no-img-element */
          <img
            src={post.cover}
            alt={post.title}
            className="w-full rounded mb-8"
          />
        ) : null}
        <article className="article w-full max-w-none">
          <h1>{post.title}</h1>
          <div className="mt-2 mb-8">
            <PostMeta post={post} />
          </div>
          {children}
        </article>
      </div>
    </div>
  )
}
