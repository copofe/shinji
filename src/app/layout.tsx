import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '::/components/theme-provider'
import { ThemeToggle } from '::/components/theme-toggle'
import { DoorOpen, Lightbulb, Newspaper, Package, Terminal } from 'lucide-react'
import Link from 'next/link'
import { ElegantTooltip } from '::/components/ui'
import { supabase } from '::/db'
import { cookie } from '::/lib'
import { TOKEN_KEY } from './const'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shinji',
}

const navMenus = [
  {
    title: 'Home',
    icon: DoorOpen,
    href: '/',
  },
  {
    title: 'Blog',
    icon: Newspaper,
    href: '/blog',
  },
  {
    title: 'Project',
    icon: Package,
    href: '/project',
  },
  {
    title: 'Memo',
    icon: Lightbulb,
    href: '/memo',
  },
]

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const menus = [...navMenus]
  const {
    data: { user },
  } = await supabase.auth.getUser(cookie.get(TOKEN_KEY)?.value)
  if (user?.role === 'authenticated') {
    menus.push({
      title: 'Console',
      icon: Terminal,
      href: '/console',
    })
  }
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex h-screen items-stretch overflow-hidden bg-background text-foreground">
            <div className="border-r flex flex-col justify-between">
              <nav className="flex flex-col items-stretch text-center w-16">
                <div className="text-3xl font-semibold h-16 flex justify-center items-center border-b">
                  <Link href="/" prefetch>.S</Link>
                </div>
                {menus.map((menu) => {
                  return (
                    <ElegantTooltip
                      key={menu.href}
                      content={menu.title}
                      contentProps={{ side: 'right' }}
                    >
                      <Link
                        href={menu.href}
                        className="h-16 flex flex-col items-center justify-center cursor-pointer"
                      >
                        <menu.icon className="w-5 h-5" />
                      </Link>
                    </ElegantTooltip>
                  )
                })}
              </nav>
            </div>
            <main className="flex-1 flex flex-col overflow-y-auto">
              <header className="flex justify-between items-center flex-shrink-0 h-16">
                <div></div>
                <div className="px-4">
                  <ThemeToggle />
                </div>
              </header>
              <div className="flex-1">
                {children}
                <footer className="flex-shrink-0 flex justify-center py-4">
                  <div>{new Date().getFullYear()} © Shinji</div>
                </footer>
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  )
}
