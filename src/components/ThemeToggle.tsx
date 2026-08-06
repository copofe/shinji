'use client'

import * as React from 'react'
import { useTheme } from '::/components/ThemeProvider'
import { Moon, Sun } from 'lucide-react'

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

  return (
    <div className="relative cursor-pointer" aria-label="切换主题">
      <Sun
        className="w-5 h-5 md:h-6 md:w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        onClick={() => setTheme('dark')}
        style={{ display: isDark ? 'none' : 'block' }}
      />
      <Moon
        className="absolute left-0 top-0 w-5 h-5 md:h-6 md:w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        onClick={() => setTheme('light')}
        style={{ display: isDark ? 'block' : 'none' }}
      />
    </div>
  )
}
