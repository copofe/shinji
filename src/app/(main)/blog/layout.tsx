export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="p-4 md:p-8 flex-1 flex flex-col items-center">{children}</div>
}
