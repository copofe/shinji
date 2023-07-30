export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="sm:px-8 flex justify-center">
      <article className="max-w-4xl w-full lg:px-8">{children}</article>
    </div>
  );
}
