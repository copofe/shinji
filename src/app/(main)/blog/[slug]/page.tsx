import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import * as runtime from 'react/jsx-runtime'
import { compile, run } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'rehype-unwrap-images'
import rehypePrettyCode from "rehype-pretty-code";
import { Fragment } from 'react'
import Tweet from '::/components/Tweet'
import Image from '::/components/post/image'
import { BlogPostQuery, Database } from '::/db'
import BlogPostComment from '::/components/post/comment'
import PostContent from '::/components/post/content'
import SEO from '::/seo'

interface PostProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PostProps) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: post } = await supabase
    .from('post')
    .select(BlogPostQuery)
    .eq('published', true)
    .eq('slug', params.slug)
    .limit(1)
    .maybeSingle()

  const title = post?.title + ' - ' + SEO.title
  const description = post?.excerpt
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
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: post } = await supabase
    .from('post')
    .select(BlogPostQuery)
    .eq('published', true)
    .eq('slug', params.slug)
    .limit(1)
    .maybeSingle()

  if (post === null) {
    notFound()
  }

  const content = String(
    await compile(post.content, {
      outputFormat: 'function-body',
      development: false,
      remarkPlugins: [remarkUnwrapImages, remarkGfm],
      rehypePlugins: [rehypePrettyCode],
    })
  )

  const contentModule = await run(content, { ...runtime, Fragment: Fragment })
  const MdxContent = contentModule ? contentModule.default : Fragment

  return (
    <>
      <PostContent post={post}>
        <MdxContent
          components={{
            img: Image,
            Tweet,
          }}
        />
      </PostContent>
      <BlogPostComment slug={params.slug} />
    </>
  )
}
