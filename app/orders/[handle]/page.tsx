import { Order } from '@/app/types';
import React, { Suspense } from 'react';
import { BreadCrumb } from '../breadcrumb';
import { Status, StatusChip } from '../chip-status';
import { GlobeEuropeAfricaIcon } from '@heroicons/react/24/outline';
import { Table } from '@/components/table';
import { SupabaseOrderRepository } from '../order-repository';
import { Skeleton } from '@/components/skeleton';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { Timeline } from '@/components/timeline';
import { notFound } from 'next/navigation';
import { checkAdminStatus } from '@/app/sign-in/actions';
import { currentUser } from '@clerk/nextjs';
import ChangeOrderStatus from '@/components/dropdown';

const repository = new SupabaseOrderRepository();

export default async function Order({
  params,
}: {
  params: { handle: string };
}) {
  let order: Order | undefined;
  let formattedDate = 'Unknown';
  let formattedTime = 'Unknown';

  const user = await currentUser();
  const { isAdmin } = await checkAdminStatus({
    email: user?.emailAddresses[0].emailAddress ?? '',
  });

  if (params.handle) {
    order = await repository.search(params.handle);
    if (order && order.created_at) {
      const dateTime = new Date(order.created_at);
      formattedDate = dateTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      formattedTime = dateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      });
    }
  }

  if (!order) return notFound();

  return (
    <React.Fragment>
      <div className="min-h-screen flex flex-col p-5 gap-10 bg-[#F9F9F9]">
        <Skeleton loaded={order ? true : false}>
          <BreadCrumb
            values={[
              { label: 'Orders', url: `/orders` },
              {
                label: `${order?.id}`,
                url: `/orders/${order?.id}`,
              },
            ]}
          />
        </Skeleton>

        <section className="flex flex-col justify-center w-full max-w-6xl gap-5 mx-auto">
          <Skeleton loaded={order ? true : false}>
            <h1 className="font-bold text-xl md:text-2xl">
              Order ID: {order?.id}
            </h1>
          </Skeleton>
          <div className="flex gap-3 items-center">
            <Skeleton loaded={order.status ? true : false}>
              <StatusChip status={order.status} />
            </Skeleton>
            {isAdmin && (
              <ChangeOrderStatus
                currentStatus={order.status}
                orderId={params.handle}
              />
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div className="w-full h-full rounded-lg flex flex-col gap-5 bg-white p-5 drop-shadow-sm">
              <h2 className="font-bold text-xl">Order Details</h2>
              <div className="flex flex-col gap-8 overflow-x-auto md:overflow-auto">
                <Table
                  labelList={[
                    'Order date',
                    'Location',
                    'Billed To',
                    'Courier',
                    'Estimate Delivery Time',
                  ]}
                  bodyRows={[
                    formattedDate,
                    `${order?.shippingAddress.line1}, ${order?.shippingAddress.line2}`,
                    `${order?.customerName}`,
                    'ARAMEX',
                    `1-2 weeks`,
                  ]}
                />
              </div>
            </div>

            <section className="flex flex-col md:flex-row gap-5 w-full">
              <div className="bg-white w-full rounded-lg p-5 flex flex-col gap-2.5">
                <h3 className="font-bold text-sm md:text-xl">
                  Order progress/status
                </h3>

                <div className="flex flex-col bg-[#F9FAFB] p-2.5 gap-3">
                  <span className="text-[#979DAB] text-xs md:text-sm">
                    Timeline
                  </span>
                  <section className="overflow-y-auto">
                    <Timeline
                      items={[
                        {
                          title: order?.status,
                          children: (
                            <div className="flex flex-col gap-1.5">
                              <p>
                                Order processed
                              </p>
                              <p className="text-xs">
                                {formattedDate}
                              </p>
                            </div>
                          ),
                        },
                      ]}
                      activeItem={order ? 0 : -1} // Since there's only one status, it's always active
                    />
                  </section>
                </div>

                <Suspense fallback={<p>Loading...</p>}>
                  <div className="flex justify-between items-center p-2">
                    <div className="flex flex-col gap-1">
                      <Skeleton
                        loaded={
                          formattedDate ? true : false
                        }
                      >
                        <p className="font-semibold text-sm">
                          {formattedDate}
                        </p>
                      </Skeleton>
                      <p className="text-xs">
                        Order placed
                      </p>
                    </div>
                    <Skeleton
                      loaded={
                        formattedTime ? true : false
                      }
                    >
                      <p className="font-semibold text-xs md:text-sm">
                        {formattedTime}
                      </p>
                    </Skeleton>
                  </div>
                </Suspense>
              </div>

              <div className="bg-white w-full rounded-lg p-5 flex flex-col">
                <h3 className="font-bold text-sm md:text-xl">
                  Live Tracking
                </h3>
                <GlobeEuropeAfricaIcon className="h-10 mx-auto my-auto" />
              </div>
            </section>

            <div className="w-full h-full rounded-lg flex flex-col gap-5 bg-white p-5 drop-shadow-sm">
              <div className="flex justify-between items-center bg-[#F9FAFB] p-2.5">
                <span className="text-[#979DAB] text-xs md:text-sm hidden md:block">
                  Products
                </span>
                <span className="text-[#979dab]">
                  Shipping Cost{' '}
                  {(
                    (order?.shippingCost
                      ?.amount_total as number) / 100
                  ).toFixed(2)}{' '}
                  for {order?.shippingAddress.state}
                </span>
                <span className="font-semibold">
                  Total{' '}
                  {(
                    (order?.amountTotal as number) / 100
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col gap-8 overflow-x-auto md:overflow-auto">
                {order?.lineItems.map((item) => {
                  // Find the corresponding size for the current product
                  const sizeItem = order?.selectedSizes.find(
                    (sizeItem) =>
                      sizeItem.name === item.description,
                  );
                  return (
                    <section
                      className="flex items-center"
                      key={item.id}
                    >
                      <div className="flex gap-3">
                        <figure className="relative w-24 h-24">
                          <Image
                            src={`${item.url}`}
                            alt={`${item.description}`}
                            aria-label={`${item.description}`}
                            fill
                            className="object-cover"
                          />
                        </figure>
                        <div className="flex flex-col gap-1.5">
                          <p>{item.description}</p>
                          <p className="text-xs">
                            {sizeItem
                              ? sizeItem.size
                              : 'Size not available'}
                          </p>
                          <p>
                            {(
                              item.amount_total /
                              100
                            ).toFixed(2)}{' '}
                            <span className="uppercase">
                              {
                                item.price
                                  ?.currency
                              }
                            </span>
                          </p>
                        </div>
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
}
