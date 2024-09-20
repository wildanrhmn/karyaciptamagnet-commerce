import { PencilIcon, PlusIcon, TrashIcon, PlayIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteOrder, setOrderStatusToProduction, setOrderStatusToProductionCompleted } from '../data/action';

export function CreateOrder() {
  return (
    <Link
      href={"/dashboard/submissions/create" as any}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Order</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateOrder({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/submissions/${id}/edit` as any}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteOrder({ id }: { id: string }) {
  const deleteOrderWithId = deleteOrder.bind(null, id);
  return (
    <>
      <form action={deleteOrderWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}

export function SetOrderToProduction({ id }: { id: string }) {
  const setOrderToProductionWithId = setOrderStatusToProduction.bind(null, id);
  return (
    <form action={setOrderToProductionWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Set to Production</span>
        <PlayIcon className="w-5" />
      </button>
    </form>
  );
}

export function SetOrderToProductionCompleted({ id }: { id: string }) {
  const setOrderToProductionCompletedWithId = setOrderStatusToProductionCompleted.bind(null, id);
  return (
    <form action={setOrderToProductionCompletedWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Set to Production Completed</span>
        <CheckCircleIcon className="w-5" />
      </button>
    </form>
  );
}
