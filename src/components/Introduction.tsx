'use client'

import { motion } from 'framer-motion'
import { SocialLink } from './SocialLink'

export default function Introduction() {
  return (
    <div className="p-4 font-mono">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl leading-9 md:text-5xl font-bold tracking-tigh mb-8 flex flex-wrap items-stretch"
      >
        <span>&lt;Introduction&nbsp;</span>
        <span className="cursor w-1 rounded bg-foreground"></span>
        <span>&nbsp;/&gt;</span>
      </motion.h1>
      <div className="md:max-w-[42em] text-base">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          I am an experienced front-end developer with expertise in Vue and
          React. I have also worked with React Native. Besides my skills in
          development, I am also a design enthusiast and a passionate gamer.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-5"
        >
          You can find me at the following
        </motion.p>
      </div>
      <div className="flex [&>*]:mr-6 mt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <SocialLink platform="github" href="https://github.com/copofe" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <SocialLink platform="twitter" href="https://twitter.com/Shinji_Zl" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <SocialLink platform="mail" href="mailto:me@shinji.me" />
        </motion.div>
      </div>
    </div>
  )
}
