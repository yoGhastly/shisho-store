import { supabase } from "@/app/lib/subapase/client";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { cartId } = await req.json();

  // allows to purge cached data on-demand for a specific cache tag
  // so when adding a new product to the cart it revalidates the data
  const tag = req.nextUrl.searchParams.get("tag");
  revalidateTag(tag as string);

  try {
    const { data: cart, error } = await supabase
      .from("carts")
      .select("*")
      .eq("cartId", cartId);

    if (error) {
      return Response.json({
        message: "Error retrieving cart from carts table",
        error: error,
      });
    }

    return Response.json({ cart });
  } catch (error) {
    console.error("Error adding items to cart:", error);
    return Response.json({ error: "Error adding items to cart" });
  }
}
