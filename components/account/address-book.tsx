import { Order } from "@/app/types";
import React from "react";

export function AddressBook({
  address,
}: {
  address: Pick<Order, "shippingAddress"> & Pick<Order, "customerName">;
}) {
  return (
    <section className="bg-secondary/[0.25] rounded-sm p-3 flex flex-col gap-3">
      <p className="uppercase font-bold">Address Book</p>
      <div className="text-[#4D5768]">
        <p>{address.customerName}</p>
        <p>{address.shippingAddress.line1}</p>
        <p>{address.shippingAddress.line2}</p>
      </div>
    </section>
  );
}
