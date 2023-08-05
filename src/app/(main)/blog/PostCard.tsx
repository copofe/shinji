import Link from 'next/link'
import { Post } from '::/types'
import PostMeta from './PostMeta';

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="py-8 lg:py-12 filter-noise">
      <h3 className="text-xl lg:text-2xl font-semibold">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="py-2 text-sm lg:text-base">{post.excerpt}</p>
      <PostMeta post={post} />
    </div>
  )
}
