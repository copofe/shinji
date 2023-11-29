'use client'

import { AnimatePresence } from 'framer-motion'
import Footer from '::/components/Footer'
import Header from '::/components/Header'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      <div className="flex-1 flex flex-col items-stretch relative z-10">
        <Header key="header" />
        <main key="main" className="flex-1 flex flex-col w-full">
          {children}
        </main>
        <Footer />
      </div>
    </AnimatePresence>
  )
}
