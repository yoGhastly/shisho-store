import { Stripe as StripeClient, loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

let stripePromise: Promise<StripeClient | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
    );
  }
  return stripePromise;
};

const STRIPE_SECRET_KEY =
  "sk_test_51OfZDtKrqv6TAD3CJhDV05wPUkgg7625mrQpm2IDAN0eSfIl6JN0o0tgft2KBmIPBQfMNX2xYknXfraMxxsgLw5J009SBO2FUp";

export const stripe = new Stripe(STRIPE_SECRET_KEY);

// export default getStripe;
