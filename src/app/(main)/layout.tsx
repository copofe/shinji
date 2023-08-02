import { ThemeToggle } from '::/components/theme-toggle'
import { Lightbulb, Newspaper, Package, Smile } from 'lucide-react'
import Link from 'next/link'

const navMenus = [
  {
    name: 'Blog',
    icon: Newspaper,
    href: '/blog',
  },
  {
    name: 'Project',
    icon: Package,
    href: '/project',
  },
  {
    name: 'Memo',
    icon: Lightbulb,
    href: '/memo',
  },
  {
    name: 'Friend',
    icon: Smile,
    href: '/friend',
  },
]

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="flex justify-between items-center flex-shrink-0 h-14 px-6 lg:px-12 border-b sticky top-0 bg-background bg-opacity-80 z-50 backdrop-blur">
        <div className="text-3xl font-semibold flex justify-center items-center seaborn">
          <Link href="/">S</Link>
        </div>
        <nav className="flex items-center">
          {navMenus.map((menu) => {
            return (
              <Link
                key={menu.href}
                href={menu.href}
                className="lg:mx-8 mx-4 flex items-center group"
              >
                <menu.icon className="h-5 w-5" />
                <span className="ml-2 hidden lg:block text-sm scale-0 -translate-x-full transition-all group-hover:scale-100 group-hover:translate-x-0">
                  {menu.name}
                </span>
              </Link>
            )
          })}
        </nav>
        <div>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 flex flex-col text-sm">{children}</main>
    </>
  )
}
