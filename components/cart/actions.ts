"use server";

import { TAGS } from "@/app/lib/constants";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export interface CartItem {
  id: string;
  name: string;
  size: string;
  amount: string;
}

interface Cart {
  cartId: string;
  items: CartItem[];
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
    const response = await fetch(`http://localhost:3000/api/v1/carts/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      throw new Error("Failed to add items to cart");
    }

    const updatedCart: Cart = await response.json();
    return updatedCart;
  } catch (error) {
    console.error("Error adding items to cart:", error);
    throw error;
  }
}

export async function addItem(prevState: any, formData: FormData) {
  logColored("Adding item...", "red");
  try {
    let cartId = cookies().get("cartId")?.value;
    let cart;

    // Retrieve existing cart or create a new one if it doesn't exist
    if (cartId) {
      cart = await getCart(cartId);
    }

    const id = formData.get("id") as string | undefined;
    const name = formData.get("name") as string | undefined;
    const size = formData.get("size") as string | undefined;
    const amount = formData.get("amount") as string | undefined;

    if (!id || !name || !size || !amount) {
      return "Missing product data in formData";
    }

    const items: CartItem[] = [
      {
        id,
        name,
        amount,
        size,
      },
    ];

    if (!cartId || !cart) {
      cart = await createCart(items);
      const cartId = cart.cartId; // Access cartId from the first element of the array
      cookies().set("cartId", cartId); // Set the cartId cookie
      logColored("Creating cart and set cookie cartId...", "yellow");
    }

    await addToCart(cartId as string, cart.items);
    revalidateTag(TAGS.cart);
    return `Added 1 of product ${id} to the cart with id ${cartId}`;
  } catch (error) {
    return "Error adding item to cart";
  }
}

export async function createCart(items: CartItem[]): Promise<Cart> {
  try {
    // Make a POST request to the cart creation endpoint
    const response = await fetch("http://localhost:3000/api/v1/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Pass the items as the request body
      body: JSON.stringify({ items }),
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Failed to create cart");
    }

    // Extract the cart information from the response
    const cartResponse = await response.json();
    const cartData: Cart = cartResponse.cartData[0];

    // Return the cart information
    logColored("Cart got created...", "yellow");
    return cartData;
  } catch (error) {
    // Handle any errors that occur during cart creation
    console.error("Error creating cart:", error);
    throw error;
  }
}

export async function removeItem(prevState: any, lineId: string) { }

export async function updateItemQuantity(
  prevState: any,
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  },
) { }

export async function getCart(cartId: string): Promise<Cart> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/carts/${cartId}`,
      {
        method: "POST",
        body: JSON.stringify({ cartId }),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch cart details: ${response.statusText}`);
    }

    const cartResponse = await response.json();
    const cart = cartResponse.cart[0];
    logColored("Cart existed...", "blue");
    return cart as Cart;
  } catch (error) {
    console.error("Error fetching cart details:", error);
    throw error; // Throw the error for the caller to handle
  }
}
