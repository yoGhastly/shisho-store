import { stripe } from "@/app/lib/stripe/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { paymentIntentId } = await req.json();

  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

  return Response.json({ intent });
}
