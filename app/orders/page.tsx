'use server';
import React from 'react';
import { AccountDetails } from '@/components/account/acount-details';
import { AddressBook } from '@/components/account/address-book';
import { ReturnItem } from '@/components/account/return-item';
import { OrderItem } from '@/components/account/order-item';
import { BreadCrumb } from './breadcrumb';
import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import { OrderSearchCriteria } from '../infrastructure/criteria/OrderSearchCriteria';
import { SupabaseOrderRepository } from './order-repository';
import { Order } from '../types';
import { Skeleton } from '@/components/skeleton';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import Footer from '@/components/layout/footer';
import Link from 'next/link';

type Details = {
  emailAddress: string;
  name: string;
};

const orderRepository = new SupabaseOrderRepository();

export default async function Orders() {
  const user = await currentUser();

  const criteria: OrderSearchCriteria = {
    customerEmail: user?.emailAddresses.map((a) => a.emailAddress),
  };

  let details = {
    name: 'Guest',
    emailAddress: criteria.customerName,
  };
  let address = {} as Pick<Order, 'shippingAddress'> &
    Pick<Order, 'customerName'>;

  if (!user) {
    redirectToSignIn({
      returnBackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/orders`,
    });
  }

  const orders = await orderRepository.searchBy(criteria);

  if (orders.length > 0) {
    const { customerName, shippingAddress } = orders[0];
    details = {
      name: customerName ?? null,
      emailAddress: criteria.customerEmail,
    };
    address = {
      customerName,
      shippingAddress,
    };
  }

  return (
    <React.Fragment>
      <section className="flex flex-col h-full md:gap-5 justify-center items-center">
        <header className="flex self-start w-full p-5 max-w-6xl mx-auto mt-5">
          <div>
            <BreadCrumb
              values={[{ label: 'Your Account', url: '/orders' }]}
            />
          </div>
        </header>

        <article className="flex flex-col md:flex-row gap-5 w-full p-5 h-full max-w-6xl mx-auto">
          <aside className="h-full rounded-sm basis-1/3 flex flex-col gap-10">
            <Skeleton loaded={details ? true : false}>
              <AccountDetails
                details={details as Details}
                showLogOutButton={user ? true : false}
              />
            </Skeleton>
            {orders.length > 0 && (
              <Skeleton loaded={address ? true : false}>
                <AddressBook address={address} />
              </Skeleton>
            )}
            <ReturnItem />
          </aside>
          <section className="rounded-sm h-full basis-full p-5 flex flex-col gap-5">
            <h2 className="uppercase font-bold text-2xl">
              Your Orders
            </h2>
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderItem order={order} key={order.id} />
              ))
            ) : (
              <section className="flex flex-col justify-center items-center gap-8 my-auto">
                <ShoppingBagIcon className="h-10" />
                <div className="flex flex-col gap-3 text-center">
                  <p className="font-semibold">
                    Your orders are empty.
                  </p>
                  <p className="text-[#4D5768] max-w-sm">
                    Looks like you haven&apos;t made any
                    purchases yet or{' '}
                    <Link
                      className="text-primary"
                      href="/sign-in"
                    >
                      Sign In{' '}
                    </Link>
                    to view your past orders . Start
                    shopping now!
                  </p>
                </div>
                <Button as="a" href="/search" color="primary">
                  <p className="text-white">Go Shopping</p>
                </Button>
              </section>
            )}
          </section>
        </article>
      </section>
      <Footer />
    </React.Fragment>
  );
}
