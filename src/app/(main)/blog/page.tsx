import PostCard from '::/components/post/card'
import { listPublished } from '::/db/post'

type Params = Promise<{ [key: string]: number | undefined }>

export default async function Post({ searchParams }: { searchParams: Params }) {
  const { page = 1 } = await searchParams
  const posts = await listPublished(page)
  return (
    <div className="w-full md:w-auto relative p-4 md:p-8 flex flex-col items-center">
      <div>
        {posts.map((post, i) => {
          return <PostCard post={post} key={post.slug} index={i} />
        })}
      </div>
    </div>
  )
}
