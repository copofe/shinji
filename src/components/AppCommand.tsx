'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '::/components/ui'
import { navMenus } from '::/nav'

export function AppCommand() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }

      if (e.key === 'l' && e.altKey) {
        e.preventDefault()
        router.push('/login')
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const onSelectNav = (href: string) => {
    router.push(href)
    setOpen(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandGroup heading="Navs">
          {navMenus.map((nav) => {
            return (
              <CommandItem
                key={nav.href}
                onSelect={() => onSelectNav(nav.href)}
                onFocus={() => router.prefetch(nav.href)}
              >
                <nav.icon className="mr-2 h-4 w-4" />
                <span>{nav.name}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Auth">
          <CommandItem
            onSelect={() => onSelectNav('/login')}
            onFocus={() => router.prefetch('/login')}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Login</span>
            <CommandShortcut>Alt+L</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
