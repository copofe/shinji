import PageTransition from '::/components/PageTransition'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageTransition>
      {children}
    </PageTransition>
  )
}
