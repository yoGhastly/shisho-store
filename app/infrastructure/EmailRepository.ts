import { EmailTemplate } from "@/components/email-template";
import { Order } from "@/app/types";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export class EmailRepository {
  async sendOrderConfirmation(order: Order): Promise<void> {
    try {
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [order.customerEmail],
        subject: `Confirmation Order #${order.id}`,
        react: EmailTemplate({ order }),
        text: `Confirmation Order #${order.id}`,
      });

      if (error) {
        console.error(`Resend error: ${error.message}`);
      }
      console.log("Email sent successfully 📩", data?.id);
    } catch (error: any) {
      console.error("Error sending email:", error);
      throw new Error(`Failed to send email confirmation: ${error.message}`);
    }
  }
}
