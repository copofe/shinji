import InfiniteList from '::/components/post/infinite-list'
import BackButton from '::/components/BackButton'
import { listPublished, PAGE_SIZE } from '::/db/post'

export default async function BlogFirstPage() {
  const posts = await listPublished(1)
  // 首页是否还有更多由服务端判定，传给客户端，避免客户端耦合页大小
  const initialHasMore = posts.length >= PAGE_SIZE

  return (
    <div className="w-full self-center px-4 md:px-8 py-8 md:py-12 flex flex-col items-center">
      <div className="w-full max-w-[80ch]">
        <BackButton />
        <InfiniteList initialPosts={posts} initialHasMore={initialHasMore} />
      </div>
    </div>
  )
}
