import Link from 'next/link'
import dayjs from 'dayjs'
import { Post } from '::/types'

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} prefetch={false}>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {post.title}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:my-4">{post.excerpt}</p>
      <div className="text-secondary-foreground text-sm">
        <span className="mr-2">{post.author?.nickname}</span>·
        <time className="ml-2">
          {dayjs(post.createdAt).format('YYYY-MM-DD')}
        </time>
      </div>
    </Link>
  )
}
