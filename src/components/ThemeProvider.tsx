'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  useTheme,
} from 'next-themes'

// next-themes v0.4 不支持关闭 localStorage 持久化（#295 待 v0.5 实现）。
// 在水合前内联清除存储的主题，使每次加载都 fallback 到 defaultTheme="system"。
// 用户可在当前会话内自由切换，刷新即回归系统主题。
export function NoPersistThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: 'localStorage.removeItem("theme")',
      }}
    />
  )
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}

export { useTheme }
