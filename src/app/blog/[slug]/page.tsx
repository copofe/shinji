import { getBlogPost } from '::/db/queries'
import dayjs from 'dayjs'
import { notFound } from 'next/navigation';

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const { data: post } = await getBlogPost(params.slug)
  console.log(post)
  if (post === null) {
    notFound()
  }
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl mb-4">
        {post.title}
      </h1>
      <div className="mb-6 text-sm text-secondary-foreground">
        <span className="mr-2">{post.author?.nickname}</span>·
        <time className="ml-2">
          {dayjs(post.createdAt).format('YYYY-MM-DD')}
        </time>
      </div>
    </>
  )
}
