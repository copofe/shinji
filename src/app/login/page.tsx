'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Login() {
  const supabase = createClientComponentClient()
  const { theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.replace('/')
      }
    })
  })

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="w-96 bg-background p-8 shadow-xl shadow-slate-100">
        <Auth
          supabaseClient={supabase}
          providers={[]}
          appearance={{ theme: ThemeSupa }}
          theme={theme}
        />
      </div>
    </div>
  )
}
