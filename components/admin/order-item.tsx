'use client';
import { StatusChip } from '@/app/orders/chip-status';
import { Order } from '@/app/types';
import { Spinner } from '@nextui-org/react';
import clsx from 'clsx';
import Link from 'next/link';
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
    <Link
      href={`/orders/${order.id}`}
      className={clsx(
        'border-b border-secondary flex items-center justify-between',
        'hover:bg-secondary/30 transition delay-75 p-5',
      )}
      key={order.id}
    >
      <div className="flex flex-col justify-center gap-1.5">
        <StatusChip status={order.status} />
        <p className="whitespace-nowrap text-black text-ellipsis overflow-hidden w-48 font-semibold">
          Order {order.id}
        </p>
        <p className="text-xs flex flex-col gap-1.5">
          <span className="flex gap-1.5">
            Placed By
            <span className="text-[#4D5768]">
              {order.customerEmail}
            </span>
          </span>
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-xs">{formattedDate}</p>
        <p>Total {(order.amountTotal / 100).toFixed(2)}</p>
      </div>
    </Link>
  );
}
