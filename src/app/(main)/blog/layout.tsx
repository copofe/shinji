import PageTranstion from '::/components/PageTranstion'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageTranstion>
      {children}
    </PageTranstion>
  )
}
