import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import * as runtime from 'react/jsx-runtime'
import { compile, run } from '@mdx-js/mdx'
import remarkUnwrapImages from 'remark-unwrap-images'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { BlogPostQuery, Database } from '::/db'
import PostMeta from '../../../../components/post/meta'
import { Fragment } from 'react'
import Tweet from '::/components/Tweet'
import Image from '::/components/post/image'
import PostComment from '::/components/post/comment'
import CodeBlock from '::/components/CodeBlock'

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
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
      remarkPlugins: [remarkUnwrapImages],
    })
  )

  const contentModule = await run(content, runtime)
  const PostContent = contentModule ? contentModule.default : Fragment

  return (
    <>
      <article className="prose dark:prose-invert relative mt-8 lg:mt-12">
        <h1>{post.title}</h1>
        <PostMeta post={post} />
        <PostContent
          components={{
            img: Image,
            Tweet,
            pre: CodeBlock,
          }}
        />
      </article>
      <span className="my-12 text-secondary-foreground seaborn">· End ·</span>
      <PostComment slug={params.slug} />
    </>
  )
}
