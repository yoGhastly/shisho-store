import { Status } from '@/app/orders/chip-status';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';

export function Fallback({ orderStatus }: { orderStatus: Status }) {
  return (
    <section className="flex flex-col justify-center items-center gap-8 mt-24">
      <MagnifyingGlassIcon className="h-6" />
      <div className="flex flex-col gap-3 text-center">
        <p>
          No orders found. with status{' '}
          <span className="font-semibold">
            &lsquo;
            {orderStatus}&lsquo;
          </span>{' '}
        </p>
      </div>
    </section>
  );
}
