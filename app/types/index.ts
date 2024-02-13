import Stripe from "stripe";

export interface ProductsResponse {
  products: Stripe.Product[];
  success: boolean;
  status: number;
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
