import Stripe from "stripe";

const STRIPE_SECRET_KEY =
  "sk_test_51OfZDtKrqv6TAD3CJhDV05wPUkgg7625mrQpm2IDAN0eSfIl6JN0o0tgft2KBmIPBQfMNX2xYknXfraMxxsgLw5J009SBO2FUp";
const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function GET() {
  try {
    const { data: products } = await stripe.products.list({
      limit: 50,
    });

    const { data: prices } = await stripe.prices.list({ limit: 50 });

    // Map each product to include its corresponding price
    const productsWithPrices = products.map((product) => {
      const matchedPrice = prices.find((price) => price.product === product.id);

      const price = matchedPrice?.unit_amount;

      // Return the product with the price included
      return { ...product, price };
    });

    // Send the products with prices as the response
    return Response.json({
      products: productsWithPrices,
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      error: "Error retrieving products",
      products: [],
      success: false,
      status: 500,
    });
  }
}
