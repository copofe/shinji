import { getLatestBlogPostsQuery } from '::/db/queries'
import { PostCard } from './PostCard'

export default async function Post({ searchParams }: { searchParams: { [key: string]: number | undefined } }) {
  const posts = await getLatestBlogPostsQuery({ page: searchParams.page })
  return (
    <>
      {posts.data?.map((post) => {
        return <PostCard post={post} key={post.slug} />
      })}
    </>
  )
}
