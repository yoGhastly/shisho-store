import { stripe } from "@/app/lib/stripe/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET || "";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headerList = headers();
  const sig = headerList.get("stripe-signature") || "";

  console.log(sig);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);

    return NextResponse.json(
      {
        error: {
          message: `Webhook Error: ${errorMessage}`,
        },
      },
      { status: 400 },
    );
  }

  console.log(event);

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      console.log({ checkoutSessionCompleted });
      // Then define and call a function to handle the event checkout.session.completed
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return new Response(null, { status: 200 });
}
