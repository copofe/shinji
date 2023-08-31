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
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="prose dark:prose-invert relative mt-8 md:mt-12"
    >
      <h1>{post.title}</h1>
      <PostMeta post={post} />
      {children}
    </motion.article>
  )
}
