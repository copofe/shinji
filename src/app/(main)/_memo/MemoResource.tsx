'use client'

import { PhotoProvider, PhotoView } from 'react-photo-view'
import { Memo } from './page'

const photoWidth = ['', '50%', '40%']

export default function MemoResource({ memo }: { memo: Memo }) {
  return (
    <PhotoProvider maskOpacity={0.8}>
      {memo.resourceList
        .filter((f) => f.type === 'image/*')
        .map((resource) => {
          return (
            <PhotoView key={resource.id} src={resource.externalLink}>
              <div
                className="relative overflow-hidden aspect-square bg-no-repeat bg-cover bg-center"
                style={{
                  width: photoWidth[memo.resourceList.length] || '30%',
                  backgroundImage: `url(${resource.externalLink})`,
                }}
              />
            </PhotoView>
          )
        })}
    </PhotoProvider>
  )
}
