import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import InfiniteList from '::/components/post/infinite-list'
import { listPublished, PAGE_SIZE } from '::/db/post'

export default async function BlogFirstPage() {
  const posts = await listPublished(1)
  // 首页是否还有更多由服务端判定，传给客户端，避免客户端耦合页大小
  const initialHasMore = posts.length >= PAGE_SIZE

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
        <InfiniteList initialPosts={posts} initialHasMore={initialHasMore} />
      </div>
    </div>
  )
}
