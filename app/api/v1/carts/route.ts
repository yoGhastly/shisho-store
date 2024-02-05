import { createCart } from "@/components/cart/actions";

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method Not Allowed" });
  }

  try {
    const cart = await createCart();
    Response.json({ cart });
  } catch (error) {
    console.error("Error creating cart:", error);
    Response.json({ error: "Internal Server Error" });
  }
}
