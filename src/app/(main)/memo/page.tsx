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
    <div className="flex-1 self-center flex items-stretch flex-col w-full p-2 md:p-0 md:w-[42rem] mt-8 md:mt-12">
      {memos.map((memo) => {
        return <MemoCard key={memo.id} memo={memo} />
      })}
    </div>
  )
}
