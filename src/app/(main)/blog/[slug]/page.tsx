import { notFound } from 'next/navigation'
import { Tweet } from 'react-tweet'
import Image from '::/components/post/image'
import { getBySlug, listPublished } from '::/db/post'
import { renderMdx } from '::/libs/mdx'
import PostContent from '::/components/post/content'
import SEO from '::/seo'

// Cache Components 要求 generateStaticParams 至少返回一个 param，用于构建期校验
// （确保无 cookies/headers/searchParams 等 runtime 动态访问）。
// 预渲染最新一页；其余 slug 由 dynamicParams（默认 true）按需生成，新文章无需重新部署。
export async function generateStaticParams() {
  const posts = await listPublished(1)
  return posts.map((post) => ({ slug: post.slug }))
}

type params = Promise<{ slug: string }>
type PostProps = {
  params: params
}

export async function generateMetadata({ params }: PostProps) {
  const { slug } = await params
  const post = await getBySlug(slug)

  // 缺失 slug 不再产出 "undefined - Shinji"，优雅退化到站点默认标题
  const title = post ? `${post.title} - ${SEO.title}` : SEO.title
  const description = post?.excerpt ?? SEO.description
  return {
    title,
    description,
    keywords: 'front-end,gamer,shinji',
    twitter: {
      title,
      description,
    },
    openGraph: {
      type: 'website',
      siteName: title,
      title,
      description,
    },
  }
}

export default async function Post({ params }: PostProps) {
  const { slug } = await params
  const post = await getBySlug(slug)

  if (post === null) {
    notFound()
  }

  const MdxContent = await renderMdx(post.content)

  return (
    <PostContent post={post}>
      <MdxContent
        components={{
          img: Image,
          Tweet,
        }}
      />
    </PostContent>
  )
}
