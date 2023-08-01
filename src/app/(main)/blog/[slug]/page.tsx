import dayjs from 'dayjs'
import html from 'remark-html'
import { remark } from 'remark'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { BlogPostQuery, Database } from '::/db'

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
  let contentHtml = post.content || ''
  if (contentHtml) {
    const processedContent = await remark().use(html).process(contentHtml)
    contentHtml = processedContent.toString()
  }

  return (
    <article className='heti'>
      <h1>{post.title}</h1>
      <p className="text-secondary-foreground heti-meta">
        <span className="mr-2">{post.author?.nickname}</span>·
        <time className="ml-2">
          {dayjs(post.createdAt).format('YYYY-MM-DD')}
        </time>
      </p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
    </article>
  )
}
