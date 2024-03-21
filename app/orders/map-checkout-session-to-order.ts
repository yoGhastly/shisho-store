import Stripe from 'stripe';
import { Order, LineItem } from '../types';

export function mapCheckoutSessionToOrder(
  session: Stripe.Checkout.Session,
  lineItems: LineItem[],
): Order {
  const {
    metadata,
    shipping_cost,
    amount_total,
    currency,
    customer_details,
    shipping_details,
  } = session;

  return {
    id: metadata?.orderId ?? '',
    amountTotal: amount_total ?? 0,
    currency: currency ?? '',
    customerEmail: customer_details?.email ?? '',
    customerName: customer_details?.name ?? '',
    customerPhone: customer_details?.phone ?? '',
    shippingCost: shipping_cost ?? null,
    lineItems,
    status: 'In progress',
    shippingAddress: {
      city: shipping_details?.address?.city ?? '',
      country: shipping_details?.address?.country ?? '',
      line1: shipping_details?.address?.line1 ?? '',
      line2: shipping_details?.address?.line2 ?? '',
      postalCode: shipping_details?.address?.postal_code ?? '',
      state: shipping_details?.address?.state ?? '',
    },
  };
}
