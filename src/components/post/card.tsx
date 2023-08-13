import Link from 'next/link'
import { Post } from '::/types'
import PostMeta from './meta'

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="py-8 lg:py-12">
      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-2xl font-semibold">{post.title}</h2>
        <p className="py-2 text-sm lg:text-base mb-4">{post.excerpt}</p>
      </Link>
      <PostMeta post={post} />
    </div>
  )
}
