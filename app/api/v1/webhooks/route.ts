import { cookies } from "next/headers";
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

  if (body.type === "checkout.session.completed") {
    cookies().set("event", body.type);
  }

  if (event.type === "checkout.session.completed") {
    console.log("INIT CHECKOUT COMPLETED");
    const checkoutSessionCompleted = event.data.object;
    console.log("hit event checkout completed", checkoutSessionCompleted);

    return Response.json({ message: "Payment succeeded", status: 200 });
  }

  return Response.json({
    message: `Unhandled event type ${event.type}`,
    status: 400,
  });
}
