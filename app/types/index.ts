import Stripe from "stripe";

export interface ProductsResponse {
  products: Stripe.Product[];
  success: boolean;
  status: number;
}
