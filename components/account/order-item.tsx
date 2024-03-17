import { StatusChip } from "@/app/orders/chip-status";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import React from "react";

export function OrderItem() {
  return (
    <div className="flex flex-col md:flex-row bg-white drop-shadow-md rounded-sm p-5 gap-5">
      <div className="basis-3/4 flex flex-col gap-3">
        <p className="font-bold">Order #939494</p>
        <p className="">Ordered on 17 March 2024</p>
        <StatusChip status="In progress" />
      </div>
      <div className="basis-full flex gap-5 justify-between md:justify-end items-center">
        <PhotoIcon className="h-6" />
        <Button color="primary" radius="full">
          <p className="text-white">View order</p>
        </Button>
      </div>
    </div>
  );
}
