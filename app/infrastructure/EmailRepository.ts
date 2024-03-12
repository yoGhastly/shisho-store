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
      const { data, error } = await this.resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [order.customerEmail],
        subject: `Confirmation Order #${order.id}`,
        react: EmailTemplate({ order }),
        text: `Confirmation Order #${order.id}`,
      });

      if (error) {
        console.error(`Resend error: ${error.message}`);
      }
      console.log("Email sent successfully:", data);
    } catch (error: any) {
      console.error("Error sending email:", error);
      throw new Error(`Failed to send email confirmation: ${error.message}`);
    }
  }
}
