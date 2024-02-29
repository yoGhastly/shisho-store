import { stripe } from "@/app/lib/stripe/server";
import { NextRequest } from "next/server";

const endpointSecret =
  "whsec_db9f281bd897cbceebb017138e4f3072697f99e2993f3dead4ebb0660c100df1";

export default async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature");
  let event;
  const body = await request.json();

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig as string | Buffer,
      endpointSecret,
    );
  } catch (err) {
    return Response.json(`Webhook Error: ${err}`);
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
      // Then define and call a function to handle the event payment_intent.succeeded
      console.log(paymentIntentSucceeded);
      return Response.json({ paymentIntentSucceeded });
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  Response.json("Webhook stripe");
}
