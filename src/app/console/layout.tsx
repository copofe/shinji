import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  if (!user || user.publicMetadata.role !== 'admin') {
    redirect('/');
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <main>{children}</main>
    </div>
  );
}
