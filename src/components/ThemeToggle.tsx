'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '::/components/ThemeProvider'

// next-themes 在客户端才能解析出实际主题，挂载前直接占位避免水合不匹配。
// 主题选择完全交给用户，组件挂载时不干预。
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-5 h-5 md:h-6 md:w-6" />
  }

  const isDark = resolvedTheme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <button
      type="button"
      className="relative flex items-center justify-center w-5 h-5 md:w-6 md:h-6 cursor-pointer"
      aria-label="切换主题"
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      <Sun
        className="absolute inset-0 w-full h-full rotate-0 scale-100 transition-transform duration-200 dark:-rotate-90 dark:scale-0"
        aria-hidden="true"
      />
      <Moon
        className="absolute inset-0 w-full h-full rotate-90 scale-0 transition-transform duration-200 dark:rotate-0 dark:scale-100"
        aria-hidden="true"
      />
    </button>
  )
}
