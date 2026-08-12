import Introduction from '::/components/Introduction'
import HomeSections from '::/components/home-sections'
import { listPublished } from '::/db/post'

export default async function Home() {
  const posts = await listPublished(1)

  return (
    <div className="w-full self-center px-4 md:px-8 py-8 md:py-12 flex flex-col items-center">
      <div className="w-full max-w-[80ch]">
        <Introduction />
        <HomeSections posts={posts} />
      </div>
    </div>
  )
}
