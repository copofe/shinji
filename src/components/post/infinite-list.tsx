'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Post, PAGE_SIZE } from '::/db/post'
import {
  Card,
  CardGroup,
  CardHeader,
  CardTitle,
  CardDescription,
} from '::/components/ui/card'
import { ThinkingIndicator } from '::/components/ui/thinking-indicator'

export default function InfiniteList({
  initialPosts,
}: {
  initialPosts: Post[]
}) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  // 首屏返回不足一页 → 已经到底
  const [done, setDone] = useState(initialPosts.length < PAGE_SIZE)
  // 记录最近一次追加前已存在的卡片数：索引 >= 该值的卡片入场动画，
  // 更早的卡片用 initial={false} 瞬间显示（SSR 首屏不延迟、无 hydration 闪烁）。
  const [animatedFromIndex, setAnimatedFromIndex] = useState(
    initialPosts.length
  )

  async function loadMore() {
    if (loading || done) return
    setLoading(true)
    try {
      const res = await fetch(`/api/posts?page=${page + 1}`)
      if (!res.ok) throw new Error('fetch failed')
      const { posts: next, hasMore } = await res.json()
      // 标记分界：在 append 之前记下旧长度，新卡片从该索引开始。
      setAnimatedFromIndex(posts.length)
      if (!hasMore) setDone(true)
      setPosts((prev) => [...prev, ...next])
      setPage((p) => p + 1)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <CardGroup separated className="-mx-4 gap-0">
        {posts.map((post, i) => {
          const isNew = i >= animatedFromIndex
          // 仅在新增批次内错峰：50ms/项，封顶 0.4s，避免大批次末尾过慢。
          const staggerDelay = isNew
            ? Math.min((i - animatedFromIndex) * 0.05, 0.4)
            : 0
          return (
            <motion.div
              key={post.slug}
              initial={isNew ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ease: 'easeOut',
                duration: 0.3,
                delay: staggerDelay,
              }}
            >
              <Card href={`/blog/${post.slug}`} index={i} label={post.title}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription className="truncate">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          )
        })}
      </CardGroup>

      <div className="mt-8 flex justify-center">
        {loading ? (
          <ThinkingIndicator />
        ) : done ? (
          <p className="text-sm text-muted-foreground py-2">没有更多了</p>
        ) : (
          <button
            onClick={loadMore}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            加载更多
          </button>
        )}
      </div>
    </>
  )
}
