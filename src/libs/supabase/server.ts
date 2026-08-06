import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Database } from '::/db'

// 公开读、无登录态的博客：数据访问用无 cookie 的直连 client。
// 不走 SSR 会话机制（cookieStore）——既适配 unstable_cache 回调
// （其内部禁止 cookies()/headers()），也省掉无用的会话刷新开销
// （middleware 已移除，会话刷新逻辑此前已是孤儿）。
export function createClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
