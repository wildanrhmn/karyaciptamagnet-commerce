import FormEditUser from '@/app/(dashboard)/components/FormEditUser';
import Breadcrumbs from '@/app/(dashboard)/components/Breadcrumbs';
import { fetchUserById } from '@/app/(dashboard)/data/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const user = await fetchUserById(id);

  if(!user){
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/users' },
          {
            label: 'Edit User',
            href: `/dashboard/users/${id}/edit`,
            active: true,
          },
        ]}
      />
      <FormEditUser user={user} />
    </main>
  );
}