import { NextRequest, NextResponse } from 'next/server'

const memosApi = process.env.MEMOS_API
const openId = process.env.MEMOS_OPENID

export async function GET(req: NextRequest) {
  const res = await fetch(`${memosApi}?openId=${openId}`)
  if (!res.ok) throw new Error('failed to fetch data')
  return res.json()
}
