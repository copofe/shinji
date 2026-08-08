import Link from 'next/link'

// 第1页是 /blog，第2页起是 /blog/page/N。hrefOf 统一这条规则。
function hrefOf(page: number): string {
  return page <= 1 ? '/blog' : `/blog/page/${page}`
}

// 分页导航：上一页 / 页码 / 下一页。
// 用 <Link> 走客户端导航 + prefetch（hover 时预取相邻页）。
// 当前页不可点；首屏页隐藏"上一页"，末页隐藏"下一页"。
export default function PostPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  // 只有一页时不渲染导航
  if (totalPages <= 1) return null

  // 生成 1..totalPages 的页码序列
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav
      className="flex items-center justify-center gap-4 mt-8 mb-4 text-sm md:text-base"
      aria-label="分页导航"
    >
      {currentPage > 1 ? (
        <Link
          href={hrefOf(currentPage - 1)}
          className="px-3 py-1 rounded hover:opacity-70 transition-opacity"
          aria-label="上一页"
        >
          ←
        </Link>
      ) : null}

      {pages.map((p) => (
        <Link
          key={p}
          href={hrefOf(p)}
          aria-current={p === currentPage ? 'page' : undefined}
          className={
            p === currentPage
              ? 'px-3 py-1 rounded font-semibold pointer-events-none opacity-100'
              : 'px-3 py-1 rounded hover:opacity-70 transition-opacity'
          }
          {...(p === currentPage ? { tabIndex: -1, 'aria-disabled': 'true' } : {})}
        >
          {p}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={hrefOf(currentPage + 1)}
          className="px-3 py-1 rounded hover:opacity-70 transition-opacity"
          aria-label="下一页"
        >
          →
        </Link>
      ) : null}
    </nav>
  )
}
