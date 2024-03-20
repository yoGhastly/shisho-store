import { stripe } from "@/app/lib/stripe/server";
import { mapCheckoutSessionToOrder } from "@/app/orders/map-checkout-session-to-order";
import { SupabaseOrderRepository } from "@/app/orders/order-repository";
import { Order } from "@/app/types";
import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";
import Stripe from "stripe";

const repository = new SupabaseOrderRepository();

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!sig || !webhookSecret) {
    return new Response("Webhook secret not found.", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return new Response(`Unsupported event type: ${event.type}`, {
      status: 400,
    });
  }

  try {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
    const lineItems = await fetchLineItems(checkoutSession);
    const mappedOrder = mapCheckoutSessionToOrder(checkoutSession, lineItems);

    const orderWithLineItems = {
      ...mappedOrder,
      lineItems,
    };

    const order = await repository.create(orderWithLineItems);
    console.log("order created ✅", order?.id);

    await sendEmailConfirmation(resend, order as Order);

    console.log("email sent for order ✅", order?.id);
    console.log("checkout completed ✅", mappedOrder);

    return new Response(JSON.stringify({ received: true }));
  } catch (error) {
    console.error("Webhook handler failed:", error);
    return new Response(
      "Webhook handler failed. View your Next.js function logs.",
      { status: 400 },
    );
  }
}

async function fetchLineItems(checkoutSession: Stripe.Checkout.Session) {
  const checkoutItems = await stripe.checkout.sessions.listLineItems(
    checkoutSession.id,
  );
  return Promise.all(
    checkoutItems.data.map(async (item) => {
      const product = await stripe.products.retrieve(
        item.price?.product as string,
      );
      return { ...item, url: product.url };
    }),
  );
}

async function sendEmailConfirmation(resend: Resend, order: Order) {
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
}
