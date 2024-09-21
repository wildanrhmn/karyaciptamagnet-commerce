// app/invoice/[orderId]/InvoiceContent.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Image from 'next/image';

interface InvoiceData {
  invoiceId: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  items: Array<{ name: string; quantity: number; price: number; imageUrl: string }>;
  totalPrice: number;
  shippingAddress: string;
}

export default function InvoiceContent({ orderId }: { orderId: string }) {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const componentRef = useRef(null);

  useEffect(() => {
    fetch(`/api/orders/${orderId}/invoice`)
      .then(response => response.json())
      .then(data => setInvoiceData(data))
      .catch(error => console.error('Error fetching invoice:', error));
  }, [orderId]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!invoiceData) return <div>Loading...</div>;

  return (
    <>
      <div ref={componentRef} className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
        <h1 className="text-3xl font-bold mb-6 text-blue-600 mt-5">Invoice</h1>
        <div className="mb-6 space-y-3">
          <p className="text-gray-700"><strong>Invoice ID:</strong> {invoiceData.invoiceId}</p>
          <p className="text-gray-700"><strong>Order ID:</strong> {invoiceData.orderId}</p>
          <p className="text-gray-700"><strong>Date:</strong> {new Date(invoiceData.orderDate).toLocaleDateString()}</p>
        </div>
        <div className="mb-6 space-y-3">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Customer Details</h2>
          <p className="text-gray-700"><strong>Name:</strong> {invoiceData.customerName}</p>
          <p className="text-gray-700"><strong>Email:</strong> {invoiceData.customerEmail}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Items</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-blue-100">
                <th className="text-left p-2">Item</th>
                <th className="text-right p-2">Quantity</th>
                <th className="text-right p-2">Price</th>
                <th className="text-right p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 flex items-center">
                    <Image src={item.imageUrl} alt={item.name} width={50} height={50} className="mr-2 rounded" />
                    {item.name}
                  </td>
                  <td className="text-right p-2">{item.quantity}</td>
                  <td className="text-right p-2 text-green-600">Rp {item.price.toLocaleString()}</td>
                  <td className="text-right p-2 text-green-600">Rp {(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-green-600">Total: Rp {invoiceData.totalPrice.toLocaleString()}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Shipping Address</h2>
          <p className="text-gray-700">{invoiceData.shippingAddress}</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <ButtonPrimary onClick={handlePrint}>
          Save as PDF / Print Invoice
        </ButtonPrimary>
      </div>
    </>
  );
}