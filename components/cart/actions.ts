"use server";

import { TAGS } from "@/app/lib/constants";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined,
) {
  let cartId = cookies().get("cartId")?.value;
  let cart;

  if (!selectedVariantId) {
    return "Missing product variant ID";
  }

  try {
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error adding item to cart";
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
