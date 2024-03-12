import { EmailTemplate } from "@/components/email-template";
import { Order } from "@/app/types";
import { Resend } from "resend";

export class EmailRepository {
  private resend: Resend;

  constructor(apiKey: string) {
    this.resend = new Resend(apiKey);
  }

  async sendOrderConfirmation(order: Order): Promise<void> {
    try {
      const data = await this.resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [order.customerEmail],
        subject: `Confirmation Order #${order.id}`,
        react: EmailTemplate({ order }),
        text: `Confirmation Order #${order.id}`,
      });
      console.log("Email sent successfully:", data);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; // You might want to handle this error differently based on your application's requirements
    }
  }
}
