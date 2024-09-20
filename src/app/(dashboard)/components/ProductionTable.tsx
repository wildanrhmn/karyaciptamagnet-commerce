import { SetOrderToProduction, SetOrderToProductionCompleted } from './Buttons';
import OrderStatus from './OrderStatus';
import { fetchFilteredProduction } from '../data/data';
import Avatar from "@/shared/Avatar/Avatar";

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
          <div className="md:hidden">
            {orders?.map((order, index) => (
              <div
                key={index}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Avatar imgUrl="" sizeClass="w-10 h-10" userName={order.customerName} />
                      <p>{order.customerName}</p>
                    </div>
                    <p className="text-sm text-gray-500">{order.productName}</p>
                  </div>
                  <OrderStatus status={order.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {order.quantity} Pcs
                    </p>
                    <p>{order.customization}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    {order.status === 'PRODUCTION_IN_PROGRESS' ? (
                      <SetOrderToProductionCompleted id={order.id} />
                    ) : (
                      <SetOrderToProduction id={order.id} />
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
                  Product
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Quantity
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Customization
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
              {orders?.map((order, index) => (
                <tr
                  key={index}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Avatar imgUrl="" sizeClass="w-8 h-8" userName={order.customerName} />
                      <p>{order.customerName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {order.productName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {order.quantity} Pcs
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {order.customization}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <OrderStatus status={order.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {order.status === 'PRODUCTION_IN_PROGRESS' ? (
                      <SetOrderToProductionCompleted id={order.id} />
                    ) : (
                      <SetOrderToProduction id={order.id} />
                    )}
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
