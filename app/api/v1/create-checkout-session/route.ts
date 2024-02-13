import { stripe } from "@/app/lib/stripe/server";
import { Cart } from "@/types/cart";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const MINIMUM_AMOUNT_FILS = 200;

export async function POST(req: NextRequest) {
  try {
    const {
      cart,
      taxRate,
      total,
    }: { cart: Cart; taxRate: Stripe.TaxRate; total: string } =
      await req.json();

    const totalAmount = parseFloat(total);

    console.log("BODY", { cart, taxRate, totalAmount });

    // Calculate the total amount in cents
    const totalAmountInCents = Math.ceil(totalAmount * 100);

    // Check if the total amount meets the minimum requirement
    if (totalAmountInCents < MINIMUM_AMOUNT_FILS) {
      throw new Error("Total amount does not meet the minimum requirement");
    }

    // Create a new customer in Stripe
    const customer = await stripe.customers.create();

    // Prepare line items for the checkout session
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: "AED",
          product_data: {
            name: item.name,
            images: item.images,
          },
          unit_amount: Math.ceil(parseFloat(item.amount) * 100), // Convert amount to cents
        },
        quantity: item.quantity,
      }));

    // Create a PaymentIntent with the total amount
    const intent = await stripe.paymentIntents.create({
      customer: customer.id,
      amount: totalAmountInCents,
      currency: "aed",
    });

    // Create a new checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}?cancel=true`,
      customer: customer.id,
    });

    // Return the session ID and client secret to the client
    return Response.json({
      status: 200,
      json: {
        sessionId: session.id,
        clientSecret: intent.client_secret,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    // Return an error response if something goes wrong
    return Response.json({
      status: 500,
      json: { error: "Failed to create checkout session" },
    });
  }
}
