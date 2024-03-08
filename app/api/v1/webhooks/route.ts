import { stripe } from "@/app/lib/stripe/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET || "";

export async function POST(request: NextRequest) {
  const buf = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
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

  // Handle the event
  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      return Response.json({ checkoutSessionAsyncPaymentFailed });
    case "checkout.session.async_payment_succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      return Response.json({ checkoutSessionAsyncPaymentSucceeded });
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      return Response.json({ checkoutSessionCompleted });
    case "checkout.session.expired":
      const checkoutSessionExpired = event.data.object;
      return Response.json({ checkoutSessionExpired });
    case "payment_intent.amount_capturable_updated":
      const paymentIntentAmountCapturableUpdated = event.data.object;
      console.log(paymentIntentAmountCapturableUpdated);
      return Response.json({ paymentIntentAmountCapturableUpdated });
    case "payment_intent.canceled":
      const paymentIntentCanceled = event.data.object;
      console.log(paymentIntentCanceled);
      return Response.json({ paymentIntentCanceled });
    case "payment_intent.created":
      const paymentIntentCreated = event.data.object;
      console.log(paymentIntentCreated);
      return Response.json({ paymentIntentCreated });
    case "payment_intent.partially_funded":
      const paymentIntentPartiallyFunded = event.data.object;
      console.log(paymentIntentPartiallyFunded);
      return Response.json({ paymentIntentPartiallyFunded });
    case "payment_intent.payment_failed":
      const paymentIntentPaymentFailed = event.data.object;
      console.log(paymentIntentPaymentFailed);
      return Response.json({ paymentIntentPaymentFailed });
    case "payment_intent.processing":
      const paymentIntentProcessing = event.data.object;
      console.log(paymentIntentProcessing);
      return Response.json({ paymentIntentProcessing });
    case "payment_intent.requires_action":
      const paymentIntentRequiresAction = event.data.object;
      console.log(paymentIntentRequiresAction);
      return Response.json({ paymentIntentRequiresAction });
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      return Response.json({ paymentIntentSucceeded });
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return Response.json("Webhook stripe");
}
