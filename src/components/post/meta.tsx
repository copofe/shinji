'use client'

import { date } from '::/libs';
import { Post } from '::/types'

export default function PostMeta({ post }: { post: Post }) {
  return (
    <p className="text-muted-foreground text-xs">
      <time>{date.format(post.createdAt)}</time>
      <span className="mx-2">·</span>
      <span>{post.author?.nickname}</span>
    </p>
  )
}
