import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import InfiniteList from '::/components/post/infinite-list'
import { listPublished } from '::/db/post'

// 第1页用 ISR：不读 searchParams → 不再被强制动态渲染 → CDN 可缓存。
export const revalidate = 3600

export default async function BlogFirstPage() {
  const posts = await listPublished(1)

  return (
    <div className="w-full self-center px-4 md:px-8 py-8 md:py-12 flex flex-col items-center">
      <div className="w-full max-w-[80ch]">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          返回
        </Link>
        <InfiniteList initialPosts={posts} />
      </div>
    </div>
  )
}
