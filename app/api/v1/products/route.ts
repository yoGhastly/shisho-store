"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function GET() {
  try {
    const { data: products } = await stripe.products.list();
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
