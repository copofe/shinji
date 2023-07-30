'use client'

import { supabase } from '::/db'
import { useEffect } from 'react'
import { REFRESH_TOKEN, TOKEN_KEY } from '../const'
import { cookie } from '::/lib';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const verifyIdentify = async () => {
  }
  useEffect(() => {
    verifyIdentify()
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'TOKEN_REFRESHED') {
        cookie.updateAuth(session)
      }
    })
  })
  return children
}
