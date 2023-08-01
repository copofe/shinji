'use client'

import Link, { type LinkProps } from 'next/link'
import React from 'react'

import {
  type IconProps,
  BilibiliIcon,
  GitHubIcon,
  MailIcon,
  TwitterIcon,
} from '::/assets/icons'

type IconType = (props: IconProps) => JSX.Element
type Platform = 'github' | 'twitter' | 'bilibili' | 'mail'

const iconMapper: { [key in Platform]: IconType } = {
  github: GitHubIcon,
  twitter: TwitterIcon,
  bilibili: BilibiliIcon,
  mail: MailIcon
}
export function SocialLink({
  platform,
  href,
  ...props
}: { platform: Platform } & LinkProps) {

  const Icon = iconMapper[platform]

  return (
    <Link
      className="group -m-1 p-1"
      href={href}
      target="_blank"
      prefetch={false}
      aria-label={platform}
      {...props}
    >
      <Icon className="h-5 w-5 text-zinc-400 transition group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200" />
    </Link>
  )
}
