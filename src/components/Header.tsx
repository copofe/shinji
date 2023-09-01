'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { navMenus } from '::/nav'
import { ThemeToggle } from './ThemeToggle'
import { usePathname } from 'next/navigation'

export default function Header() {
  const path = usePathname()
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex justify-between items-center flex-shrink-0 h-14 px-4 md:px-12 sticky top-0 bg-background bg-opacity-10 z-50 backdrop-blur-lg"
    >
      <Link href="/" className="text-3xl font-semibold seaborn">
        S
      </Link>
      <nav className="flex items-center">
        {navMenus.map((menu) => {
          return (
            <div key={menu.href} className="md:mx-8 mx-2 flex-1 hover-highlight">
              <Link
                href={menu.href}
                aria-label={menu.name}
                className='flex items-center p-2 relative z-20'
              >
                <menu.icon className="h-5 w-5" />
                <div className="ml-2 pr-1 hidden md:block text-sm">
                  {menu.name.toLocaleUpperCase()}
                </div>
              </Link>
            </div>
          )
        })}
      </nav>
      <div>
        <ThemeToggle />
      </div>
    </motion.header>
  )
}
