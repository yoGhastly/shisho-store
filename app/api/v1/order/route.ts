import { supabase } from "@/app/lib/subapase/client";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.json();

  return Response.json("Order endpoint");
}
