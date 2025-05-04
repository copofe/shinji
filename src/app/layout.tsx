import './globals.css'
import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import { ThemeProvider } from '::/components/ThemeProvider'
import SEO from '::/seo'

const barlow = Barlow({ subsets: ['latin'], weight: ['400'] })

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
    <html lang="zh-CN">
      <body
        className={`min-h-screen flex flex-col ${barlow.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
