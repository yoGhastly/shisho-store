import axios from "axios";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET || "";

export async function POST(request: NextRequest) {
  console.log("Endpoint hit");
  const rawBody = await request.text();
  console.log("RAW BODY:", rawBody);
  const sig = request.headers.get("stripe-signature") || "";
  console.log("SIGNATURE", sig);

  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
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
