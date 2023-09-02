'use client'

import { motion } from 'framer-motion'
import { SocialLink } from '::/components/SocialLink'

export default function Introduction() {
  return (
    <>
      <div className="p-4 md:px-40 md:py-20 flex-1 flex flex-col justify-center items-stretch self-stretch">
        <div className="overflow-hidden">
          <div className="text-6xl md:text-9xl !leading-tight move-up">
            Professional Developer
          </div>
        </div>
        <div className="overflow-hidden flex justify-end items-baseline">
          <motion.div initial={{ opacity: 0, x: '15%' }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.25, ease: 'linear', duration: 0.75 }} className="text-xl font-thin mr-4 text-gray-400">
            特に「侘び寂び」，原始的な美意識
          </motion.div>
          <div className="text-6xl md:text-9xl !leading-tight move-up">
            Like Design
          </div>
        </div>
        <div className="overflow-hidden flex justify-center items-baseline">
          <div className="text-6xl md:text-9xl !leading-tight move-up mr-4">
            Also Gamer
          </div>
          <motion.div initial={{ opacity: 0, x: '-15%' }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.25, ease: 'linear', duration: 0.75 }} className="text-xl font-thin text-gray-400">嗨，玩游戏的都是朋友</motion.div>
        </div>
      </div>
      <div className="overflow-hidden flex justify-center my-4">
        <div className="flex self-start [&>*]:mx-3 move-up">
          <SocialLink platform="github" href="https://github.com/copofe" />
          <SocialLink platform="twitter" href="https://twitter.com/Shinji_Zl" />
          <SocialLink platform="mail" href="mailto:me@shinji.me" />
        </div>
      </div>
    </>
  )
}
