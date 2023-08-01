export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="p-4 lg:p-8 flex justify-center">{children}</div>
}
