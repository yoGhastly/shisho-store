import Stripe from "stripe";
import { Order } from "../types";

export function mapCheckoutSessionToOrder(
  session: Stripe.Checkout.Session,
): Order {
  const { id, amount_total, currency, customer_details, shipping_details } =
    session;

  return {
    id: id ?? "",
    amountTotal: amount_total ?? 0,
    currency: currency ?? "",
    customerEmail: customer_details?.email ?? "",
    customerName: customer_details?.name ?? "",
    customerPhone: customer_details?.phone ?? "",
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
