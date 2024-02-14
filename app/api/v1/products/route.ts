"use server";

import { TAGS } from "@/app/lib/constants";
import { revalidateTag } from "next/cache";
import Stripe from "stripe";

const STRIPE_SECRET_KEY =
  "sk_test_51OfZDtKrqv6TAD3CJhDV05wPUkgg7625mrQpm2IDAN0eSfIl6JN0o0tgft2KBmIPBQfMNX2xYknXfraMxxsgLw5J009SBO2FUp";
const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function GET() {
  try {
    // Fetch the products from Stripe
    const { data: products } = await stripe.products.list({
      limit: 100,
    });

    // Fetch the price for each product
    const productsWithPrices = await Promise.all(
      products.map(async (product) => {
        try {
          const priceRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/prices`,
            {
              method: "POST",
              body: JSON.stringify({ productId: product.id }),
            },
          );
          const { price } = await priceRes.json();
          return { ...product, price };
        } catch (error) {
          console.error(
            `Error fetching price for product ${product.id}`,
            error,
          );
          return { ...product, price: null }; // Set price to null if error occurs
        }
      }),
    );
    revalidateTag(TAGS.products);

    return Response.json({
      products: productsWithPrices,
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    // Send an error response if there's an error retrieving products or prices
    return Response.json({
      error: "Error retrieving products",
      products: [],
      success: false,
      status: 500,
    });
  }
}
