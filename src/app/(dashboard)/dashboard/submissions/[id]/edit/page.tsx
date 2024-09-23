import Form from '@/app/(dashboard)/components/SubmissionForm';
import Breadcrumbs from '@/app/(dashboard)/components/Breadcrumbs';
import { fetchOrderById } from '@/app/(dashboard)/data/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const order = await fetchOrderById(id);

  if(!order){
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Pengajuan Harga', href: '/dashboard/submissions' },
          {
            label: 'Edit Pengajuan',
            href: `/dashboard/submissions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form order={order} />
    </main>
  );
}