import Stripe from "stripe";
import { Order } from "../types";

export function mapCheckoutSessionToOrder(
  session: Stripe.Checkout.Session,
): Order {
  const {
    metadata,
    amount_total,
    currency,
    customer_details,
    shipping_details,
    line_items,
  } = session;

  return {
    id: metadata?.orderId ?? "",
    amountTotal: amount_total ?? 0,
    currency: currency ?? "",
    customerEmail: customer_details?.email ?? "",
    customerName: customer_details?.name ?? "",
    customerPhone: customer_details?.phone ?? "",
    lineItems: line_items,
    shippingAddress: {
      city: shipping_details?.address?.city ?? "",
      country: shipping_details?.address?.country ?? "",
      line1: shipping_details?.address?.line1 ?? "",
      line2: shipping_details?.address?.line2 ?? "",
      postalCode: shipping_details?.address?.postal_code ?? "",
      state: shipping_details?.address?.state ?? "",
    },
  };
}