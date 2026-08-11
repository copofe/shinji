'use client'

import { AnimatePresence, MotionConfig } from 'motion/react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import Footer from '::/components/Footer'
import { ThemeToggle } from '::/components/ThemeToggle'
import { ShapeProvider } from '::/libs/shape-context'
import { SizeProvider } from '::/libs/size-context'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      <MotionConfig reducedMotion="user">
        <ShapeProvider defaultShape="rounded">
          <SizeProvider>
            <div key="layout" className="flex-1 flex flex-col items-stretch relative z-10">
          <ProgressBar
            height="2px"
            color="hsl(var(--primary))"
            options={{ showSpinner: false }}
            shallowRouting
          />
          <main className="flex-1 flex flex-col w-full">
            {children}
          </main>
          <Footer />
            </div>
            <div className="fixed top-4 right-4 z-50">
              <ThemeToggle />
            </div>
          </SizeProvider>
        </ShapeProvider>
      </MotionConfig>
    </AnimatePresence>
  )
}
