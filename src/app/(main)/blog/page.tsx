import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { PostCard } from './PostCard'
import { LatestBlogPostsQuery, Database } from '::/db'

const limit = 10

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
    <div className='w-full lg:w-[42rem]'>
      {posts.data?.map((post) => {
        return (
          <div key={post.slug} className="heti mb-8 lg:mb-12">
            <PostCard post={post} />
          </div>
        )
      })}
    </div>
  )
}
