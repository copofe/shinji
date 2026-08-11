import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '::/components/ThemeProvider'
import { NoPersistThemeScript } from '::/components/NoPersistThemeScript'
import SEO from '::/seo'

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
      <body className="min-h-screen flex flex-col">
        <NoPersistThemeScript />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
