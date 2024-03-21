'use client';
import { StatusChip } from '@/app/orders/chip-status';
import { Order } from '@/app/types';
import { Spinner } from '@nextui-org/react';
import React from 'react';

interface Props {
  order: Order;
}

export function OrderItem({ order }: Props) {
  let formattedDate = 'Unknown';
  if (order && order.created_at) {
    const dateTime = new Date(order.created_at);
    formattedDate = dateTime.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  if (!order) return <Spinner color="primary" />;
  return (
    <div
      className="border-b border-secondary flex items-center justify-between"
      key={order.id}
    >
      <div className="flex flex-col justify-center p-5 gap-1.5">
        <div className="flex flex-col gap-1.5">
          <StatusChip status={order.status} />
          <p className="text-xs">{formattedDate}</p>
        </div>
        <p className="whitespace-nowrap text-black text-ellipsis overflow-hidden w-48 font-semibold">
          Order {order.id}
        </p>
        <p className="text-xs flex flex-col gap-1.5">
          Placed By{' '}
          <span className="text-[#4D5768]">{order.customerName}</span>{' '}
          <StatusChip status="No status" text={order.customerEmail} />
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <p>Total {(order.amountTotal / 100).toFixed(2)}</p>
      </div>
    </div>
  );
}
