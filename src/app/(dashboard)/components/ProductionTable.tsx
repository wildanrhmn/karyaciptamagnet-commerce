import OrderStatus from './OrderStatus';
import { fetchFilteredProduction } from '../data/data';
import Avatar from "@/shared/Avatar/Avatar";
import { SetOrderToProduction, SetOrderToProductionCompleted, ViewOrderDetail } from './ProductionButton';

export default async function ProductionTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const orders = await fetchFilteredProduction(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {orders && orders.length > 0 ? (
            <>
              <div className="md:hidden">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <Avatar imgUrl="" sizeClass="w-10 h-10" userName={order.customerName} />
                          <p>{order.customerName}</p>
                        </div>
                        <p className="text-sm text-gray-500">{order.products[0].productName}</p>
                      </div>
                      <OrderStatus status={order.status} />
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div>
                        <p className="text-xl font-medium">
                          {order.products[0].quantity} Pcs
                        </p>
                        <p>{order.products[0].customization}</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        {order.status === 'PRODUCTION_IN_PROGRESS' ? (
                          <SetOrderToProductionCompleted id={order.id} />
                        ) : (
                          <SetOrderToProduction order={order} />
                        )}
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
                      Total Price
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Estimated Time
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <Avatar imgUrl="" sizeClass="w-8 h-8" userName={order.customerName} />
                          <p>{order.customerName}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 space-y-5">
                        {order.customerEmail}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 space-y-5">
                        Rp. {order.totalPrice?.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 space-y-5">
                        {order.estimated ? new Date(order.estimated).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <OrderStatus status={order.status} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 flex gap-2">
                        {order.status === 'PRODUCTION_IN_PROGRESS' ? (
                          <>
                            <SetOrderToProductionCompleted id={order.id} />
                            <ViewOrderDetail order={order} />
                          </>
                        ) : (
                          <SetOrderToProduction order={order} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="text-center py-10">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Tidak ada kebutuhan produksi
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Tidak ada kebutuhan produksi.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
