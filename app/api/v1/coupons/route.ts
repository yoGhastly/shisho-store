import { stripe } from "@/app/lib/stripe/server";

export async function GET() {
  try {
    const { data: coupons } = await stripe.coupons.list();

    return Response.json({ coupons, success: true, status: 200 });
  } catch (error) {
    console.error(error);
    Response.json({
      error: "Error retrieving coupons",
      coupons: [],
      success: false,
      status: 500,
    });
  }
}
