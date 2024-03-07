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
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    return Response.json({ message: `Webhook Error: ${err}`, status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;

      const order: Order = {
        id: "399448884",
        items: [{ id: "00933", name: "test", qty: 1, amount: 1000 }],
        customer: {
          email: "diego.espinosagrc@uanl.edu.mx",
          name: "Jose Diego Espinosa Garcia",
          phone: "0504500393",
        },
        shipping: {
          city: "AED",
        },
      };

      try {
        const data = await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: [order.customer.email],
          subject: `Confirmation Order #${order.id}`,
          react: EmailTemplate({ order }),
          text: `Confirmation Order #${order.id}`,
        });

        return Response.json(data);
      } catch (error) {
        return Response.json({ error });
      }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
