import { supabase } from "@/app/lib/subapase/client";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const endpointSecret =
  "whsec_db9f281bd897cbceebb017138e4f3072697f99e2993f3dead4ebb0660c100df1";

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
    return Response.json(`Webhook Error: ${err}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      cookies().set("pi_id", paymentIntentSucceeded.id);
      try {
        const { data, error } = await supabase
          .from("orders")
          .insert([paymentIntentSucceeded]);
        if (error) {
          console.error("Error inserting payment intent:", error.message);
          return Response.error();
        }
        console.log("Payment intent saved successfully:", data);
      } catch (error) {
        console.error("Error inserting payment intent:", error);
        return Response.error();
      }
      return Response.json({ success: true, paymentIntentSucceeded });
    default:
      console.log(`Unhandled event type ${event.type}`);
      return Response.json("Webhook stripe");
  }
}
