import * as runtime from 'react/jsx-runtime'
import { compile, run } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'rehype-unwrap-images'
import rehypePrettyCode from 'rehype-pretty-code'
import type { MDXContent } from 'mdx/types.js'

// 空内容时返回的回退组件:符合 MDXContent 签名,渲染为空。
// (原代码用 Fragment,但 MDX 组件无 children 概念,空内容语义即渲染空。)
const EmptyMdx: MDXContent = () => null

/**
 * 把 MDX 源码编译并运行成一个 React 组件。
 *
 * 固定配置(blog 详情页当前所需):remark-gfm + rehype-unwrap-images +
 * rehype-pretty-code,outputFormat function-body。调用方拿到组件后,
 * 在渲染时自行传入 components 映射({ img: Image, Tweet } 等)。
 *
 * 单调用点:目前仅 blog/[slug] 使用。若将来出现第二个调用点且配置不同,
 * 再加 options 参数——不在那之前预设接口。
 */
export async function renderMdx(source: string): Promise<MDXContent> {
  const code = String(
    await compile(source, {
      outputFormat: 'function-body',
      development: false,
      remarkPlugins: [remarkUnwrapImages, remarkGfm],
      rehypePlugins: [rehypePrettyCode],
    }),
  )
  const mod = await run(code, { ...runtime, Fragment: runtime.Fragment })
  return mod ? mod.default : EmptyMdx
}
