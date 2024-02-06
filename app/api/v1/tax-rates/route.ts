import { stripe } from "@/app/lib/stripe";

export async function GET() {
  try {
    const { data: taxRates } = await stripe.taxRates.list();

    return Response.json({ taxRates, success: true, status: 200 });
  } catch (error) {
    console.error(error);
    Response.json({
      error: "Error retrieving Tax Rates",
      taxRates: [],
      success: false,
      status: 500,
    });
  }
}
