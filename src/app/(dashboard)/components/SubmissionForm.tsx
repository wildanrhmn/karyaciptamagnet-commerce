'use client';

import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from './Button';
import { updateOrder } from '../data/action';
import Image from 'next/image';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';

type UpdateOrderState = {
  errors?: {
    [key: string]: string[] | undefined;
  };
  message: string | null;
};

export default function SubmissionForm({ order }: { order: any }) {
  const initialState: UpdateOrderState = { message: null, errors: {} };
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const result = await updateOrder(initialState, formData);
    if (result.message === "Order updated successfully.") {
      toast.success("Order updated successfully");
      router.push('/dashboard/submissions');
    } else {
      toast.error(result.message || "An error occurred");
    }
  };
  
  return (
    <form action={handleSubmit} className="space-y-6">
      <input type="hidden" name="orderId" value={order.orderId} />
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {order.cart.items.map((item: any) => (
          <div key={item.cartItemId} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 h-full">
                {item.product.ProductImages && item.product.ProductImages.length > 0 && (
                  <Image
                    src={item.product.ProductImages[0].imageUrl}
                    alt={item.product.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                )}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.product.name}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <p className="text-sm text-gray-600">Quantity: <span className="font-medium text-gray-900">{item.quantity}</span></p>
                  <p className="text-sm text-gray-600">Customization: <span className="font-medium text-gray-900">{item.customization}</span></p>
                </div>
                <div className="mt-4">
                  <label htmlFor={`finalPrice-${item.cartItemId}`} className="block text-sm font-medium text-gray-700 mb-2">
                    Final Price
                  </label>
                  <div className="relative rounded-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <CurrencyDollarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id={`finalPrice-${item.cartItemId}`}
                      name={`finalPrice-${item.cartItemId}`}
                      type="number"
                      step="0.01"
                      defaultValue={item.finalPrice || ''}
                      placeholder="Enter final price"
                      className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-4">
        <Link
          href="/dashboard/submissions"
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </Link>
        <Button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Update Final Prices
        </Button>
      </div>
    </form>
  );
}