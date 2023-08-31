import { ThemeToggle } from '::/components/ThemeToggle'
import Link from 'next/link'
import { navMenus } from '::/nav'
import Header from '::/components/Header'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col text-sm">{children}</main>
    </>
  )
}
