'use client'

import { JSX, useEffect, useRef } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
// plyr CSS 是纯样式，无 document 访问，可静态 import。
// plyr JS 模块在求值阶段访问 document，故 JS 在 useEffect 内动态 import（见 Video）。
import 'plyr/dist/plyr.css'

// 视频后缀判断：![](url) 对视频也走这个组件，按 URL 后缀分支。
const VIDEO_RE = /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i

export default function Image(props: JSX.IntrinsicElements['img']) {
  const src = props.src as string
  return VIDEO_RE.test(src ?? '') ? (
    <Video {...props} />
  ) : (
    <PhotoImage {...props} />
  )
}

// 图片：可点击放大 + 可选 alt 作为 figcaption
function PhotoImage(props: JSX.IntrinsicElements['img']) {
  return (
    <figure>
      <PhotoProvider maskOpacity={0.8}>
        <PhotoView src={props.src as string}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img {...props} className="cursor-zoom-in" alt={props.alt} />
        </PhotoView>
      </PhotoProvider>
      {props.alt ? (
        <figcaption className="text-muted-foreground text-xs mt-2 text-center">
          {props.alt}
        </figcaption>
      ) : null}
    </figure>
  )
}

type PlyrInstance = { destroy(): void; [key: string]: unknown }

// 视频：用 Plyr 提供可自定义皮肤的原生控件，复用 figure/figcaption 容器
function Video(props: JSX.IntrinsicElements['img']) {
  const ref = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<PlyrInstance | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // 仅在客户端动态加载 Plyr（其 JS 模块求值时访问 document，不能静态 import）
    let destroyed = false
    void (async () => {
      // plyr 是真正的 ESM（export default），但 d.ts 声明了 export =，
      // 故 TS 认为 module namespace 无 .default —— 运行时确有，需断言。
      const mod = (await import('plyr')) as unknown as {
        default: new (
          target: HTMLElement,
          options?: Record<string, unknown>,
        ) => PlyrInstance
      }
      // 防止组件已卸载后才初始化
      if (destroyed || !ref.current) return
      playerRef.current = new mod.default(ref.current, {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'duration',
          'mute',
          'volume',
          'settings',
          'pip',
          'airplay',
          'fullscreen',
        ],
      })
    })()

    return () => {
      destroyed = true
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [])

  return (
    <figure>
      <video
        ref={ref}
        src={props.src as string}
        playsInline
        className="w-full"
      />
      {props.alt ? (
        <figcaption className="text-muted-foreground text-xs mt-2 text-center">
          {props.alt}
        </figcaption>
      ) : null}
    </figure>
  )
}
