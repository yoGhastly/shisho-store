import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET || "";

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature") || "";
  const rawBody = await request.text();
  try {
    const body = JSON.parse(rawBody);
    cookies().set("evt_type", body.type);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    // Handle the error accordingly
  }

  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    return Response.json({ message: `Webhook Error: ${err}`, status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    cookies().set("ch_id", session.id);
    console.log("SESSION: ", session);
  }

  return Response.json({
    message: `Unhandled event type ${event.type}`,
    status: 400,
  });
}
