import Stripe from "stripe";

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

interface LineItem extends Stripe.LineItem {
  url: string | null;
}

export interface Order {
  id: string;
  created_at?: Date;
  amountTotal: number;
  lineItems: LineItem[];
  currency: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postalCode: string;
    state: string;
  };
}
