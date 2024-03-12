import { EmailRepository } from "@/app/infrastructure/EmailRepository";
import { Order } from "@/app/types";
import { NextRequest } from "next/server";

const emailRepository = new EmailRepository(process.env.RESEND_API_KEY || "");

export async function POST(req: NextRequest) {
  const { order }: { order: Order } = await req.json();
  try {
    await emailRepository.sendOrderConfirmation(order);
  } catch (error: any) {
    return new Response(`Email sender handler failed. ${error.message}`, {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ sent: true }));
}
