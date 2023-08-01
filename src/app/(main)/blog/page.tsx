import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { PostCard } from './PostCard'
import { LatestBlogPostsQuery } from '::/db/queries'
import { Database } from '::/db/types'

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
    <div className='w-full lg:w-5/12'>
      {posts.data?.map((post) => {
        return (
          <div key={post.slug} className="py-4 lg:py-8">
            <PostCard post={post} />
          </div>
        )
      })}
    </div>
  )
}
