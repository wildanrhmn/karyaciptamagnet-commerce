import FormCreateUser from '@/app/(dashboard)/components/FormCreateUser';
import Breadcrumbs from '@/app/(dashboard)/components/Breadcrumbs';
 
export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/users' },
          {
            label: 'Create User',
            href: `/dashboard/users/create`,
            active: true,
          },
        ]}
      />
      <FormCreateUser />
    </main>
  );
}