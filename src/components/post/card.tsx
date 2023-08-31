'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Post } from '::/types'
import PostMeta from './meta'

export default function PostCard({ post, index }: { post: Post, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 * index }}
      className="py-8 md:py-12"
    >
      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-2xl font-semibold">{post.title}</h2>
        <p className="py-2 text-sm md:text-base mb-4">{post.excerpt}</p>
      </Link>
      <PostMeta post={post} />
    </motion.div>
  )
}
