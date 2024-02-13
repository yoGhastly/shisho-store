import Stripe from "stripe";

const STRIPE_SECRET_KEY =
  "sk_test_51OfZDtKrqv6TAD3CJhDV05wPUkgg7625mrQpm2IDAN0eSfIl6JN0o0tgft2KBmIPBQfMNX2xYknXfraMxxsgLw5J009SBO2FUp";

export const stripe = new Stripe(STRIPE_SECRET_KEY);
