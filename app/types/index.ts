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

export interface Order {
  id: string;
  items: {
    id: string;
    name: string;
    qty: number;
    amount: number;
  }[];
  customer: {
    email: string;
    name: string;
    phone: string;
  };
  shipping: {
    city: string;
  };
}
