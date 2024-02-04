"use server";

import useProductStore from "@/app/lib/stores/product.store";
import Stripe from "stripe";

const STRIPE_SECRET_KEY =
  "sk_test_51OfZDtKrqv6TAD3CJhDV05wPUkgg7625mrQpm2IDAN0eSfIl6JN0o0tgft2KBmIPBQfMNX2xYknXfraMxxsgLw5J009SBO2FUp";
const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function GET() {
  try {
    const { data: products } = await stripe.products.list({
      apiKey: STRIPE_SECRET_KEY,
    });

    return Response.json({ products, success: true, status: 200 });
  } catch (error) {
    console.error(error);
    Response.json({
      error: "Error retrieving products",
      products: [],
      success: false,
      status: 500,
    });
  }
}
