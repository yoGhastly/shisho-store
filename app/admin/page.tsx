import React, { Suspense } from 'react';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs';
import { checkAdminStatus } from '../sign-in/actions';
import { BreadCrumb } from '../orders/breadcrumb';
import { AccountDetails } from '@/components/account/acount-details';
import { Skeleton } from '@/components/skeleton';
import { SupabaseOrderRepository } from '../orders/order-repository';
import { OrderItem } from '@/components/admin/order-item';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { StatusOrderRadioGroup } from '@/components/radio-group';
import { OrderSearchCriteria } from '../infrastructure/criteria/OrderSearchCriteria';

function Fallback() {
  return (
    <div className="max-w-5xl flex flex-col justify-center items-center gap-5 mx-auto my-auto h-screen">
      <h1 className="text-4xl font-semibold text-primary">401</h1>
      <p className="max-w-[300px] text-center">
        You don&apos;t have access to view this page.{' '}
        <Link className="text-primary font-semibold underline" href="/">
          Go Shopping
        </Link>
      </p>
    </div>
  );
}

const repository = new SupabaseOrderRepository();

export default async function Page({
  searchParams,
}: {
  searchParams: { status: string | undefined };
}) {
  const user = await currentUser();
  let orders;
  if (!user) return <Fallback />;

  const emails = user?.emailAddresses.map((a) => a.emailAddress);
  let adminDetails = {
    name: 'Admin',
    emailAddress: emails?.at(0) ?? '',
  };

  const { isAdmin } = await checkAdminStatus({
    email: emails?.at(0) as string,
  });

  if (searchParams) {
    const statusParam = searchParams.status;
    const criteria: OrderSearchCriteria = {
      status: statusParam,
    };

    orders = await repository.searchBy(criteria);
  }

  if (!isAdmin) return <Fallback />;

  return (
    <section className="flex flex-col h-full md:gap-5 justify-center items-center">
      <header className="flex self-start w-full p-5 max-w-6xl mx-auto mt-5">
        <div>
          <BreadCrumb values={[{ label: 'Admin', url: '/admin' }]} />
        </div>
      </header>

      <article className="flex flex-col md:flex-row gap-5 w-full p-5 h-full max-w-6xl mx-auto">
        <aside className="h-full rounded-sm basis-1/3 flex flex-col gap-10">
          <Skeleton loaded={adminDetails ? true : false}>
            <AccountDetails
              details={adminDetails}
              showLogOutButton={user ? true : false}
            />
          </Skeleton>
        </aside>
        <section className="rounded-sm h-full basis-full p-5 flex flex-col gap-5">
          <h2 className="uppercase font-bold text-2xl">Orders</h2>
          <StatusOrderRadioGroup />

          <Suspense fallback={<p>loading...</p>}>
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderItem order={order} key={order.id} />
              ))
            ) : (
              <section className="flex flex-col justify-center items-center gap-8 my-auto">
                <MagnifyingGlassIcon className="h-6" />
                <div className="flex flex-col gap-3 text-center">
                  <p className="font-semibold">
                    No orders found. with status &lsquo;
                    {searchParams.status}&lsquo;
                  </p>
                </div>
              </section>
            )}
          </Suspense>
        </section>
      </article>
    </section>
  );
}
