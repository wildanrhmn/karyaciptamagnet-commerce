import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OrderStatus({ status }: { status: string }) {
  const statusInfo = {
    AWAITING_PRICE: {
      label: 'Menunggu Harga',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      icon: ClockIcon,
    },
    AWAITING_PAYMENT: {
      label: 'Menunggu Pembayaran',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      icon: ClockIcon,
    },
    AWAITING_SHIPMENT: {
      label: 'Menunggu Pengiriman',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      icon: ClockIcon,
    },
    ON_DELIVERY: {
      label: 'Dalam Pengiriman',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      icon: CheckIcon,
    },
  };

  const currentStatus = statusInfo[status as keyof typeof statusInfo];

  if (!currentStatus) {
    return null;
  }

  const { label, bgColor, textColor, icon: Icon } = currentStatus;

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        bgColor,
        textColor
      )}
    >
      {label}
      <Icon className="ml-1 w-4" />
    </span>
  );
}
