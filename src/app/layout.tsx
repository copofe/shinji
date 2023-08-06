import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '::/components/ThemeProvider'
import { AppCommand } from '::/components/AppCommand'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shinji',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hans-CN">
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="//unpkg.com/heti/umd/heti.min.css"></link>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col items-stretch bg-background text-foreground">
            {children}
            <footer className="flex-shrink-0 flex justify-center items-center py-4 text-sm opacity-60">
              {new Date().getFullYear()} © Shinji
            </footer>
          </div>
          <AppCommand />
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  )
}
