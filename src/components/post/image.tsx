'use client'

import { JSX, useEffect, useRef } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
// plyr 的 d.ts 同时声明 export = / export default / export as namespace，
// 三者共存时 moduleResolution: bundler 会判默认导入为 "no default export"。
// 这里 namespace 导入再断言出构造函数，运行时仍是 ESM 的 export default。
import * as PlyrImport from 'plyr'
import 'plyr/dist/plyr.css'
import 'react-photo-view/dist/react-photo-view.css'

const Plyr = (PlyrImport as unknown as {
  default: new (
    target: HTMLElement,
    options?: Record<string, unknown>,
  ) => PlyrInstance
}).default

// 实例类型：保留 destroy 等方法，避免 any 散播
interface PlyrInstance {
  destroy(): void
  [key: string]: unknown
}

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
        <figcaption className="text-gray-400 text-xs mt-2 text-center">
          {props.alt}
        </figcaption>
      ) : null}
    </figure>
  )
}

// 视频：用 Plyr 提供可自定义皮肤的原生控件，复用 figure/figcaption 容器
function Video(props: JSX.IntrinsicElements['img']) {
  const ref = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<PlyrInstance | null>(null)

  useEffect(() => {
    if (!ref.current) return
    // 初始化 Plyr；卸载时销毁以防泄漏
    playerRef.current = new Plyr(ref.current, {
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
    return () => {
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
        <figcaption className="text-gray-400 text-xs mt-2 text-center">
          {props.alt}
        </figcaption>
      ) : null}
    </figure>
  )
}
