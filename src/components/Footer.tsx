'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.25 }}
      className="flex-shrink-0 flex justify-center items-center py-4 text-sm bg-background text-muted-foreground"
    >
      {new Date().getFullYear()} © Shinji
    </motion.footer>
  )
}
