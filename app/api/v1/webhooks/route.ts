import { OrderRegistrar } from "@/app/domain/RegisterOrder";
import { stripe } from "@/app/lib/stripe/server";
import { SupabaseOrderRepository } from "@/app/order/create-order";
import { mapCheckoutSessionToOrder } from "@/app/order/map-checkout-session-to-order";
import axios from "axios";
import Stripe from "stripe";

const relevantEvents = new Set(["checkout.session.completed"]);

const orderRegister = new OrderRegistrar(new SupabaseOrderRepository());

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  console.log({ webhookSecret });
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret)
      return new Response("Webhook secret not found.", { status: 400 });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "checkout.session.completed":
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          const order = mapCheckoutSessionToOrder(checkoutSession);
          // create the order
          await orderRegister.register(order);
          // send email confirmation
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/send`,
            order,
          );
          console.log("checkout completed ✅", order);
          break;
        default:
          throw new Error("Unhandled relevant event!");
      }
    } catch (error) {
      console.log(error);
      return new Response(
        "Webhook handler failed. View your Next.js function logs.",
        {
          status: 400,
        },
      );
    }
  } else {
    return new Response(`Unsupported event type: ${event.type}`, {
      status: 400,
    });
  }
  return new Response(JSON.stringify({ received: true }));
}
