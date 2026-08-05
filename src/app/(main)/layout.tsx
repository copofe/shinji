'use client'

import { AnimatePresence } from 'motion/react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import Footer from '::/components/Footer'
import Header from '::/components/Header'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      <div key="layout" className="flex-1 flex flex-col items-stretch relative z-10">
        <ProgressBar
          height="2px"
          color="hsl(var(--primary))"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <Header />
        <main className="flex-1 flex flex-col w-full">
          {children}
        </main>
        <Footer />
      </div>
    </AnimatePresence>
  )
}
