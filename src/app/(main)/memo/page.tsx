import PageTransition from '::/components/PageTransition'
import MemoCard from './MemoCard'

export interface Memo {
  id: number
  rowStatus: string
  creatorId: number
  createdTs: number
  updatedTs: number
  displayTs: number
  content: string
  visibility: string
  pinned: boolean
  creatorName: string
  creatorUsername: string
  resourceList: {
    id: number
    creatorId: number
    createdTs: number
    updatedTs: number
    filename: string
    externalLink: string
    type: string
    size: number
    linkedMemoAmount: number
  }[]
  relationList: any[]
}

const memosApi = process.env.MEMOS_API
const openId = process.env.MEMOS_OPENID

export const revalidate = 600

export default async function Memo() {
  const res = await fetch(`${memosApi}?openId=${openId}`)
  const memos: Memo[] = await res.json()

  return (
    <PageTransition className="items-center">
      <div className="p-2 md:p-4 w-full md:w-[42em]">
        {memos.map((memo) => {
          return <MemoCard key={memo.id} memo={memo} />
        })}
      </div>
    </PageTransition>
  )
}
