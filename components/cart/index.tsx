import { cookies } from 'next/headers';
import CartModal from './modal';
import { calculateTotalWithTax, getCart, getTaxRates } from './actions';
import Stripe from 'stripe';

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;

  let cart, taxRates, total;

  if (cartId) {
    cart = await getCart(cartId as string);
    if (cart) {
      total = await calculateTotalWithTax(cartId);
    }
  }

  taxRates = await getTaxRates();

  if (!taxRates) {
    taxRates = {} as Stripe.TaxRate[];
  }

  return (
    <CartModal cart={cart} taxRate={taxRates[0]} total={total as string} />
  );
}
