import { supabase } from "@/app/lib/subapase/client";

export async function POST(req: Request) {
  const { cartId } = await req.json();
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
