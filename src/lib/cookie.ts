import { REFRESH_TOKEN, TOKEN_KEY } from '::/app/const';
import { Session } from '@supabase/supabase-js'
import { cookies } from 'next/dist/client/components/headers';

export const updateAuth = (session: Session | null) => {
  const maxAge = 100 * 365 * 24 * 60 * 60
  document.cookie = `${TOKEN_KEY}=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
  document.cookie = `${REFRESH_TOKEN}=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
}

export const expireAuth = () => {
  const expires = new Date(0).toUTCString()
  document.cookie = `${TOKEN_KEY}=; path=/; expires=${expires}; SameSite=Lax; secure`
  document.cookie = `${REFRESH_TOKEN}=; path=/; expires=${expires}; SameSite=Lax; secure`
}

export const get = (key: string) => {
  return cookies().get(key)
}