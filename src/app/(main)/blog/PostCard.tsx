import Link from 'next/link'
import dayjs from 'dayjs'
import { Post } from '::/types'

export function PostCard({ post }: { post: Post }) {
  return (
    <>
      <h3>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <div className="text-secondary-foreground text-sm heti-meta">
        <span>{post.author?.nickname}</span>
        <span className="mx-1">·</span>
        <time>{dayjs(post.createdAt).format('YYYY-MM-DD')}</time>
      </div>
      <p>{post.excerpt}</p>
    </>
  )
}
