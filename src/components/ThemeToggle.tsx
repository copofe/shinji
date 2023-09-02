'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { setTheme } = useTheme()
  React.useEffect(() => {
    setTheme('light')
  }, [])

  return (
    <div className="relative">
      <Sun
        className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        onClick={() => setTheme('dark')}
      />
      <Moon
        className="absolute h-6 w-6 left-0 top-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        onClick={() => setTheme('light')}
      />
    </div>
  )
}
