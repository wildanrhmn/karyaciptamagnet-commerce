import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
  } from '@heroicons/react/24/outline';
import { lusitana } from './Fonts';
import { fetchCardData } from '../data/data';
  
  const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
  };
  
  export default async function CardWrapper() {
    const cardData = await fetchCardData();
    return (
      <>
        <Card title="Menunggu Harga" value={cardData.totalAwaitingPrice} type="pending" />
        <Card title="Menunggu Pembayaran" value={cardData.totalAwaitingPayment} type="collected" />
        <Card title="Total Pesanan" value={cardData.numberOfOrders} type="invoices" />
        <Card
          title="Total Pelanggan"
          value={cardData.numberOfCustomers}
          type="customers"
        />
      </>
    );
  }
  
  export function Card({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'invoices' | 'customers' | 'pending' | 'collected';
  }) {
    const Icon = iconMap[type];
  
    const cardColors = {
      invoices: 'bg-blue-50',
      customers: 'bg-green-50',
      pending: 'bg-yellow-50',
      collected: 'bg-purple-50',
    };
  
    const iconColors = {
      invoices: 'text-blue-700',
      customers: 'text-green-700',
      pending: 'text-yellow-700',
      collected: 'text-purple-700',
    };
  
    return (
      <div className={`rounded-xl ${cardColors[type]} p-2 shadow-sm`}>
        <div className="flex p-4">
          {Icon ? <Icon className={`h-5 w-5 ${iconColors[type]}`} /> : null}
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        >
          {value}
        </p>
      </div>
    );
  }