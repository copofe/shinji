'use client'

import { motion } from 'framer-motion'
import PostMeta from '::/components/post/meta'
import { Post } from '::/types'

export default function PostContent({
  post,
  children,
}: {
  post: Post
  children: React.ReactNode
}) {
  return (
    <div className="self-center md:w-[95ch] flex flex-col items-center">
      {post.cover ? (
        <img src={post.cover} alt={post.title} />
      ) : null}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="prose prose-neutral dark:prose-invert relative p-4 md:p-8 !max-w-[80ch]"
      >
        <h1>{post.title}</h1>
        <PostMeta post={post} />
        {children}
      </motion.article>
    </div>
  )
}
