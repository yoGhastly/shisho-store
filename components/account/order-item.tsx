import { StatusChip } from "@/app/orders/chip-status";
import { Order } from "@/app/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function OrderItem({ order }: { order: Order }) {
  let formattedDate = "Unknown";
  if (order && order.created_at) {
    const dateTime = new Date(order.created_at);
    formattedDate = dateTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return (
    <div className="flex flex-col w-full md:flex-row bg-white/40 rounded-sm p-5 gap-5 border border-secondary">
      <div className="basis-3/4 w-full h-full flex flex-col gap-3">
        <p className="whitespace-nowrap text-black text-ellipsis overflow-hidden w-48 font-semibold">
          Order {order.id}
        </p>
        {order?.created_at && (
          <p className="text-[#4D5768]">Ordered on {formattedDate}</p>
        )}
        <StatusChip status="In progress" />
      </div>
      <div className="basis-full flex w-full gap-5 justify-between md:justify-end items-center">
        <div className="relative w-48 h-auto group flex items-center justify-center">
          <div className="relative w-24 h-24">
            <Image
              src={`${order.lineItems.at(-1)?.url}`}
              alt={`${order.lineItems.at(-1)?.description}`}
              className="w-full h-full object-cover"
              fill
            />
            <Image
              src={`${order.lineItems.at(0)?.url}`}
              alt={`${order.lineItems.at(0)?.description}`}
              className="absolute top-0 left-0 w-full h-full object-cover group-hover:rotate-12 group-hover:translate-x-2 transition delay-75"
              fill
            />
          </div>
          <Link
            href={`/orders/${order.id}`}
            className={clsx(
              "absolute top-1/2 w-fit drop-shadow-sm left-1/2 transform -translate-x-1/2 -translate-y-1/2",
              "bg-gray-700/20 group-hover:bg-gray-700/40 transition delay-75 backdrop-blur-sm rounded-full py-1.5 px-5 w-full text-white text-center", // Added text-center
              "text-nowrap font-semibold",
            )}
          >
            View Order
          </Link>
        </div>
      </div>
    </div>
  );
}
