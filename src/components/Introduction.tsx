/* eslint-disable @next/next/no-img-element */

'use client'

import { motion } from 'framer-motion'
import { SocialLink } from '::/components/SocialLink'

export default function Introduction() {
  return (
    <>
      <div className="p-4 md:px-40 md:py-20 flex-1 flex flex-col justify-center items-stretch self-stretch">
        <div className="overflow-hidden">
          <div className="text-4xl md:text-9xl !leading-tight index-title">
            An FE Developer
          </div>
        </div>
        <div className="overflow-hidden text-right">
          <div className="text-4xl md:text-9xl !leading-tight index-title">
            Like Design
          </div>
        </div>
        <div className="overflow-hidden text-center">
          <div className="text-4xl md:text-9xl !leading-tight index-title">
            Also Gamer
          </div>
        </div>
      </div>
      <div className="overflow-hidden flex justify-center my-4">
        <div className="flex self-start [&>*]:mx-3 index-title">
          <SocialLink platform="github" href="https://github.com/copofe" />
          <SocialLink platform="twitter" href="https://twitter.com/Shinji_Zl" />
          <SocialLink platform="mail" href="mailto:me@shinji.me" />
        </div>
      </div>
    </>
  )
}
