import * as runtime from 'react/jsx-runtime'
import { compile, run } from '@mdx-js/mdx'
import { cacheLife } from 'next/cache'
import remarkGfm from 'remark-gfm'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import rehypePrettyCode from 'rehype-pretty-code'
import type { MDXContent } from 'mdx/types.js'

// 空内容时返回的回退组件:符合 MDXContent 签名,渲染为空。
// (原代码用 Fragment,但 MDX 组件无 children 概念,空内容语义即渲染空。)
const EmptyMdx: MDXContent = () => null

/**
 * 编译 MDX 源码为函数体代码字符串。
 *
 * 用 `'use cache'` 包裹：编译内含 rehype-pretty-code → shiki 高亮（重计算），
 * 缓存编译产物按 source 一一对应、命中即跳过高亮；同时把 shiki 链路里偶现的
 * `Date.now()`（cacheComponents 在预渲染期禁止的非确定值）关进缓存作用域，
 * 让其结果被固化而非报错。返回字符串可序列化，满足 'use cache' 返回值约束。
 */
async function compileMdx(source: string): Promise<string> {
  'use cache'
  cacheLife('weeks')
  return String(
    await compile(source, {
      outputFormat: 'function-body',
      development: false,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeUnwrapImages,
        [rehypePrettyCode, { theme: { light: 'github-light', dark: 'github-dark' } }],
      ],
    })
  )
}

/**
 * 把 MDX 源码编译并运行成一个 React 组件。
 *
 * compile 走缓存（compileMdx），run() 在缓存外执行拿到组件——组件是不可序列化
 * 的函数，不能作为 'use cache' 返回值，故拆成两步。调用方拿到组件后，在渲染时
 * 自行传入 components 映射({ img: Image, Tweet } 等)。
 *
 * 单调用点:目前仅 blog/[slug] 使用。若将来出现第二个调用点且配置不同,
 * 再加 options 参数——不在那之前预设接口。
 */
export async function renderMdx(source: string): Promise<MDXContent> {
  const code = await compileMdx(source)
  const mod = await run(code, { ...runtime, Fragment: runtime.Fragment })
  return mod ? mod.default : EmptyMdx
}
