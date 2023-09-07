'use client'

import { useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import Cursor from '::/components/Cursor'
import Footer from '::/components/Footer'
import Header from '::/components/Header'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const ref = useRef(null)
  return (
    <AnimatePresence>
      <div className="flex-1 flex flex-col items-stretch relative z-10" ref={ref}>
        <Header key="header" />
        <main key="main" className="flex-1 flex flex-col w-full">
          {children}
        </main>
        <Footer />
        <Cursor refEle={ref} />
      </div>
    </AnimatePresence>
  )
}
