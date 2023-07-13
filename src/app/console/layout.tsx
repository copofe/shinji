import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function ConsoleLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  if (!user || user.publicMetadata.role !== 'admin') {
    redirect('/');
  }

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
