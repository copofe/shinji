import { getLatestBlogPostsQuery } from '::/db/queries'
import { PostCard } from './PostCard'

export default async function Post({ page = 0, limit = 10 }) {
  const posts = await getLatestBlogPostsQuery({ page, limit })
  return (
    <>
      {posts.data?.map((post) => {
        return <PostCard post={post} key={post.slug} />
      })}
    </>
  )
}
