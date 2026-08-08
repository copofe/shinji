import { notFound } from 'next/navigation'
import PostCard from '::/components/post/card'
import PostPagination from '::/components/post/pagination'
import { countPublished, listPublished, PAGE_SIZE } from '::/db/post'

// 第2页及以后走 ISR：构建时由 generateStaticParams 预渲染所有分页页。
export const revalidate = 3600

type Params = Promise<{ page: string }>

// 预生成第2页起的所有分页（第1页由 /blog 处理，这里不返回 1）。
// 构建时查一次库算总页数；countPublished 走 unstable_cache。
export async function generateStaticParams() {
  const total = await countPublished()
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  // 从第2页开始枚举；若只有1页则返回空数组（该路由不产出任何页面）
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }))
}

export async function generateMetadata({ params }: { params: Params }) {
  const { page } = await params
  return {
    title: `Blog - 第${page}页`,
  }
}

export default async function BlogPagedPage({ params }: { params: Params }) {
  const { page: pageStr } = await params
  const page = Number(pageStr)

  // 非法页码或第1页（第1页归 /blog）直接 404
  if (!Number.isInteger(page) || page < 2) {
    notFound()
  }

  const [posts, total] = await Promise.all([
    listPublished(page),
    countPublished(),
  ])
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  // 页码超出范围（如手动输入 /blog/page/999）404
  if (page > totalPages) {
    notFound()
  }

  return (
    <div className="w-full max-w-[80ch] self-center px-4 md:px-8 py-8 md:py-12 flex flex-col items-center">
      <div>
        {posts.map((post, i) => {
          return <PostCard post={post} key={post.slug} index={i} />
        })}
      </div>
      <PostPagination currentPage={page} totalPages={totalPages} />
    </div>
  )
}
