import { cacheLife, cacheTag } from 'next/cache'
import { createClient } from '::/libs/supabase/server'
import { Database } from '::/db/types'

type Tables = Database['public']['Tables']

export type Author = Tables['author']['Row']

// 列表展示形态：不含 content。三个展示组件（card/content/meta）都用它。
export type Post = Omit<
  Tables['post']['Row'],
  'content' | 'authorId' | 'published' | 'updatedAt'
> & { author: Author | null }

// 详情形态：在 Post 基础上多一个 content（MDX 源码）。
// content 只在 [slug] 页面体内部读取（compile(post.content)），不穿过展示组件，
// 故单独建模——getBySlug 返回它，展示组件继续用 Post。
export type BlogPost = Post & { content: string }

// 投影字符串内化在模块实现里，不再跨接缝暴露
const LIST_PROJECTION =
  'createdAt, title, excerpt, like, cover, slug, author!inner (nickname, id)'
const DETAIL_PROJECTION =
  'createdAt, title, excerpt, like, cover, slug, content, author!inner (nickname, id)'

// 导出 PAGE_SIZE：页面层用它算总页数和分页导航范围。
export const PAGE_SIZE = 10

// 缓存策略统一在此：'use cache' + cacheLife('weeks')（revalidate 1 周、expire 30 天），
// 失效以 on-demand 为主——发布/改稿后在 Vercel 后台按 tag purge。
// 列表挂 tag 'posts'，按篇挂 tag `post:<slug>`，互不波及。

// 已发布文章的分页列表（不含 content）。'use cache' 按 page 参数自动区分缓存键，
// 不会串页。tag 'posts'：purge 它刷新列表数据 + 列表页 + /api/posts。
export async function listPublished(page: number): Promise<Post[]> {
  'use cache'
  cacheLife('weeks')
  cacheTag('posts')
  const supabase = createClient()
  const from = (page - 1) * PAGE_SIZE
  // range 是闭区间 [from, to]，故 to = from + size - 1，否则多取一行
  const to = from + PAGE_SIZE - 1
  const { data } = await supabase
    .from('post')
    .select(LIST_PROJECTION)
    .eq('published', true)
    .range(from, to)
    .order('createdAt', { ascending: false })
  return data ?? []
}

// 按 slug 取单篇（含 content）。'use cache' 取代了原先的 React.cache 请求内 memo：
// generateMetadata 与页面体共用同一条目，且跨请求持久缓存 1 周。
// tag `post:${slug}`：purge 它只刷新那一篇详情，其余文章缓存不动。
export async function getBySlug(slug: string): Promise<BlogPost | null> {
  'use cache'
  cacheLife('weeks')
  cacheTag(`post:${slug}`)
  const supabase = createClient()
  const { data } = await supabase
    .from('post')
    .select(DETAIL_PROJECTION)
    .eq('published', true)
    .eq('slug', slug)
    .limit(1)
    .maybeSingle()
  return data
}
