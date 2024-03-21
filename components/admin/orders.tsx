'use client';
import { Order } from '@/app/types';
import React from 'react';
import { OrderItem } from './order-item';
import { Fallback } from './fallback';
import { Status } from '@/app/orders/chip-status';

export function Orders({
  orders,
  selectedStatus,
}: {
  orders: Order[];
  selectedStatus: Status;
}) {
  return orders.length > 0 ? (
    orders.map((order) => <OrderItem order={order} key={order.id} />)
  ) : (
    <Fallback orderStatus={selectedStatus} />
  );
}
