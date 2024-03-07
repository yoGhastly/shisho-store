import { stripe } from "@/app/lib/stripe/server";
import { Order } from "@/app/types";
import { NextRequest } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET || "";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log("hit webhook");
  const sig = request.headers.get("stripe-signature") || "";
  const rawBody = await request.text();

  let event: Stripe.Event;

  try {
    console.log("HIT EVENT");
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

    switch (event.type) {
      case "checkout.session.completed":
        console.log("checkout completed");
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    return Response.json({ message: `Webhook Error: ${err}`, status: 400 });
  }

  return new Response(null, { status: 200 });
}
