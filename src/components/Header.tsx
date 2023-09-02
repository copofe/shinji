'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { navMenus } from '::/nav'
import { ThemeToggle } from './ThemeToggle'
import { setCursorAnimate } from '::/hooks/useCursor'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-between items-center w-full h-16 px-4 md:px-12 sticky top-0 bg-background z-50"
    >
      <Link
        href="/"
        className="text-4xl font-semibold seaborn"
        onMouseEnter={() => setCursorAnimate('nav')}
        onMouseLeave={() => setCursorAnimate('default')}
      >
        S
      </Link>
      <div className="flex items-center">
        <nav className="flex items-stretch md:mr-8 text-sm md:text-lg">
          {navMenus.map((menu) => {
            return (
              <div
                key={menu.href}
                className="md:mx-6 mx-1 flex-1"
                onMouseEnter={() => setCursorAnimate('nav')}
                onMouseLeave={() => setCursorAnimate('default')}
              >
                <Link
                  href={menu.href}
                  aria-label={menu.name}
                  className="flex items-center p-2 relative z-20"
                >
                  {menu.name.toLocaleUpperCase()}
                </Link>
              </div>
            )
          })}
        </nav>
        <div
          onMouseEnter={() => setCursorAnimate('nav')}
          onMouseLeave={() => setCursorAnimate('default')}
        >
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  )
}
