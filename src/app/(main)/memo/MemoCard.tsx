/* eslint-disable @next/next/no-img-element */
'use client'

import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { date } from '::/libs';
import { Memo } from './page'

const photoWidth = ['', '50%', '40%']

export default function MemoCard({ memo }: { memo: Memo }) {
  return (
    <div className="p-4 mb-4 border-b last:border-0">
      <div className="text-xs text-muted-foreground mb-3">
        {date.format(memo.createdTs * 1000)}
      </div>
      <div>{memo.content}</div>
      {memo.resourceList.length > 0 ? (
        <div className="flex flex-wrap mt-2">
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
        </div>
      ) : null}
    </div>
  )
}
