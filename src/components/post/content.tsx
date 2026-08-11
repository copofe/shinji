'use client'

import { motion } from 'motion/react'
import PostMeta from '::/components/post/meta'
import { Post } from '::/db/post'

export default function PostContent({
  post,
  children,
}: {
  post: Post
  children: React.ReactNode
}) {
  return (
    <div className="self-center w-full px-4 md:px-8 py-8 md:py-12 flex flex-col items-center">
      <div className="w-full max-w-[80ch]">
        {post.cover ? (
          <img src={post.cover} alt={post.title} className="w-full rounded mb-8" />
        ) : null}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="article w-full max-w-none"
        >
          <h1>{post.title}</h1>
          <div className="mt-2 mb-8">
            <PostMeta post={post} />
          </div>
          {children}
        </motion.article>
      </div>
    </div>
  )
}
