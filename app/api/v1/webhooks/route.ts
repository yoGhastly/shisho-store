import { CreateOrder } from "@/app/domain/CreateOrder";
import { stripe } from "@/app/lib/stripe/server";
import { mapCheckoutSessionToOrder } from "@/app/orders/map-checkout-session-to-order";
import { SupabaseOrderRepository } from "@/app/orders/order-repository";
import { EmailTemplate } from "@/components/email-template";
import { cookies } from "next/headers";
import { Resend } from "resend";
import Stripe from "stripe";

const relevantEvents = new Set(["checkout.session.completed"]);

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
        case "checkout.session.completed":
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          const lineItems = await stripe.checkout.sessions.listLineItems(
            checkoutSession.id,
          );
          const mappedOrder = mapCheckoutSessionToOrder(checkoutSession);
          let orderId;

          if (checkoutSession.metadata) {
            orderId = checkoutSession.metadata.orderId;
          }
          // create the order
          const orderWithLineItems = {
            ...mappedOrder,
            lineItems,
          };
          const order = await orderRepository.create(orderWithLineItems);
          cookies().set("att_e", order?.customerEmail as string);
          console.log("order created ✅", mappedOrder.id);
          // send email confirmation
          if (order) {
            try {
              const { data, error } = await resend.emails.send({
                from: "Shisho Baby Clothes <info@xervsware.com>",
                to: [order.customerEmail],
                subject: `Order Confirmation.`,
                react: EmailTemplate({ order }),
                text: `Order Confirmation.`,
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
            console.log("email sent for order ✅", order.id);
          }
          console.log("checkout completed ✅", mappedOrder);
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
