import axios from "axios";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET || "";

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature") || "";
  const body = await request.json();

  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return Response.json({ message: `Webhook Error: ${err}`, status: 400 });
  }

  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntentSucceeded = event.data.object;
    console.log(paymentIntentSucceeded);

    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/send`);
    return Response.json({ message: "Payment succeeded", status: 200 });
  }

  return Response.json({
    message: `Unhandled event type ${event.type}`,
    status: 400,
  });
}
