'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export default function Footer() {
  // 年份推迟到客户端 mount 后读取：cacheComponents 禁止预渲染期出现 new Date()
  // 这类不稳定值。Footer 本身有 1.25s 淡入延迟，年份填入早于可见，无闪烁。
  const [year, setYear] = useState<number>()
  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.25 }}
      className="shrink-0 flex justify-center items-center py-4 text-sm bg-background text-muted-foreground"
    >
      {year} © Shinji
    </motion.footer>
  )
}
