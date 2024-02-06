import { stripe } from "@/app/lib/stripe";

export async function GET() {
  try {
    const { data: shippingRates } = await stripe.shippingRates.list();

    return Response.json({ shippingRates, success: true, status: 200 });
  } catch (error) {
    console.error(error);
    Response.json({
      error: "Error retrieving Shipping Rates",
      shippingRates: [],
      success: false,
      status: 500,
    });
  }
}
