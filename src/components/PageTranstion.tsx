'use client'

import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 0, y: 100 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 100 },
}

export default function PageTranstion({
  children,
  className,
}: {
  children: React.ReactNode
  className: string
}) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      className={`flex-1 flex flex-col self-center ${className}`}
    >
      {children}
    </motion.div>
  )
}
