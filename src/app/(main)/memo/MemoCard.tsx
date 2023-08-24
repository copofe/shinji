'use client'

import dayjs from 'dayjs'
import { Memo } from './page';

export default function MemoCard({ memo }: { memo: Memo}) {
  return (
    <div
      className="p-4 mb-4 rounded-lg transition-all bg-background border hover:shadow"
    >
      <div className="text-xs text-muted-foreground mb-3">
        {dayjs(memo.createdTs*1000).format('YYYY-MM-DD HH:mm')}
      </div>
      <div>{memo.content}</div>
    </div>
  )
}
