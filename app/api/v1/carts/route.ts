import { supabase } from "@/app/lib/subapase/client";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    const { data: cartData, error } = await supabase
      .from("carts")
      .upsert([
        {
          cartId: crypto.randomUUID(),
          items: items,
          updatedAt: new Date(),
        },
      ])
      .select("*");

    if (error) {
      return Response.json({
        message: "Error inserting cart on carts table",
        error: error,
      });
    }

    // Respond with a status code of 200 and the cart data
    return Response.json({ cartData });
  } catch (error) {
    // If an error occurs, respond with an appropriate error message and status code
    console.error("Error creating cart:", error);
    return Response.json({ error: "Failed to create cart" });
  }
}

export async function GET() {
  const cookieList = cookies().getAll();
  return Response.json({ cookieList });
}
