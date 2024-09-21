// app/invoice/[orderId]/page.tsx

import { Suspense } from 'react';
import InvoiceContent from './InvoiceContent';

export default function InvoicePage({ params }: { params: { orderId: string } }) {
  return (
    <div className="container mx-auto p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <InvoiceContent orderId={params.orderId} />
      </Suspense>
    </div>
  );
}