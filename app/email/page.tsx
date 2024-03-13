import { EmailTemplate } from "@/components/email-template";
import { LineItem } from "@stripe/stripe-js";
import React from "react";
import Stripe from "stripe";

export default function Email() {
  return (
    <div className="flex mx-auto justify-center items-center">
      <EmailTemplate
        order={{
          id: "9394kkffk",
          amountTotal: 0,
          currency: "AED",
          customerEmail: "diego@gmail.com",
          customerName: "Diego",
          lineItems: undefined,
          customerPhone: "939494959",
          shippingAddress: {
            city: "City",
            country: "Country",
            line1: "Line1",
            line2: "Line2",
            postalCode: "03949",
            state: "Abu Dhabi",
          },
        }}
      />
    </div>
  );
}
