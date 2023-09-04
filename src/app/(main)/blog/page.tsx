import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import PostCard from '::/components/post/card'
import { LatestBlogPostsQuery, Database } from '::/db'

const limit = 5

export default async function Post({
  searchParams,
}: {
  searchParams: { [key: string]: number | undefined }
}) {
  const { page = 1 } = searchParams
  const supabase = createServerComponentClient<Database>({ cookies })
  const from = (page - 1) * limit
  const to = from + limit
  const posts = await supabase
    .from('post')
    .select(LatestBlogPostsQuery)
    .eq('published', true)
    .range(from, to)
    .order('createdAt', { ascending: false })
  return (
    <div className="w-full md:w-auto relative">
      {posts.data?.map((post, i) => {
        return <PostCard post={post} key={post.slug} index={i} />
      })}
    </div>
  )
}
