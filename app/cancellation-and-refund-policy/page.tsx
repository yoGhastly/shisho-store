import Footer from "@/components/layout/footer";
import Prose from "@/components/prose";

export const runtime = "edge";

export const revalidate = 43200; // 12 hours in seconds

const html = `
1. Cancellation and Exchanges:

In the event of a change of preference or the decision to cancel your order, we kindly request that you promptly communicate with us through our designated email address: shishobabyclothes@gmail.com or reach out to us via WhatsApp at +971 55 769 7870.

If your order is already in transit, cancellation is possible. However:

If canceled on the same day, delivery charges will apply, but a full refund of the product value is applicable.

2. Eligibility:

To be eligible for an exchange, items must be unused, in their original packaging, and in the same condition as received.

3. Return Process:

If, by any chance, you are dissatisfied with your purchase at Shisho Baby clothes, we offer a range of options to address this issue. To return an item, please follow the instructions provided by our customer service team. 

Return shipping costs are the responsibility of the customer unless the return is due to a defect or error on our part.

When a replacement or alternative solution is granted, we strive to resolve the matter within one working day. 

4. Refunds:

Refunds will be processed once the returned items are received and inspected. Please allow at least 7-10 business days for it to be processed. 

Refunds will be issued to the original payment method.

5. Damaged or Defective Items:

If you receive a damaged or defective item, please contact us within 2 days of receiving the product. We will provide instructions on how to return the item or issue a replacement.

6. Return Address:

The return address for your items will be provided by our customer service team upon initiating the return process.
`;
export default function Page() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-2xl py-20 mx-auto">
          <h1 className="mb-8 text-5xl font-bold">
            Cancellation and Refund Policy
          </h1>
          <Prose className="mb-8" html={html} />
        </div>
      </div>
      <Footer />
    </>
  );
}
