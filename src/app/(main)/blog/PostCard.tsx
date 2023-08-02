import Link from 'next/link'
import dayjs from 'dayjs'
import { Post } from '::/types'

export function PostCard({ post }: { post: Post }) {
  return (
    <>
      <Link href={`/blog/${post.slug}`}>
        <h2>{post.title}</h2>
      </Link>
      <div className="text-secondary-foreground text-sm heti-meta">
        <span className="mr-2">{post.author?.nickname}</span>·
        <time className="ml-2">
          {dayjs(post.createdAt).format('YYYY-MM-DD')}
        </time>
      </div>
      <p>{post.excerpt}</p>
    </>
  )
}
