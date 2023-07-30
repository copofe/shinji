import { supabase } from '.';

type GetBlogPostsOptions = {
  limit?: number
  page?: number
}

export const getLatestBlogPostsQuery = async ({ limit = 0, page = 1 }: GetBlogPostsOptions) => {
  const from = (page - 1) * limit
  const to = from + limit
  const posts = await supabase.from('post')
    .select('createdAt, title, excerpt, like, cover, slug, author!inner (nickname, id)')
    .eq('published', true)
    .range(from, to)
  return posts
}

export const getBlogPost = async (slug: string) => {
  const post = await supabase.from('post')
    .select('createdAt, title, excerpt, like, cover, slug, content, author!inner (nickname, id)')
    .eq('published', true)
    .eq('slug', slug)
    .limit(1)
    .maybeSingle()
  return post
}