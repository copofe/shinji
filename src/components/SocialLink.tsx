'use client'

import Link, { type LinkProps } from 'next/link'
import { type JSX } from 'react'

import {
  type IconProps,
  GitHubIcon,
  MailIcon,
  TwitterIcon,
} from '::/assets/icons'

type Platform = 'github' | 'twitter' | 'mail'

const icons: Record<Platform, (props: IconProps) => JSX.Element> = {
  github: GitHubIcon,
  twitter: TwitterIcon,
  mail: MailIcon,
}

export function SocialLink({
  platform,
  href,
  ...props
}: { platform: Platform } & LinkProps) {
  const Icon = icons[platform]

  return (
    <Link
      className="text-muted-foreground hover:text-foreground transition-colors"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      prefetch={false}
      aria-label={platform}
      {...props}
    >
      <Icon className="h-5 w-5" />
    </Link>
  )
}
