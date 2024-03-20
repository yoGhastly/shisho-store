import { StatusChip } from "@/app/orders/chip-status";
import { Order } from "@/app/types";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
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
    <div className="flex flex-col h-full w-full md:flex-row bg-white/40 rounded-sm p-5 gap-5 border border-secondary">
      <div className="basis-3/4 w-full h-full flex flex-col gap-3">
        <p className="whitespace-nowrap text-black text-ellipsis overflow-hidden w-48 font-semibold">
          Order {order.id}
        </p>
        {order?.created_at && (
          <p className="text-[#4D5768]">Ordered on {formattedDate}</p>
        )}
        <StatusChip status="In progress" />
      </div>
      <div className="basis-full flex gap-5 justify-between md:justify-end items-center">
        <PhotoIcon className="h-6" />
        <Button
          color="primary"
          radius="full"
          as="a"
          href={`/orders/${order.id}`}
        >
          <p className="text-white">View order</p>
        </Button>
      </div>
    </div>
  );
}
