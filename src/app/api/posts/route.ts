import { NextRequest, NextResponse } from 'next/server'
import { listPublished, PAGE_SIZE } from '::/db/post'

// GET /api/posts?page=N — 返回第 N 页的已发布文章列表（JSON）。
// 无限加载「加载更多」按钮 fetch 此端点。复用 listPublished 的 unstable_cache，
// 不直接暴露 Supabase。客户端按「返回 < PAGE_SIZE 条」判断是否到底。
export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get('page') ?? '1')

  if (!Number.isInteger(page) || page < 1) {
    return NextResponse.json({ error: 'invalid page' }, { status: 400 })
  }

  const posts = await listPublished(page)
  return NextResponse.json({ posts, page, hasMore: posts.length >= PAGE_SIZE })
}
