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
    <div className="self-center w-full md:w-[95ch] flex flex-col items-center mb-16 md:mb-24">
      {post.cover ? (
        <img src={post.cover} alt={post.title} />
      ) : null}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="prose prose-neutral dark:prose-invert relative p-4 md:p-8 w-full max-w-[80ch]!"
      >
        <h1>{post.title}</h1>
        <PostMeta post={post} />
        {children}
      </motion.article>
    </div>
  )
}
