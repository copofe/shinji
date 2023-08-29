/* eslint-disable @next/next/no-script-component-in-head */
import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '::/components/ThemeProvider'
import SEO from '::/seo'
import Head from 'next/head';
import Script from 'next/script';

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hans-CN">
      <Script async src="https://analytics.umami.is/script.js" data-website-id="e58f234f-3420-47a6-ad58-59403c68749b"></Script>
      <body className="min-h-screen flex flex-col items-stretch relative z-10">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <footer className="flex-shrink-0 flex justify-center items-center py-4 text-sm text-muted-foreground">
            {new Date().getFullYear()} © Shinji
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
