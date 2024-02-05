"use server";

import { TAGS } from "@/app/lib/constants";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export interface CartItem {
  merchandiseId: string;
  quantity: number;
}

interface Cart {
  id: string;
}

export async function addToCart(
  cartId: string,
  items: CartItem[],
): Promise<Cart> {
  try {
    const response = await fetch(
      `https://shishobabyclothes.ae/api/v1/carts/${cartId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to add items to cart");
    }

    // Optionally, you can parse and return the updated cart data if your API responds with it
    const updatedCart: Cart = await response.json();
    return updatedCart;
  } catch (error) {
    console.error("Error adding items to cart:", error);
    throw error;
  }
}

export async function addItem(prevState: any) {
  let cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    cookies().set("cartId", cartId as string);
  }

  try {
    await addToCart(cartId as string, [
      { merchandiseId: cartId as string, quantity: 1 },
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function createCart() {
  try {
    const response = await fetch("https://shishobabyclothes.ae/api/v1/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create cart");
    }

    const cart = await response.json();
    return cart;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
}

export async function removeItem(prevState: any, lineId: string) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  },
) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      revalidateTag(TAGS.cart);
      return;
    }

    // await updateCart(cartId, [
    //   {
    //     id: lineId,
    //     merchandiseId: variantId,
    //     quantity
    //   }
    // ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error updating item quantity";
  }
}
function getCart(cartId: string): any {
  throw new Error("Function not implemented.");
}
