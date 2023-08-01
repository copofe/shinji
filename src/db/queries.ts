export const LatestBlogPostsQuery =
  'createdAt, title, excerpt, like, cover, slug, author!inner (nickname, id)'

export const BlogPostQuery =
  'createdAt, title, excerpt, like, cover, slug, content, author!inner (nickname, id)'
