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
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col items-stretch relative z-10">
            {children}
            <footer className="flex-shrink-0 flex justify-center items-center py-4 text-sm text-muted-foreground">
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
