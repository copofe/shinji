import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '::/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shinji',
  description: 'an experienced front-end developer\'s website',
  keywords: 'front-end,gamer,shinji',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hans-CN">
      <body
        className={`${inter.className} bg-background text-foreground flex min-h-screen flex-col items-stretch relative z-10`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <footer className="flex-shrink-0 flex justify-center items-center py-4 text-sm text-muted-foreground">
            {new Date().getFullYear()} © Shinji
          </footer>
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  )
}
