'use client'

import Header from '::/components/Header'
import { AnimatePresence } from 'framer-motion'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      <Header key="header" />
      <main key="main" className="flex-1 flex flex-col">
        {children}
      </main>
    </AnimatePresence>
  )
}
