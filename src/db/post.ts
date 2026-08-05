import { cache } from 'react'
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

const PAGE_SIZE = 5

export async function listPublished(page: number): Promise<Post[]> {
  const supabase = await createClient()
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

// 请求内记忆化：generateMetadata 与页面体各自调用，但同一请求只命中 DB 一次
export const getBySlug = cache(
  async (slug: string): Promise<BlogPost | null> => {
    const supabase = await createClient()
    const { data } = await supabase
      .from('post')
      .select(DETAIL_PROJECTION)
      .eq('published', true)
      .eq('slug', slug)
      .limit(1)
      .maybeSingle()
    return data
  },
)
