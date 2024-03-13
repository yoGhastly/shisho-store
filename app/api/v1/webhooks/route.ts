import { CreateOrder } from "@/app/domain/CreateOrder";
import { stripe } from "@/app/lib/stripe/server";
import { SupabaseOrderRepository } from "@/app/order/create-order";
import { mapCheckoutSessionToOrder } from "@/app/order/map-checkout-session-to-order";
import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";
import Stripe from "stripe";

const relevantEvents = new Set([
  "checkout.session.completed",
  "payment_intent.created",
]);

const orderRepository = new CreateOrder(new SupabaseOrderRepository());

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const resend = new Resend(process.env.RESEND_API_KEY);
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
        case "payment_intent.created":
          const paymentIntentCreated = event.data.object;
          console.log({ paymentIntentCreated });
          break;
        case "checkout.session.completed":
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          const order = mapCheckoutSessionToOrder(checkoutSession);
          // create the order
          const newOrder = await orderRepository.create(order);
          console.log("order created ✅", order.id);
          // send email confirmation
          if (newOrder) {
            try {
              const { data, error } = await resend.emails.send({
                from: "info@xervsware.com",
                to: [newOrder.customerEmail],
                subject: `Confirmation Order #${newOrder.id}`,
                react: EmailTemplate({ order: newOrder }),
                text: `Confirmation Order #${newOrder.id}`,
              });

              if (error) {
                console.error(`Resend error: ${error.name}`);
              }
              console.log("Email sent successfully 📩", data?.id);
            } catch (error: any) {
              console.error("Error sending email:", error);
              throw new Error(
                `Failed to send email confirmation: ${error.name}`,
              );
            }
            console.log("email sent for order ✅", newOrder.id);
          }
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
