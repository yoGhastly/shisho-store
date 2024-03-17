import { Order } from "@/app/types";
import React, { Suspense } from "react";
import { BreadCrumb } from "../breadcrumb";
import { StatusChip } from "../chip-status";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";
import { Table } from "@/components/table";
import { SupabaseOrderRepository } from "../order-repository";
import { Skeleton } from "@/components/skeleton";

const orderRepository = new SupabaseOrderRepository();

export default async function Order({
  params,
}: {
  params: { handle: string };
}) {
  let order: Order | undefined;
  let formattedDate = "Unknown";
  let formattedTime = "Unknown";

  if (params.handle) {
    order = await orderRepository.search(params.handle);
    if (order && order.created_at) {
      const dateTime = new Date(order.created_at);
      formattedDate = dateTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      formattedTime = dateTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col p-5 gap-10 bg-[#F9F9F9]">
      <Skeleton loaded={order?.id ? true : false}>
        <BreadCrumb currentValue={order?.id} />
      </Skeleton>

      <section className="flex flex-col justify-center w-full max-w-6xl gap-5 mx-auto">
        <Skeleton loaded={order?.id ? true : false}>
          <h1 className="font-bold text-xl md:text-2xl">
            Order ID: {order?.id}
          </h1>
        </Skeleton>
        <StatusChip status="In progress" />

        <div className="flex flex-col gap-5">
          <div className="w-full h-full rounded-lg flex flex-col gap-5 bg-white p-5 drop-shadow-sm">
            <h2 className="font-bold text-xl">Order Details</h2>

            <div className="flex flex-col gap-8 overflow-x-auto md:overflow-auto">
              <Skeleton loaded={order ? true : false}>
                <Table
                  labelList={[
                    "Order date",
                    "Location",
                    "Billed To",
                    "Courier",
                    "Estimate Delivery Time",
                  ]}
                  bodyRows={[
                    formattedDate,
                    `${order?.shippingAddress.line1}, ${order?.shippingAddress.line2}`,
                    `${order?.customerName}`,
                    "ARAMEX",
                    `1-2 weeks`,
                  ]}
                />
              </Skeleton>
            </div>
          </div>

          <section className="flex flex-col md:flex-row gap-5 w-full">
            <div className="bg-white w-full rounded-lg p-5 flex flex-col gap-2.5">
              <h3 className="font-bold text-sm md:text-xl">
                Order progress/status
              </h3>

              <div className="bg-[#F9FAFB] p-2.5">
                <span className="text-[#979DAB] text-xs md:text-sm">
                  Timeline
                </span>
              </div>

              <Suspense fallback={<p>Loading...</p>}>
                <div className="flex justify-between items-center p-2">
                  <div className="flex flex-col gap-1">
                    <Skeleton loaded={formattedDate ? true : false}>
                      <p className="font-semibold text-sm">{formattedDate}</p>
                    </Skeleton>
                    <p className="text-xs">Order placed</p>
                  </div>
                  <Skeleton loaded={formattedTime ? true : false}>
                    <p className="font-semibold text-xs md:text-sm">
                      {formattedTime}
                    </p>
                  </Skeleton>
                </div>
              </Suspense>
            </div>

            <div className="bg-white w-full rounded-lg p-5 flex flex-col">
              <h3 className="font-bold text-sm md:text-xl">Live Tracking</h3>
              <GlobeEuropeAfricaIcon className="h-10 mx-auto my-auto" />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
