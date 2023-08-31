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
      transition={{ duration: 1 }}
      className="flex justify-between items-center flex-shrink-0 h-14 px-4 md:px-12 sticky top-0 bg-background bg-opacity-40 z-50 backdrop-blur"
    >
      <Link href="/" className="text-3xl font-semibold seaborn">
        S
      </Link>
      <nav className="flex items-center">
        {navMenus.map((menu) => {
          return (
            <Link
              key={menu.href}
              href={menu.href}
              aria-label={menu.name}
              className="md:mx-8 mx-2 p-2 flex-1 flex items-center rounded-sm duration-500 hover:bg-primary hover:text-primary-foreground bg-opacity-80"
            >
              <menu.icon className="h-5 w-5" />
              <div className="ml-2 pr-1 hidden md:block text-sm">
                {menu.name}
              </div>
            </Link>
          )
        })}
      </nav>
      <div>
        <ThemeToggle />
      </div>
    </motion.header>
  )
}
