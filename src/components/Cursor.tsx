'use client'

import { motion, type AnimationProps } from 'framer-motion'

const spring = {
  type: false,
}

export default function Cursor<T extends AnimationProps['variants']>({
  variants,
  animate,
}: {
  variants: T
  animate: string
}) {
  return (
    <motion.div
      variants={variants}
      className="fixed mix-blend-difference pointer-events-none z-[10000] will-change-auto sm:hidden"
      animate={animate}
      transition={spring}
    >
      <div className='w-full h-full bg-white -translate-x-1/2 -translate-y-1/2 rounded-full'></div>
    </motion.div>
  )
}
