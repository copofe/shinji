'use client'

import './globals.css'
import './prism.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { useRef } from 'react'
import { Barlow } from 'next/font/google'
import { ThemeProvider } from '::/components/ThemeProvider'
import SEO from '::/seo'
import Cursor from '::/components/Cursor'
import { useCursor } from '::/hooks/useCursor'
import Footer from '::/components/Footer';

const barlow = Barlow({ subsets: ['latin'], weight: ['400'] })

const { title, description } = SEO
export const metadata: Metadata = {
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
  const ref = useRef(null)
  const { variants, cursorVariant } = useCursor(ref)

  return (
    <html lang="zh-CN">
      <Script
        async
        src="https://analytics.umami.is/script.js"
        data-website-id="e58f234f-3420-47a6-ad58-59403c68749b"
      ></Script>
      <body
        className={`min-h-screen flex flex-col items-stretch relative z-10 ${barlow.className}`}
        ref={ref}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Cursor variants={variants} animate={cursorVariant} />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
