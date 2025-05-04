'use client'

import { JSX } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'

export default function Image(props: JSX.IntrinsicElements['img']) {
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
