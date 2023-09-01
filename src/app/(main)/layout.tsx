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
      <Header />
      <main className="flex-1 flex flex-col w-screen">{children}</main>
    </AnimatePresence>
  )
}
