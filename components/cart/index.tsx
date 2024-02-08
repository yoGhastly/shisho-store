import { cookies } from "next/headers";
import CartModal from "./modal";
import { getCart } from "./actions";

interface Cart {
  id: string;
  items: LineItem[];
  updatedAt: Date;
}

interface LineItem {
  id: string;
  name: string;
  amount: number;
  description: string;
  images: string[];
  quantity: number;
}

export default async function Cart() {
  const cartId = cookies().get("cartId")?.value;

  let cart;

  if (cartId) {
    cart = await getCart(cartId as string);
    console.log("THE CART NOW FROM CART COMPONENT", cart);
  }
  return <CartModal cart={cart} />;
}
