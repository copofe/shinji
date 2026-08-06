'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  useTheme,
} from 'next-themes'

// 主题配置固化为项目默认:类名策略、跟随系统、system 回退。
// 调用点不再传这些 props——主题的唯一归宿在此。
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

// re-export:主题相关消费统一从此模块接入,不直接依赖 next-themes。
export { useTheme }
