import PostCard from '::/components/post/card'
import PostPagination from '::/components/post/pagination'
import { countPublished, listPublished, PAGE_SIZE } from '::/db/post'

// 第1页用 ISR：不读 searchParams → 不再被强制动态渲染 → CDN 可缓存。
export const revalidate = 3600

export default async function BlogFirstPage() {
  // 第1页固定取 page=1，避免 searchParams 把路由拖回动态渲染。
  const [posts, total] = await Promise.all([
    listPublished(1),
    countPublished(),
  ])
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="w-full relative px-4 md:px-8 py-8 md:py-12 flex flex-col items-center">
      <div className="w-full max-w-[80ch]">
        {posts.map((post, i) => {
          return <PostCard post={post} key={post.slug} index={i} />
        })}
      </div>
      <PostPagination currentPage={1} totalPages={totalPages} />
    </div>
  )
}
