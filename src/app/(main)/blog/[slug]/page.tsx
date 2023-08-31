import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import * as runtime from 'react/jsx-runtime'
import { compile, run } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypePrettyCode from 'rehype-pretty-code'
import { Fragment } from 'react'
import Tweet from '::/components/Tweet'
import Image from '::/components/post/image'
import { BlogPostQuery, Database } from '::/db'
import BlogPostComment from '::/components/post/comment'
import PostContent from '::/components/post/content'
import 'shiki/themes/nord.json'

export default async function Post({ params }: { params: { slug: string } }) {
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
      rehypePlugins: [
        [rehypePrettyCode, { theme: 'nord', showLineNumbers: true }],
      ],
      remarkPlugins: [remarkUnwrapImages, remarkGfm],
    })
  )

  const contentModule = await run(content, runtime)
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
      <span className="my-12 text-secondary-foreground">•</span>
      <BlogPostComment slug={params.slug} />
    </>
  )
}
