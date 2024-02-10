import { cookies } from "next/headers";
import CartModal from "./modal";
import { getCart } from "./actions";

export default async function Cart() {
  const cartId = cookies().get("cartId")?.value;

  let cart;

  if (cartId) {
    cart = await getCart(cartId as string);
  }
  return <CartModal cart={cart} />;
}
