import Stripe from 'stripe';
import { Status } from '../orders/chip-status';

export interface ProductsResponse {
  products: Product[];
  success: boolean;
  status: number;
}

export interface Product extends Stripe.Product {
  price: string;
}

export interface TaxRatesResponse {
  taxRates?: Stripe.TaxRate[];
  success: boolean;
  status: number;
}

export interface CreateCheckoutSessionResponse {
  status: number;
  json: {
    sessionId: string;
    clientSecret: string;
  };
}

export interface LineItem extends Stripe.LineItem {
  url: string | null;
}

export interface Order {
  id: string;
  created_at?: Date;
  amountTotal: number;
  status: Status;
  lineItems: LineItem[];
  currency: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  shippingCost: Stripe.Checkout.Session.ShippingCost | null;
  shippingAddress: {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postalCode: string;
    state: string;
  };
}
