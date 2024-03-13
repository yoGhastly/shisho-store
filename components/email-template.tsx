import { Order } from "@/app/types";
import * as React from "react";

interface EmailTemplateProps {
  order: Order;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  order,
}) => (
  <div className="font-sans">
    <h1 className="font-bold text-2xl mb-4">Welcome, {order.customerName}!</h1>
    <p className="text-lg mb-4">Your confirmation of order #{order.id}</p>
    <div className="mb-4">
      <p className="font-bold text-lg mb-2">Order Details</p>
      <ul>
        {order.lineItems?.data.map((item, index) => (
          <li key={index} className="text-base mb-1">
            <span className="font-bold">{item.description}:</span>{" "}
            {item.quantity} x {item.amount_total} {order.currency}
          </li>
        ))}
      </ul>
    </div>
    <div className="mb-4">
      <p className="font-bold text-lg mb-2">Shipping Address:</p>
      <p className="text-base mb-1">{order.shippingAddress.line1}</p>
      <p className="text-base mb-1">{order.shippingAddress.line2}</p>
      <p className="text-base mb-1">{order.shippingAddress.city}</p>
      <p className="text-base mb-1">{order.shippingAddress.state}</p>
      <p className="text-base mb-1">{order.shippingAddress.postalCode}</p>
      <p className="text-base mb-1">{order.shippingAddress.country}</p>
    </div>
  </div>
);
