import axios from "axios";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET || "";

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature");
  let event;
  const body = await request.json();

  try {
    event = Stripe.webhooks.constructEvent(
      body,
      sig as string | Buffer,
      endpointSecret,
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, { status: 400 });
  }

  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntentSucceeded = event.data.object;
    console.log(paymentIntentSucceeded);

    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/send`);
    return new Response("Payment succeeded", { status: 200 });
  }

  return new Response(`Unhandled event type ${event.type}`, { status: 400 });
}
