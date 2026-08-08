'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Post } from '::/db/post'
import PostMeta from './meta'

export default function PostCard({
  post,
  index,
}: {
  post: Post
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 * index }}
      className="py-6 md:py-10 prose dark:prose-invert max-w-[80ch] group"
    >
      <Link href={`/blog/${post.slug}`} className="no-underline">
        {post.cover ? (
          <img
            src={post.cover}
            alt={post.title}
            className="my-0 rounded"
          />
        ) : null}
        <h2 className={`${post.cover ? 'my-3' : 'mb-3 mt-0'} group-hover:underline underline-offset-4 decoration-1`}>{post.title}</h2>
        <p className="mb-2">{post.excerpt}</p>
      </Link>
      <PostMeta post={post} />
    </motion.div>
  )
}
