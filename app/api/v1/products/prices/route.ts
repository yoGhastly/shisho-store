import { stripe } from "@/app/lib/stripe/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { productId }: { productId: string } = await req.json();

  try {
    const price = await stripe.prices.search({
      query: `active:"true" AND product:"${productId}"`,
    });

    return Response.json({ price: price.data[0].unit_amount, status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({
      message: "Could not retrieve prices",
      error,
      status: 500,
    });
  }
}
