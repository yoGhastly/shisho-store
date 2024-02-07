"use server";

import { TAGS } from "@/app/lib/constants";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export interface CartItem {
  id: string;
  name: string;
  amount: string;
  description: string;
  images: string[];
  quantity: number;
}

interface Cart {
  id: string;
  items: any[];
  updatedAt: Date;
}
const colors: { [key: string]: string } = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

// Function to log colored output
function logColored(message: string, color: string): void {
  console.log(colors[color] + message + colors.reset);
}

export async function addToCart(
  cartId: string,
  items: CartItem[],
): Promise<Cart> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/carts/${cartId}`,
      {
        method: "POST",
        body: JSON.stringify({ cartId, items }),
      },
    );

    const cart = await response.json();

    return cart;
  } catch (error) {
    console.error("Error adding items to cart:", error);
    throw error; // Throw the error for the caller to handle
  }
}

export async function addItem(prevState: any) {
  logColored("Add Item", "red");
  try {
    // Step 1: Get the cartId from cookies
    let cartId = cookies().get("cartId")?.value;
    let cart;

    // Step 2: Fetch the cart details if cartId exists
    if (cartId) {
      logColored("If cartId", "yellow");
      cart = await getCart(cartId);
    }

    // Step 3: If no cartId or cart, create a new cart
    if (!cartId || !cart) {
      logColored("If not cartId or cart start", "green");
      cart = await createCart();
      cartId = cart.id;
      cookies().set("cartId", cartId as string);
      logColored("If not cartId or cart end", "green");
    }

    // Step 4: Add item to the cart
    await addToCart(cartId as string, [
      {
        id: "",
        name: "",
        amount: "",
        description: "",
        images: [""],
        quantity: 0,
      },
    ]);

    logColored("addToCart", "blue");

    revalidateTag(TAGS.cart);

    // Step 6: Return success message
    return "Item added to cart successfully";
  } catch (error) {
    // Step 6: Handle errors
    console.error("Error adding item to cart:", error);
    return "Error adding item to cart";
  }
}

export async function createCart() {
  try {
    const response = await fetch("http://localhost:3000/api/v1/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create cart");
    }

    const cart = await response.json();

    logColored("createCart", "cyan");
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

export async function getCart(cartId: string): Promise<Cart> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/carts/${cartId}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch cart details: ${response.statusText}`);
    }

    const cart = await response.json();
    logColored("getCart", "magenta");
    return cart as Cart;
  } catch (error) {
    console.error("Error fetching cart details:", error);
    throw error; // Throw the error for the caller to handle
  }
}
