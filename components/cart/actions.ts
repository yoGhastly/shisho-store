"use server";

import { TAGS } from "@/app/lib/constants";
import { Cart, CartItem } from "@/types/cart";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartId, items }),
      },
    );

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

export async function addItem(prevstate: any, formData: FormData) {
  try {
    let cartId = cookies().get("cartId")?.value;

    if (cartId) {
      const cart = await getCart(cartId);

      if (cart) {
        // Append the new item to the existing items
        cart.items.push({
          id: formData.get("id") as string,
          name: formData.get("name") as string,
          size: formData.get("size") as string,
          amount: formData.get("amount") as string,
          images: JSON.parse(formData.get("images") as string),
        });

        // Update the cart items in supabase
        await addToCart(cartId, cart.items);

        revalidateTag(TAGS.cart);

        return `Added 1 of product ${formData.get("id")} to the cart with id ${cartId}`;
      }
    }

    // If the cart doesn't exist, create a new cart with the added item
    const items = [
      {
        id: formData.get("id") as string,
        name: formData.get("name") as string,
        size: formData.get("size") as string,
        amount: formData.get("amount") as string,
        images: JSON.parse(formData.get("images") as string),
      },
    ];

    const newCart = await createCart(items);
    cookies().set("cartId", newCart.cartId);
    revalidateTag(TAGS.cart);

    return `Added 1 of product ${formData.get("id")} to the new cart with id ${newCart.cartId}`;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return "Error adding item to cart";
  }
}

export async function createCart(items: CartItem[]): Promise<Cart> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Pass the items as the request body
        body: JSON.stringify({ items }),
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Failed to create cart");
    }

    // Extract the cart information from the response
    const cartResponse = await response.json();
    const cartData: Cart = cartResponse.cartData[0];

    // Return the cart information
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/${cartId}`,
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
    return cart as Cart;
  } catch (error) {
    console.error("Error fetching cart details:", error);
    throw error; // Throw the error for the caller to handle
  }
}
