'use client'

import React from 'react'
import { Highlight } from 'prism-react-renderer'
export default function CodeBlock({ children }: { children: any }) {
  const code = children.props.children
  const language = children.props.className.replace(/language-/, '')
  return (
    <Highlight code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={style}
          className={`${className} text-xs selection:bg-slate-600 block overflow-x-auto`}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
