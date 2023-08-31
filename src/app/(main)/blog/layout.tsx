import PageTranstion from '::/components/PageTranstion'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageTranstion className="p-4 md:p-8 items-center">
      {children}
    </PageTranstion>
  )
}
