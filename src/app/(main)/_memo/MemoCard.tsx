import 'react-photo-view/dist/react-photo-view.css'
import * as runtime from 'react/jsx-runtime'
import { Memo } from './page'
import { compile, run } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from "rehype-pretty-code";
import { Fragment } from 'react';
import MemoResource from './MemoResource';
import Time from '::/components/time';

export default async function MemoCard({ memo }: { memo: Memo }) {
  const content = String(
    await compile(memo.content, {
      outputFormat: 'function-body',
      development: false,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrettyCode],
    })
  )

  const contentModule = await run(content, { ...runtime, Fragment: Fragment })
  const MdxContent = contentModule ? contentModule.default : Fragment
  return (
    <div className="p-4 mb-4 rounded-lg transition-all bg-background border">
      <div className="text-xs text-muted-foreground mb-3">
        <Time timestamp={memo.createdTs * 1000} />
      </div>
      <MdxContent />
      {memo.resourceList.length > 0 ? (
        <div className="flex flex-wrap mt-2">
          <MemoResource memo={memo} />
        </div>
      ) : null}
    </div>
  )
}
