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
  resourceList: any[]
  relationList: any[]
}

const memosApi = process.env.MEMOS_API
const openId = process.env.MEMOS_OPENID

export default async function Memo() {
  const res = await fetch(`${memosApi}?openId=${openId}`, {
    next: { revalidate: 3600 },
  })
  const memos: Memo[] = await res.json()

  return (
    <div className="flex-1 self-center flex items-stretch flex-col w-full p-2 lg:p-0 lg:w-[42rem] mt-8 lg:mt-12">
      {memos.map((memo) => {
        return <MemoCard key={memo.id} memo={memo} />
      })}
    </div>
  )
}
