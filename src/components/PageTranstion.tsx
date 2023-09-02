'use client'

import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
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
      className={`flex-1 flex flex-col w-full bg-background ${className}`}
    >
      {children}
    </motion.div>
  )
}
