import { UpdateOrder, DeleteOrder } from './Buttons';
import OrderStatus from './OrderStatus';
import { formatDateToLocal, formatCurrency } from './utils';
import { fetchFilteredSubmissions } from '../data/data';
import Avatar from "@/shared/Avatar/Avatar";

export default async function SubmissionsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const submissions = await fetchFilteredSubmissions(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {submissions?.map((submission: any) => (
              <div
                key={submission.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Avatar imgUrl={submission.image_url} sizeClass="w-10 h-10" userName={submission.name} />
                      <p>{submission.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{submission.email}</p>
                  </div>
                  <OrderStatus status={submission.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {submission.amount ? `Rp. ${submission.amount.toLocaleString()}` : '-'}
                    </p>
                    <p>{formatDateToLocal(submission.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateOrder id={submission.id} />
                    <DeleteOrder id={submission.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {submissions?.map((submission: any) => (
                <tr
                  key={submission.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Avatar imgUrl={submission.image_url} sizeClass="w-8 h-8" userName={submission.name} />
                      <p>{submission.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {submission.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {submission.amount ? `Rp. ${submission.amount.toLocaleString()}` : '-'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(submission.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <OrderStatus status={submission.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateOrder id={submission.id} />
                      <DeleteOrder id={submission.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
