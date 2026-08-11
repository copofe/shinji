import './globals.css'
import type { Metadata } from 'next'
import { Lora } from 'next/font/google'
import { ThemeProvider } from '::/components/ThemeProvider'
import { NoPersistThemeScript } from '::/components/NoPersistThemeScript'
import SEO from '::/seo'

// 衬线字体仅用于文章正文内的 <em>（拉丁字符斜体），不替换正文字体。
const lora = Lora({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500'],
  variable: '--font-serif',
  display: 'swap',
})

const { title, description } = SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://shinji.me'),
  title,
  description,
  keywords: 'front-end,gamer,shinji',
  twitter: {
    title,
    description,
  },
  openGraph: {
    type: 'website',
    siteName: title,
    title,
    description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`min-h-screen flex flex-col ${lora.variable}`}
      >
        <NoPersistThemeScript />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
