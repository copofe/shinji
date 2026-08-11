import { notFound } from 'next/navigation'
import { Tweet } from 'react-tweet'
import Image from '::/components/post/image'
import { getBySlug } from '::/db/post'
import { renderMdx } from '::/libs/mdx'
import PostContent from '::/components/post/content'
import SEO from '::/seo'

// 内容稳定的博客详情页走 ISR：命中缓存时由边缘秒回，
// 仅后台 revalidate 那一次回源 Supabase 新加坡。
export const revalidate = 3600

// 返回空数组 + dynamicParams 默认 true：不预渲染任何 slug，
// 而是按访问时按需生成并缓存。新增文章自动生成新缓存，无需重新部署。
export function generateStaticParams() {
  return []
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
