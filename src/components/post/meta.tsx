'use client'

import { date } from '::/libs';
import { Post } from '::/db/post'

export default function PostMeta({ post }: { post: Post }) {
  return (
    <small className="text-muted-foreground">
      <time>{date.format(post.createdAt)}</time>
      <span className="px-2">·</span>
      <span>{post.author?.nickname}</span>
    </small>
  )
}
