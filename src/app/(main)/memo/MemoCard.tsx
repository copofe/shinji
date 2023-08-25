/* eslint-disable @next/next/no-img-element */
'use client'

import { PhotoProvider, PhotoView } from 'react-photo-view'
import dayjs from 'dayjs'
import { Memo } from './page'
import 'react-photo-view/dist/react-photo-view.css'

export default function MemoCard({ memo }: { memo: Memo }) {
  return (
    <div className="p-4 mb-4 rounded-lg transition-all bg-background border hover:shadow">
      <div className="text-xs text-muted-foreground mb-3">
        {dayjs(memo.createdTs * 1000).format('YYYY-MM-DD HH:mm')}
      </div>
      <div>{memo.content}</div>
      <div className="flex flex-wrap">
        <PhotoProvider maskOpacity={0.8}>
          {memo.resourceList.map((resource) => {
            return (
              <PhotoView key={resource.id} src={resource.externalLink}>
                <div className="relative overflow-hidden mb-1 mr-1 w-1/4">
                  <img
                    src={resource.externalLink}
                    className="cursor-zoom-in"
                    alt={resource.filename}
                  />
                </div>
              </PhotoView>
            )
          })}
        </PhotoProvider>
      </div>
    </div>
  )
}
