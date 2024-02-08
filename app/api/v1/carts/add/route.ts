import { supabase } from "@/app/lib/subapase/client";

export async function POST(req: Request) {
  try {
    const { items, cartId } = await req.json();
    const { data, error } = await supabase
      .from("carts")
      .update({
        items: items,
      })
      .eq("cartId", cartId)
      .select("*");

    if (error) {
      return Response.json({ message: "Could not get cart", error });
    }

    return Response.json({ newCart: data });
  } catch (error) {
    return Response.json({
      message: `Could not update items on cart`,
      error: error,
    });
  }
}
