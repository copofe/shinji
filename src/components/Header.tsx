'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { navMenus } from '::/nav'
import { ThemeToggle } from './ThemeToggle'

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
      >
        S
      </Link>
      <div className="flex items-center">
        <nav className="flex items-stretch mr-1 md:mr-6 text-sm md:text-lg">
          {navMenus.map((menu) => {
            return (
              <div
                key={menu.href}
                className="md:mr-12 mr-2 flex-1"
              >
                <Link
                  href={menu.href}
                  aria-label={menu.name}
                  className="flex items-center p-2"
                >
                  {menu.name.toLocaleUpperCase()}
                </Link>
              </div>
            )
          })}
        </nav>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  )
}
