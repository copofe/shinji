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

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? 'light' : 'dark'
    // 降级：浏览器不支持，或用户偏好减少动态效果 → 直接切换，不走扩散动画。
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (typeof document.startViewTransition !== 'function' || reduceMotion) {
      setTheme(next)
      return
    }

    // 以点击位置为圆心，计算扩散到对角所需的最大半径。
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    const transition = document.startViewTransition(() => {
      setTheme(next)
    })

    transition.ready.then(() => {
      // 两个方向都让新视图从点击点向外扩散（reveal 目标主题）。
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        { clipPath },
        {
          duration: 400,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
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
