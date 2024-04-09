'use server';

import { TAGS } from '@/app/lib/constants';
import { supabase } from '@/app/lib/subapase/client';
import { TaxRatesResponse } from '@/app/types';
import { Cart, CartItem } from '@/types/cart';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import Stripe from 'stripe';

export async function addToCart(
  cartId: string,
  items: CartItem[],
): Promise<Cart> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartId, items }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to add items to cart');
    }

    const updatedCart: Cart = await response.json();

    return updatedCart;
  } catch (error) {
    console.error('Error adding items to cart:', error);
    throw error;
  }
}

export async function addItem(_prevState: any, formData: FormData) {
  if (!formData.get('size')) return `Please select a size`;
  try {
    let cartId = cookies().get('cartId')?.value;

    if (cartId) {
      const cart = await getCart(cartId);

      if (cart) {
        const newItem = {
          id: formData.get('id') as string,
          name: formData.get('name') as string,
          size: formData.get('size') as string,
          amount: formData.get('amount') as string,
          images: JSON.parse(formData.get('images') as string),
          quantity: parseInt(formData.get('quantity') as string),
        };

        // Check if the item already exists in the cart
        const existingItemIndex = cart.items.findIndex(
          (item: any) =>
            item.id === newItem.id && item.size === newItem.size,
        );

        if (existingItemIndex !== -1) {
          // Update the quantity of the existing item
          cart.items[existingItemIndex].quantity += newItem.quantity;
        } else {
          // Add the new item to the cart
          cart.items.push(newItem);
        }

        // Update the cart items in supabase
        await addToCart(cartId, cart.items);

        revalidateTag(TAGS.cart);
        return ``
      }
    }

    // If the cart doesn't exist, create a new cart with the added item
    const items = [
      {
        id: formData.get('id') as string,
        name: formData.get('name') as string,
        size: formData.get('size') as string,
        amount: formData.get('amount') as string,
        images: JSON.parse(formData.get('images') as string),
        quantity: parseInt(formData.get('quantity') as string), // Extract quantity
      },
    ];

    const newCart = await createCart(items);
    cookies().set('cartId', newCart.cartId);
    revalidateTag(TAGS.cart);

    return ``;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return 'Error adding item to cart';
  }
}

export async function createCart(items: CartItem[]): Promise<Cart> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Pass the items as the request body
        body: JSON.stringify({ items }),
      },
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Failed to create cart');
    }

    // Extract the cart information from the response
    const cartResponse = await response.json();
    const cartData: Cart = cartResponse.cartData[0];

    // Return the cart information
    return cartData;
  } catch (error) {
    // Handle any errors that occur during cart creation
    console.error('Error creating cart:', error);
    throw error;
  }
}

export async function removeItem(_prevState: any, itemId: string) {
  try {
    const cartId = cookies().get('cartId')?.value;

    if (!cartId) {
      return 'No cart found';
    }

    const cart = await getCart(cartId);

    if (!cart) {
      return 'Cart not found';
    }

    // Filter out the item with the specified itemId
    cart.items = cart.items.filter((item) => item.id !== itemId);

    // Update the cart in the database
    const { error } = await supabase
      .from('carts')
      .update({
        items: cart.items,
      })
      .eq('cartId', cartId);

    if (error) {
      return 'Error removing item from cart';
    }

    // Revalidate the cache tag associated with the cart
    revalidateTag(TAGS.cart);

    return 'Item removed from cart successfully';
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  _prevState: any,
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  },
) {
  try {
    const { lineId, quantity } = payload;
    const cartId = cookies().get('cartId')?.value;

    if (!cartId) {
      throw new Error('No cart found');
    }

    const cart = await getCart(cartId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    // Find the item in the cart with the specified lineId (item id)
    const itemIndex = cart.items.findIndex((item) => item.id === lineId);

    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }

    // Update the quantity of the item
    cart.items[itemIndex].quantity = quantity;

    // Update the cart in the database
    const { error } = await supabase
      .from('carts')
      .update({
        items: cart.items,
      })
      .eq('cartId', cartId);

    if (error) {
      throw new Error('Error updating item quantity in cart');
    }

    // Revalidate the cache tag associated with the cart
    revalidateTag(TAGS.cart);

    return 'Item quantity updated successfully';
  } catch (error) {
    console.error('Error updating item quantity:', error);
    throw error;
  }
}

export async function getCart(cartId: string): Promise<Cart> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/${cartId}`,
      {
        method: 'POST',
        body: JSON.stringify({ cartId }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch cart details: ${response.statusText}`,
      );
    }

    const cartResponse = await response.json();
    const cart = cartResponse.cart[0];
    return cart as Cart;
  } catch (error) {
    console.error('Error fetching cart details:', error);
    throw error; // Throw the error for the caller to handle
  }
}

export async function getTaxRates(): Promise<Stripe.TaxRate[] | undefined> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tax-rates`,
      { method: 'GET' },
    );
    const { taxRates, success, status }: TaxRatesResponse =
      await response.json();

    if (!response.ok || !success || !taxRates || status !== 200) {
      throw new Error('Could not get tax rates');
    }

    return taxRates;
  } catch (error) {
    console.error('Error trying to get `api/v1/tax-rates`', error);
  }
}

export async function deleteCart(cartId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('carts')
      .delete()
      .eq('cartId', cartId);

    if (error) {
      console.error(`Error calling removing cart`, error.message);
    }
    cookies().delete('cartId');
  } catch (error: any) {
    throw new Error(`Could not remove cart ${cartId}`, error.message);
  }
}

export async function calculateTotalWithTax(cartId: string): Promise<string> {
  let subtotal = 0;
  const cart = await getCart(cartId);

  // Calculate subtotal for each item, considering the quantity
  cart.items.forEach((item) => {
    subtotal += parseFloat(item.amount) * item.quantity;
  });

  // Add tax rate to subtotal
  const taxRate = 1.05;
  const totalWithTax = subtotal * (1 + taxRate);

  return totalWithTax.toFixed(2);
}
