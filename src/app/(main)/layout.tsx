import { ThemeToggle } from '::/components/ThemeToggle'
import Link from 'next/link'
import { navMenus } from '::/nav'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="flex justify-between items-center flex-shrink-0 h-14 px-4 lg:px-12 sticky top-0 bg-background bg-opacity-40 z-50 backdrop-blur">
        <div className="text-3xl font-semibold seaborn">
          <Link href="/">S</Link>
        </div>
        <nav className="flex items-center">
          {navMenus.map((menu) => {
            return (
              <Link
                key={menu.href}
                href={menu.href}
                aria-label={menu.name}
                className="lg:mx-8 mx-4 flex items-center"
              >
                <menu.icon className="h-5 w-5" />
                <div className="ml-2 w-[4em] hidden lg:block text-sm">
                  {menu.name}
                </div>
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
