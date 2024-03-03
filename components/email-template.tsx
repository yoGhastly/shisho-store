"use client";
import { Order } from "@/app/types";
import * as React from "react";

interface EmailTemplateProps {
  order: Order;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  order,
}) => (
  <div className="font-sans flex gap-10 flex-col">
    <h1 className="font-bold">Welcome, {order.customer.name}!</h1>
    <p>Your confirmation of order #{order.id}</p>
    <div className="flex flex-col gap-5 items-center">
      <p className="font-bold">Order Details</p>
      <ul>
        {order.items.map((i) => (
          <li key={i.id} className="flex flex-col gap-3">
            <p className="font-bold">{i.name}</p>
            <p className="text-xs text-[#d4d4d4]">{i.qty}</p>
            <p className="font-medium">{i.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
