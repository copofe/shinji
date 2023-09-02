'use client'

import { useCursor } from '::/hooks/useCursor';
import { motion } from 'framer-motion'

const spring = {
  type: false,
}

export default function Cursor() {
  const { variants, cursorVariant } = useCursor()
  return (
    <motion.div
      variants={variants}
      className="fixed mix-blend-difference pointer-events-none z-[10000] will-change-auto sm:hidden"
      animate={cursorVariant}
      transition={spring}
    >
      <div className='w-full h-full bg-white -translate-x-1/2 -translate-y-1/2 rounded-full'></div>
    </motion.div>
  )
}
