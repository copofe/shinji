import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Database } from './db/types'
import { TOKEN_KEY } from './app/const';

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const { nextUrl, cookies } = req
  if (nextUrl.pathname.startsWith('/api')) {
    return res
  }
  if (nextUrl.pathname.startsWith('/console')) {
    if (nextUrl.pathname === '/console/login') {
      return res
    }
    const supabase = createMiddlewareClient<Database>({ req, res })
    const {
      data: { user },
    } = await supabase.auth.getUser(cookies.get(TOKEN_KEY)?.value)
    if (user?.role !== 'authenticated') {
      nextUrl.pathname = '/console/login'
      return NextResponse.redirect(nextUrl)
    }
  }
  return res
}
