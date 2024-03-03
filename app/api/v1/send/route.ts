import { Order } from "@/app/types";
import { EmailTemplate } from "@/components/email-template";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(_req: NextRequest) {
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
}
