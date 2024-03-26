'use client';
import { Status } from '@/app/orders/chip-status';
import { SupabaseOrderRepository } from '@/app/orders/order-repository';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';

interface OrderStatusDropdownProps {
  currentStatus: Status;
  orderId: string;
}

const repository = new SupabaseOrderRepository();

const ChangeOrderStatus: React.FC<OrderStatusDropdownProps> = ({
  currentStatus,
  orderId,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<Status>(currentStatus);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedStatusValue = event.target.value;
    setSelectedStatus(selectedStatusValue as Status);
    startTransition(async () => {
      await repository.changeOrderStatus({
        status: selectedStatusValue as Status, // Use selectedStatusValue here
        orderId: orderId,
      });
    });

    router.refresh();
  };

  return (
    <select
      value={selectedStatus}
      onChange={handleStatusChange}
      disabled={isPending}
      aria-disabled={isPending}
      className={clsx(
        'py-1 px-2 md:py-1.5 md:px-3 rounded-full text-xs md:text-sm',
        {
          'bg-secondary text-black/25': isPending,
        },
      )}
    >
      <option value="" disabled hidden>
        Change Status
      </option>
      {['In progress', 'Idle', 'No status'].map((status) => (
        <option
          key={status}
          value={status}
          className="text-xs md:text-sm"
        >
          {status}
        </option>
      ))}
    </select>
  );
};

export default ChangeOrderStatus;
