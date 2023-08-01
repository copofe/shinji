import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '::/components/theme-provider'
import Script from 'next/script'

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
    <html lang="zh-CN">
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="//unpkg.com/heti/umd/heti.min.css"></link>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col items-stretch overflow-hidden bg-background text-foreground">
            {children}
            <footer className="flex-shrink-0 flex justify-center py-4">
              <div>{new Date().getFullYear()} © Shinji</div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
      <Analytics />
      <Script src="//unpkg.com/heti/umd/heti-addon.min.js" strategy='afterInteractive'></Script>
      <Script id='heti-script' strategy='lazyOnload'>
        {'const heti = new Heti(\'.heti\'); heti.autoSpacing()'}
      </Script>
    </html>
  )
}
