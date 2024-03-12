import { Order } from "@/app/types";
import * as React from "react";

interface EmailTemplateProps {
  order: Order;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  order,
}) => (
  <div className="font-sans flex gap-10 flex-col">
    <h1 className="font-bold">Welcome, {order.customerName}!</h1>
    <p>Your confirmation of order #{order.id}</p>
    <div className="flex flex-col gap-5 items-center">
      <p className="font-bold">Order Details</p>
      <ul>
        <li>
          {order.amountTotal} {order.currency}
        </li>
        <li>{order.shippingAddress.line1}</li>
        <li>{order.customerEmail}</li>
        <li>{order.customerPhone}</li>
      </ul>
    </div>
  </div>
);
